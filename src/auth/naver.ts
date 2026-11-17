import { useCallback, useEffect, useRef, useState } from 'react'
import { waitFor, type User } from './storage'

// 네이버 로그인 JS SDK(naveridlogin_js_sdk_2.0.2.js)가 만드는 전역 객체 중 쓰는 부분만 타입 선언
type NaverUser = {
  getEmail(): string | undefined
  getName(): string | undefined
  getNickName(): string | undefined
  getProfileImage(): string | undefined
}
type NaverLogin = {
  init(): void
  authorize(): void
  getLoginStatus(callback: (status: boolean) => void): void
  logout(): void
  user?: NaverUser
}
declare global {
  interface Window {
    naver?: {
      LoginWithNaverId: new (options: {
        clientId: string
        callbackUrl: string
        isPopup?: boolean
        callbackHandle?: boolean
      }) => NaverLogin
    }
  }
}

const NAVER_TOKEN_KEY = 'com.naver.nid.access_token'

/** 네이버 로그인을 마치고 돌아왔을 때 주소 끝(#access_token=... 또는 #error=...)을 깨끗이 지움 */
function clearCallbackHash() {
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

/**
 * 브라우저에서만 처리하는 네이버 로그인.
 * 로그인 버튼 → 네이버 로그인 화면 → Callback URL(메인 페이지)로 돌아옴 → SDK 가 토큰으로 프로필 조회
 */
export function useNaver(clientId: string, onLogin: (user: User) => void) {
  const [ready, setReady] = useState(false)
  const loginRef = useRef<NaverLogin | null>(null)
  const onLoginRef = useRef(onLogin)
  onLoginRef.current = onLogin

  useEffect(() => {
    let cancelled = false
    waitFor(() => window.naver?.LoginWithNaverId)
      .then((LoginWithNaverId) => {
        if (cancelled) return
        const naverLogin = new LoginWithNaverId({
          clientId,
          callbackUrl: `${window.location.origin}/`,
          isPopup: false,
          callbackHandle: true,
        })
        naverLogin.init() // 돌아온 주소에 토큰이 있으면 여기서 꺼내 저장함
        loginRef.current = naverLogin
        setReady(true)

        const hash = window.location.hash
        if (hash.includes('access_token=')) {
          naverLogin.getLoginStatus((ok) => {
            const u = naverLogin.user
            if (ok && u) {
              onLoginRef.current({
                provider: 'naver',
                email: u.getEmail() ?? '',
                name: u.getName() || u.getNickName() || '네이버 사용자',
                picture: u.getProfileImage() ?? '',
              })
            }
            clearCallbackHash()
          })
        } else if (hash.includes('error=')) {
          clearCallbackHash() // 사용자가 로그인을 취소한 경우
        }
      })
      .catch(() => console.warn('네이버 로그인 스크립트를 불러오지 못했습니다'))
    return () => {
      cancelled = true
    }
  }, [clientId])

  const login = useCallback(() => loginRef.current?.authorize(), [])

  const signOut = useCallback(() => {
    loginRef.current?.logout()
    try {
      localStorage.removeItem(NAVER_TOKEN_KEY)
    } catch {
      // 무시
    }
  }, [])

  return { ready, login, signOut }
}
