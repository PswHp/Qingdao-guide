import { tips } from '../data/content'
import SectionTitle from './SectionTitle'

export default function Tips() {
  return (
    <section id="tips" className="bg-sea-900 py-24 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="TRAVEL TIPS" title="떠나기 전 체크리스트" light />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip) => (
            <div key={tip.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl" aria-hidden>
                {tip.icon}
              </div>
              <h3 className="mt-3 font-bold">{tip.title}</h3>
              <p className="mt-2 text-sm text-sea-100">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
