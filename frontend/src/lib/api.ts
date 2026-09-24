const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api/v1'

export class ApiError extends Error {}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const message = body?.errors?.[0]?.message ?? 'Something went wrong'
    throw new ApiError(message)
  }

  return res.json()
}

async function requestData<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const body = await request<{ data: T }>(path, options, token)
  return body.data
}

export type User = {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string
  initials: string
}

type AuthResponse = { user: User; token: string }

export const api = {
  signup: (data: {
    email: string
    password: string
    passwordConfirmation: string
    fullName: string | null
  }) =>
    requestData<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    requestData<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  profile: (token: string) => requestData<User>('/account/profile', {}, token),

  logout: (token: string) =>
    request<{ message: string }>('/account/logout', { method: 'POST' }, token),
}
