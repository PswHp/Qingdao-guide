import { useCallback, useEffect, useRef, useState } from 'react'
import { GOOGLE_CLIENT_ID, NAVER_CLIENT_ID } from '../config'
import { loadUser, saveUser, type User } from '../auth/storage'
import { useGoogle } from '../auth/google'
import { useNaver } from '../auth/naver'

/** 640px 미만(휴대폰)에서는 아이콘만 있는 작은 버튼 */
function useIsCompact() {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = () => setCompact(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}

function NaverButton({ onClick, disabled, compact }: { onClick: () => void; disabled: boolean; compact: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="네이버로 로그인"
      className={`flex h-8 items-center gap-1.5 rounded-full bg-[#03C75A] font-semibold text-white hover:bg-[#02b350] disabled:opacity-60 ${
        compact ? 'w-8 justify-center' : 'px-3 text-xs'
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-3 w-3" aria-hidden>
        <path fill="currentColor" d="M13.56 10.7 6.17 0H0v20h6.44V9.3L13.83 20H20V0h-6.44z" />
      </svg>
      {!compact && <span>네이버 로그인</span>}
    </button>
  )
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(loadUser)
  const compact = useIsCompact()
  const googleRef = useRef<HTMLDivElement>(null)

  const handleLogin = useCallback((next: User) => {
    saveUser(next)
    setUser(next)
  }, [])

  const google = useGoogle(GOOGLE_CLIENT_ID, handleLogin)
  const naver = useNaver(NAVER_CLIENT_ID, handleLogin)

  useEffect(() => {
    if (!user) google.renderButton(googleRef.current, compact)
  }, [user, compact, google.renderButton])

  const logout = () => {
    if (user?.provider === 'naver') naver.signOut()
    else google.signOut()
    saveUser(null)
    setUser(null)
  }

  // key 를 다르게 줘서 로그인/로그아웃 때 칸을 통째로 새로 만듦.
  // (같은 div 를 재사용하면 구글 스크립트가 그려 넣은 버튼이 React 가 모르는 채로 남아 계속 보임)
  if (!user) {
    return (
      <div key="login" className="flex items-center gap-2">
        {/* 구글 스크립트가 버튼을 그리기 전까지 같은 크기의 자리 확보 */}
        <div ref={googleRef} className="flex min-h-8 min-w-8 items-center" />
        <NaverButton onClick={naver.login} disabled={!naver.ready} compact={compact} />
      </div>
    )
  }

  return (
    <div key="profile" className="flex items-center gap-2">
      {user.picture ? (
        <img src={user.picture} alt="" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full" />
      ) : (
        <span className="grid h-8 w-8 place-items-center rounded-full bg-sea-600 text-xs font-bold text-white">
          {user.name.slice(0, 1)}
        </span>
      )}
      <span className="hidden text-sm font-medium lg:inline" title={user.email}>
        {user.name}님
      </span>
      <button onClick={logout} className="rounded-full px-2 py-1 text-xs text-slate-500 hover:bg-slate-100">
        로그아웃
      </button>
    </div>
  )
}
