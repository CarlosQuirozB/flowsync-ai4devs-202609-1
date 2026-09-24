import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { api, type User } from '@/lib/api'

type AuthContextValue = {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (
    email: string,
    password: string,
    passwordConfirmation: string,
    fullName: string | null
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  )
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    api
      .profile(token)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token')
        setToken(null)
      })
      .finally(() => setIsLoading(false))
  }, [token])

  async function login(email: string, password: string) {
    const res = await api.login({ email, password })
    localStorage.setItem('token', res.token)
    setUser(res.user)
    setToken(res.token)
  }

  async function signup(
    email: string,
    password: string,
    passwordConfirmation: string,
    fullName: string | null
  ) {
    const res = await api.signup({
      email,
      password,
      passwordConfirmation,
      fullName,
    })
    localStorage.setItem('token', res.token)
    setUser(res.user)
    setToken(res.token)
  }

  function logout() {
    if (token) api.logout(token).catch(() => {})
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
