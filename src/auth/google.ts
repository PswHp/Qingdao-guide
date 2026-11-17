import { useCallback, useEffect, useRef, useState } from 'react'
import { waitFor, type User } from './storage'

// 구글 로그인 스크립트(https://accounts.google.com/gsi/client)가 만드는 전역 객체 중 쓰는 부분만 타입 선언
type CredentialResponse = { credential: string }
type GoogleId = {
  initialize(options: { client_id: string; callback: (res: CredentialResponse) => void }): void
  renderButton(parent: HTMLElement, options: Record<string, string | number>): void
  disableAutoSelect(): void
}
declare global {
  interface Window {
    google?: { accounts: { id: GoogleId } }
  }
}

/** 구글이 준 ID 토큰(JWT)의 가운데 부분을 풀어서 이름·이메일·사진을 꺼냄 (한글 이름도 깨지지 않게 UTF-8 로 디코딩) */
function decodeIdToken(token: string): User {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const bytes = Uint8Array.from(atob(base64), (ch) => ch.charCodeAt(0))
  const payload = JSON.parse(new TextDecoder().decode(bytes)) as { email?: string; name?: string; picture?: string }
  return { provider: 'google', email: payload.email ?? '', name: payload.name ?? '', picture: payload.picture ?? '' }
}

/** 브라우저에서만 처리하는 구글 로그인 (Google Identity Services) */
export function useGoogle(clientId: string, onLogin: (user: User) => void) {
  const [ready, setReady] = useState(false)
  const onLoginRef = useRef(onLogin)
  onLoginRef.current = onLogin

  useEffect(() => {
    let cancelled = false
    waitFor(() => window.google?.accounts?.id)
      .then((gid) => {
        if (cancelled) return
        gid.initialize({
          client_id: clientId,
          callback: ({ credential }) => onLoginRef.current(decodeIdToken(credential)),
        })
        setReady(true)
      })
      .catch(() => console.warn('구글 로그인 스크립트를 불러오지 못했습니다'))
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

  const signOut = useCallback(() => {
    window.google?.accounts.id.disableAutoSelect()
  }, [])

  return { renderButton, signOut }
}
