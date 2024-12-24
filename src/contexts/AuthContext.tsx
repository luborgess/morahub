import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError, Provider } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

// Interface que define o estado da autenticação
interface AuthState {
  user: User | null        // Armazena os dados do usuário logado ou null se não houver usuário
  loading: boolean         // Indica se há alguma operação de autenticação em andamento
  error: AuthError | null  // Armazena erros de autenticação, se houverem
}

// Tipos ENUM conforme documentação
type UserType = 'VISITOR' | 'UFMG' | 'RESIDENT' | 'ADMIN'
type UserStatus = 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'BLOCKED'

interface UserData {
  email: string
  password: string
  name: string
  commercial_name?: string
  celular?: string
  cpf?: string
  bio?: string
  image_url?: { url: string; metadata?: any }
  type?: UserType
  status?: UserStatus
  housing_id?: string
  created_at?: string
  updated_at?: string
}

// Interface que estende AuthState e define todos os métodos de autenticação disponíveis
interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>        // Método para fazer login
  signUp: (userData: UserData) => Promise<void>                    // Método para criar conta
  signOut: () => Promise<void>                                      // Método para fazer logout
  resetPassword: (email: string) => Promise<void>                   // Método para resetar senha
  updatePassword: (newPassword: string) => Promise<void>            // Método para atualizar senha
  signInWithProvider: (provider: Provider) => Promise<void>         // Método para login com provedor (Google, etc)
  updateProfile: (data: { username?: string; avatar_url?: string }) => Promise<void>  // Método para atualizar perfil
}

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Componente Provider que irá envolver a aplicação e fornecer o contexto de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado inicial da autenticação
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Verifica se existe uma sessão ativa ao carregar a aplicação
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        loading: false
      }))
    })

    // Monitora mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        loading: false
      }))
    })

    // Limpa a inscrição quando o componente é desmontado
    return () => subscription.unsubscribe()
  }, [])

  // Função para realizar login com email e senha
  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: error as AuthError }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  // Função para criar uma nova conta
  const signUp = async (userData: UserData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      // 1. Criar o usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      })
      
      if (authError) throw authError

      // 2. Se o usuário foi criado com sucesso, adicionar dados extras na tabela users
      if (authData.user) {
        const now = new Date().toISOString()
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: userData.email,
              name: userData.name,
              commercial_name: userData.commercial_name,
              celular: userData.celular,
              cpf: userData.cpf,
              bio: userData.bio,
              image_url: userData.image_url,
              type: userData.type || 'VISITOR',
              status: userData.status || 'PENDING_VERIFICATION',
              housing_id: userData.housing_id,
              created_at: now,
              updated_at: now
            }
          ])

        if (profileError) throw profileError
      }
    } catch (error) {
      setState(prev => ({ ...prev, error: error as AuthError }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  // Função para realizar logout
  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: error as AuthError }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  // Função para solicitar reset de senha
  const resetPassword = async (email: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: error as AuthError }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  // Função para atualizar a senha
  const updatePassword = async (newPassword: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: error as AuthError }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  // Função para realizar login com provedores externos (Google, Facebook, etc)
  const signInWithProvider = async (provider: Provider) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signInWithOAuth({ provider })
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: error as AuthError }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  // Função para atualizar o perfil do usuário
  const updateProfile = async (data: { username?: string; avatar_url?: string }) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.updateUser({ data })
      if (error) throw error
    } catch (error) {
      setState(prev => ({ ...prev, error: error as AuthError }))
      throw error
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  // Retorna o Provider do contexto com todos os valores e métodos necessários
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        signInWithProvider,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar o contexto de autenticação em qualquer componente
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}