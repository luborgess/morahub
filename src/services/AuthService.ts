import { supabase } from '@/lib/supabase'
import { UserService } from './UserService'
import { UserModel, UserInsert } from '@/models/User'
import { AuthError } from '@supabase/supabase-js'

export class AuthService {
  static async signIn(email: string, password: string): Promise<{ user: UserModel | null; error: AuthError | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (authData.user) {
        const user = await UserService.findById(authData.user.id)
        return { user, error: null }
      }

      return { user: null, error: null }
    } catch (error) {
      return { user: null, error: error as AuthError }
    }
  }

  static async signUp(userData: UserInsert): Promise<{ user: UserModel | null; error: AuthError | null }> {
    try {
      // 1. Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password as string,
      })

      if (authError) throw authError

      // 2. Se o usuário foi criado com sucesso, criar o perfil
      if (authData.user) {
        const user = await UserService.create({
          ...userData,
          id: authData.user.id,
          type: userData.type || 'VISITOR',
          status: 'ACTIVE',
        })

        if (!user) throw new Error('Erro ao criar perfil do usuário')

        return { user, error: null }
      }

      return { user: null, error: null }
    } catch (error) {
      return { user: null, error: error as AuthError }
    }
  }

  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  static async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as AuthError }
    }
  }
}
