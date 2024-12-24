import { UserService } from '@/services/UserService'
import { UserInsert, UserUpdate } from '@/models/User'

export class UserController {
  // Buscar perfil do usuário
  static async getProfile(userId: string) {
    try {
      const user = await UserService.findById(userId)
      if (!user) {
        return { error: 'Usuário não encontrado' }
      }
      return { data: user }
    } catch (error) {
      return { error: 'Erro ao buscar perfil do usuário' }
    }
  }

  // Atualizar perfil
  static async updateProfile(userId: string, userData: UserUpdate) {
    try {
      const user = await UserService.update(userId, userData)
      if (!user) {
        return { error: 'Erro ao atualizar perfil' }
      }
      return { data: user }
    } catch (error) {
      return { error: 'Erro ao processar atualização do perfil' }
    }
  }

  // Validar usuário
  static async validateUser(userId: string) {
    try {
      const success = await UserService.validateUser(userId)
      if (!success) {
        return { error: 'Erro ao validar usuário' }
      }
      return { data: { message: 'Usuário validado com sucesso' } }
    } catch (error) {
      return { error: 'Erro ao processar validação do usuário' }
    }
  }

  // Listar usuários da moradia
  static async listHousingUsers(housingId: string) {
    try {
      const users = await UserService.findByHousing(housingId)
      return { data: users }
    } catch (error) {
      return { error: 'Erro ao listar usuários da moradia' }
    }
  }
}
