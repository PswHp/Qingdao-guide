import { navItems } from '../data/content'

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 text-sm md:flex-row">
        <div>
          <p className="text-lg font-black text-white">QINGDAO GUIDE</p>
          <p className="mt-2">바다와 맥주의 도시, 칭다오 여행 가이드</p>
        </div>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Qingdao Guide</p>
      </div>
    </footer>
  )
}
