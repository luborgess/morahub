import { Database } from '@/types/supabase'

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export class UserModel {
  constructor(private data: User) {}

  get id() { return this.data.id }
  get email() { return this.data.email }
  get name() { return this.data.name }
  get commercialName() { return this.data.commercial_name }
  get celular() { return this.data.celular }
  get cpf() { return this.data.cpf }
  get bio() { return this.data.bio }
  get imageUrl() { return this.data.image_url }
  get type() { return this.data.type }
  get status() { return this.data.status }
  get housingId() { return this.data.housing_id }
  get createdAt() { return new Date(this.data.created_at) }
  get updatedAt() { return new Date(this.data.updated_at) }

  // Métodos de validação
  isActive() {
    return this.status === 'ACTIVE'
  }

  canCreateListing() {
    return this.isActive() && ['UFMG', 'RESIDENT'].includes(this.type)
  }

  toJSON(): User {
    return this.data
  }
}
