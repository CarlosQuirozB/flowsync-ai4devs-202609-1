import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'

export function GuestRoute() {
  const { token, isLoading } = useAuth()

  if (isLoading) return null
  if (token) return <Navigate to="/profile" replace />

  return <Outlet />
}
