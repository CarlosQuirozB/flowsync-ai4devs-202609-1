import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{user?.initials ?? '—'}</CardTitle>
          <CardDescription>{user?.fullName ?? 'Sin nombre'}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{user?.email}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
