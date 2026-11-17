import { foods } from '../data/content'
import SectionTitle from './SectionTitle'

export default function Food() {
  return (
    <section id="food" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle eyebrow="LOCAL TASTE" title="칭다오에서 꼭 먹어야 할 것" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {foods.map((food) => (
            <div key={food.name} className="rounded-2xl bg-sand-100 p-6 text-center">
              <div className="text-5xl" aria-hidden>
                {food.icon}
              </div>
              <h3 className="mt-4 font-bold">{food.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{food.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
