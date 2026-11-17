import { useEffect, useRef, useState } from 'react'
import { GOOGLE_CLIENT_ID } from '../config'
import { useGoogleLogin } from '../hooks/useGoogleLogin'

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

export default function AuthButton() {
  const { user, ready, renderButton, logout } = useGoogleLogin(GOOGLE_CLIENT_ID)
  const buttonRef = useRef<HTMLDivElement>(null)
  const compact = useIsCompact()

  useEffect(() => {
    if (!user) renderButton(buttonRef.current, compact)
  }, [user, ready, compact, renderButton])

  // key 를 다르게 줘서 로그인/로그아웃 때 칸을 통째로 새로 만듦.
  // (같은 div 를 재사용하면 구글 스크립트가 그려 넣은 버튼이 React 가 모르는 채로 남아 계속 보임)
  if (!user) {
    // 구글 스크립트가 버튼을 그리기 전까지 같은 크기의 자리 확보
    return <div key="login" ref={buttonRef} className="flex min-h-8 min-w-8 items-center" />
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
