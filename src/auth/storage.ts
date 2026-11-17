export type Provider = 'google' | 'naver'

export type User = { provider: Provider; email: string; name: string; picture: string }

const STORAGE_KEY = 'qingdao-guide:user'

/** 로그인 정보는 이 브라우저의 localStorage 에만 저장 (서버로 보내지 않음) */
export function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const user = JSON.parse(raw) as Partial<User>
    // 예전 버전(구글만 있던 때)에 저장된 정보는 provider 가 없으므로 google 로 간주
    return { provider: user.provider ?? 'google', email: user.email ?? '', name: user.name ?? '', picture: user.picture ?? '' }
  } catch {
    return null
  }
}

export function saveUser(user: User | null) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 시크릿 모드 등에서 저장이 막혀도 로그인 자체는 동작
  }
}

/** 외부 스크립트가 로드되어 전역 객체가 생길 때까지 기다림 */
export function waitFor<T>(get: () => T | undefined, timeoutMs = 10000): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const check = () => {
      const value = get()
      if (value) return resolve(value)
      if (Date.now() - start > timeoutMs) return reject(new Error('script load timeout'))
      setTimeout(check, 100)
    }
    check()
  })
}
