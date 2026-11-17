import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

// 칭다오 좌표
const LAT = 36.0671
const LON = 120.3826

// WMO 날씨 코드 → 아이콘/설명
function describe(code: number): { icon: string; label: string } {
  if (code === 0) return { icon: '☀️', label: '맑음' }
  if (code <= 3) return { icon: '⛅', label: '구름 조금' }
  if (code <= 48) return { icon: '🌫️', label: '안개' }
  if (code <= 67) return { icon: '🌧️', label: '비' }
  if (code <= 77) return { icon: '🌨️', label: '눈' }
  if (code <= 82) return { icon: '🌦️', label: '소나기' }
  return { icon: '⛈️', label: '뇌우' }
}

const app = new Hono().basePath('/api')

// 외부 API 가 응답이 없거나 실패하면 500 대신 502 로 응답 (프론트는 '—' 로 표시)
app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'upstream_unavailable' }, 502)
})

app.get('/health', (c) => c.json({ ok: true }))

// 현재 날씨 (Open-Meteo, API 키 불필요)
app.get('/weather', async (c) => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    '&current=temperature_2m,weather_code&timezone=Asia%2FShanghai'
  const res = await fetch(url, { cf: { cacheTtl: 600, cacheEverything: true }, signal: AbortSignal.timeout(5000) })
  if (!res.ok) return c.json({ error: 'weather_unavailable' }, 502)

  const data = (await res.json()) as { current: { temperature_2m: number; weather_code: number } }
  c.header('Cache-Control', 'public, max-age=600')
  return c.json({ temperature: data.current.temperature_2m, ...describe(data.current.weather_code) })
})

// 위안 → 원 환율 (open.er-api.com, API 키 불필요)
app.get('/exchange', async (c) => {
  const res = await fetch('https://open.er-api.com/v6/latest/CNY', {
    cf: { cacheTtl: 3600, cacheEverything: true },
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) return c.json({ error: 'exchange_unavailable' }, 502)

  const data = (await res.json()) as { result: string; rates: Record<string, number>; time_last_update_utc: string }
  if (data.result !== 'success' || !data.rates.KRW) return c.json({ error: 'exchange_unavailable' }, 502)

  c.header('Cache-Control', 'public, max-age=3600')
  return c.json({
    krwPerCny: data.rates.KRW,
    updatedAt: new Date(data.time_last_update_utc).toISOString().slice(0, 10),
  })
})

export const onRequest = handle(app)
