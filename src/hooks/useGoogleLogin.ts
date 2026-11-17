import { useCallback, useEffect, useState } from 'react'

export type User = { email: string; name: string; picture: string }

// 구글 로그인 스크립트(https://accounts.google.com/gsi/client)가 만드는 전역 객체 중 쓰는 부분만 타입 선언
type CredentialResponse = { credential: string }
type GoogleId = {
  initialize(options: { client_id: string; callback: (res: CredentialResponse) => void; auto_select?: boolean }): void
  renderButton(parent: HTMLElement, options: Record<string, string | number>): void
  disableAutoSelect(): void
}
declare global {
  interface Window {
    google?: { accounts: { id: GoogleId } }
  }
}

const STORAGE_KEY = 'qingdao-guide:user'

/** 구글이 준 ID 토큰(JWT)의 가운데 부분을 풀어서 이름·이메일·사진을 꺼냄 (한글 이름도 깨지지 않게 UTF-8 로 디코딩) */
function decodeIdToken(token: string): User {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const bytes = Uint8Array.from(atob(base64), (ch) => ch.charCodeAt(0))
  const payload = JSON.parse(new TextDecoder().decode(bytes)) as Partial<User>
  return { email: payload.email ?? '', name: payload.name ?? '', picture: payload.picture ?? '' }
}

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function saveUser(user: User | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 시크릿 모드 등에서 저장이 막혀도 로그인 자체는 동작
  }
}

/** 스크립트가 다 로드될 때까지 기다림 */
function waitForGoogle(): Promise<GoogleId> {
  return new Promise((resolve) => {
    const check = () => (window.google?.accounts?.id ? resolve(window.google.accounts.id) : setTimeout(check, 100))
    check()
  })
}

/**
 * 브라우저에서만 처리하는 구글 로그인 (서버·Cloudflare 설정 불필요).
 * 로그인 정보는 이 브라우저의 localStorage 에만 저장됩니다.
 */
export function useGoogleLogin(clientId: string) {
  const [user, setUser] = useState<User | null>(loadUser)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    waitForGoogle().then((gid) => {
      if (cancelled) return
      gid.initialize({
        client_id: clientId,
        callback: ({ credential }) => {
          const next = decodeIdToken(credential)
          saveUser(next)
          setUser(next)
        },
      })
      setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [clientId])

  /** 구글 공식 로그인 버튼을 el 안에 그림 */
  const renderButton = useCallback(
    (el: HTMLElement | null, compact: boolean) => {
      if (!el || !ready || !window.google) return
      el.innerHTML = ''
      window.google.accounts.id.renderButton(el, {
        type: compact ? 'icon' : 'standard',
        theme: 'outline',
        size: 'medium',
        shape: 'pill',
        text: 'signin_with',
        locale: 'ko',
      })
    },
    [ready],
  )

  const logout = useCallback(() => {
    window.google?.accounts.id.disableAutoSelect()
    saveUser(null)
    setUser(null)
  }, [])

  return { user, ready, renderButton, logout }
}
