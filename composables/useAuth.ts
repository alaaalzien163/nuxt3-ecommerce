export type LoginPayload = { username: string; password: string }
export type LoginResponse = { token: string }

export function useAuth() {
  const token = useCookie<string | null>('auth_token', { sameSite: 'lax' })

  async function login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: payload,
    })
    token.value = res?.token || null
    return res
  }

  function logout() {
    token.value = null
  }

  return { token, login, logout }
}
