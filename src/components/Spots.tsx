import { spots } from '../data/content'
import SectionTitle from './SectionTitle'

export default function Spots() {
  return (
    <section id="spots" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="MUST VISIT" title="꼭 가봐야 할 명소" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot) => (
            <article key={spot.name} className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">
              <div className={`${spot.bg} relative aspect-[4/3]`}>
                {spot.image && (
                  <img
                    src={spot.image}
                    alt={spot.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span className="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-xs font-bold">{spot.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">
                  {spot.name} <span className="text-sm font-normal text-slate-400">{spot.local}</span>
                </h3>
                <p className="mt-2 text-sm text-slate-600">{spot.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
