import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono().basePath('/api')

// 외부 API 가 응답이 없거나 실패하면 500 대신 502 로 응답 (프론트는 '—' 로 표시)
app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'upstream_unavailable' }, 502)
})

app.get('/health', (c) => c.json({ ok: true }))

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
