import { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { AuthService } from '@/services/AuthService'
import { UserService } from '@/services/UserService'
import { UserModel, UserInsert } from '@/models/User'

interface AuthState {
  user: UserModel | null
  supabaseUser: SupabaseUser | null
  loading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: UserInsert) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  updateProfile: (data: { name?: string; commercial_name?: string; bio?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    supabaseUser: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Verifica sessão atual
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const user = await UserService.findById(session.user.id)
        setState(prev => ({
          ...prev,
          user: user,
          supabaseUser: session.user,
          loading: false
        }))
      } else {
        setState(prev => ({ ...prev, loading: false }))
      }
    })

    // Monitora mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const user = await UserService.findById(session.user.id)
        setState(prev => ({
          ...prev,
          user: user,
          supabaseUser: session.user,
          loading: false
        }))
      } else {
        setState(prev => ({
          ...prev,
          user: null,
          supabaseUser: null,
          loading: false
        }))
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const { user, error } = await AuthService.signIn(email, password)
      if (error) throw error
      if (!user) throw new Error('Usuário não encontrado')
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erro ao fazer login' }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const signUp = async (userData: UserInsert) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const { user, error } = await AuthService.signUp(userData)
      if (error) throw error
      if (!user) throw new Error('Erro ao criar usuário')
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erro ao criar conta' }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const { error } = await AuthService.signOut()
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erro ao fazer logout' }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const resetPassword = async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const { error } = await AuthService.resetPassword(email)
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erro ao resetar senha' }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const updatePassword = async (newPassword: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const { error } = await AuthService.updatePassword(newPassword)
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erro ao atualizar senha' }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  const updateProfile = async (data: { name?: string; commercial_name?: string; bio?: string }) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      if (!state.user) throw new Error('Usuário não autenticado')

      const user = await UserService.update(state.user.id, data)
      if (!user) throw new Error('Erro ao atualizar perfil')

      setState(prev => ({ ...prev, user }))
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erro ao atualizar perfil' }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
