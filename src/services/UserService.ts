import { supabase } from '@/lib/supabase'
import { UserModel, UserInsert, UserUpdate } from '@/models/User'

export class UserService {
  // Buscar usuário por ID
  static async findById(id: string): Promise<UserModel | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return new UserModel(data)
  }

  // Buscar usuário por email
  static async findByEmail(email: string): Promise<UserModel | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) return null
    return new UserModel(data)
  }

  // Criar novo usuário
  static async create(userData: UserInsert): Promise<UserModel | null> {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()

    if (error || !data) return null
    return new UserModel(data)
  }

  // Atualizar usuário
  static async update(id: string, userData: UserUpdate): Promise<UserModel | null> {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) return null
    return new UserModel(data)
  }

  // Validar usuário
  static async validateUser(id: string): Promise<boolean> {
    const user = await this.findById(id)
    if (!user) return false

    const { error } = await supabase
      .from('users')
      .update({ status: 'ACTIVE' })
      .eq('id', id)

    return !error
  }

  // Buscar usuários por moradia
  static async findByHousing(housingId: string): Promise<UserModel[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('housing_id', housingId)

    if (error || !data) return []
    return data.map(user => new UserModel(user))
  }
}
