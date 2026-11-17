import { useState } from 'react'
import { navItems } from '../data/content'
import AuthButton from './AuthButton'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2 text-xl font-black text-sea-700">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-roof-500 text-sm text-white">青</span>
          QINGDAO
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-sea-600">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <AuthButton />
          <button
            className="p-2 md:hidden"
            aria-label="메뉴"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 font-medium hover:bg-sea-50"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
