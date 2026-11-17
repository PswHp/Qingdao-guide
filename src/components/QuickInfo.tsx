import { useEffect, useState } from 'react'

type Weather = { temperature: number; icon: string; label: string }
type Exchange = { krwPerCny: number; updatedAt: string }

function Card({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{note}</p>
    </div>
  )
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} ${res.status}`)
  return res.json() as Promise<T>
}

export default function QuickInfo() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [exchange, setExchange] = useState<Exchange | null>(null)
  const [weatherFailed, setWeatherFailed] = useState(false)
  const [exchangeFailed, setExchangeFailed] = useState(false)

  useEffect(() => {
    getJson<Weather>('/api/weather').then(setWeather).catch(() => setWeatherFailed(true))
    getJson<Exchange>('/api/exchange').then(setExchange).catch(() => setExchangeFailed(true))
  }, [])

  return (
    <section className="relative z-10 -mt-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-xl md:grid-cols-4 md:p-6">
          <Card
            label="현재 날씨"
            value={weather ? `${weather.icon} ${Math.round(weather.temperature)}°C` : weatherFailed ? '—' : '…'}
            note={weather ? weather.label : weatherFailed ? '날씨 정보를 불러오지 못했어요' : '불러오는 중'}
          />
          <Card
            label="환율"
            value={exchange ? `1元 ≈ ${Math.round(exchange.krwPerCny)}원` : exchangeFailed ? '—' : '…'}
            note={exchange ? `기준일 ${exchange.updatedAt}` : exchangeFailed ? '환율 정보를 불러오지 못했어요' : '불러오는 중'}
          />
          <Card label="시차" value="−1시간" note="한국보다 1시간 늦음" />
          <Card label="비행 시간" value="약 1h 30m" note="인천 → 칭다오 자오둥" />
        </div>
      </div>
    </section>
  )
}
