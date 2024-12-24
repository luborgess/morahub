import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface RequireAuthProps {
  children: React.ReactNode
  allowedTypes?: ('USER' | 'ADMIN')[]
}

export function RequireAuth({ children, allowedTypes }: RequireAuthProps) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading) return

    if (!user) {
      // Redireciona para login mantendo a URL de origem
      navigate('/auth/signin', {
        replace: true,
        state: { from: location }
      })
      return
    }

    // Se tipos permitidos foram especificados, verifica se o usuário tem permissão
    if (allowedTypes && !allowedTypes.includes(user.type)) {
      navigate('/', { replace: true })
    }
  }, [user, loading, navigate, location, allowedTypes])

  // Mostra nada enquanto verifica autenticação
  if (loading) return null

  // Se não há usuário, não renderiza nada (redirecionamento acontecerá no useEffect)
  if (!user) return null

  // Se há tipos permitidos e o usuário não tem permissão, não renderiza nada
  if (allowedTypes && !allowedTypes.includes(user.type)) return null

  // Se passou por todas as verificações, renderiza o conteúdo
  return <>{children}</>
}
