type Props = { eyebrow: string; title: string; light?: boolean }

export default function SectionTitle({ eyebrow, title, light = false }: Props) {
  return (
    <div className="mb-10">
      <p className={`text-sm font-bold tracking-widest ${light ? 'text-amber-300' : 'text-roof-500'}`}>{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h2>
    </div>
  )
}
