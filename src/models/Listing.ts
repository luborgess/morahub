import { Database } from '@/types/supabase'

export type Listing = Database['public']['Tables']['listings']['Row']
export type ListingInsert = Database['public']['Tables']['listings']['Insert']
export type ListingUpdate = Database['public']['Tables']['listings']['Update']

export type ListingStatus = 'ACTIVE' | 'SOLD' | 'EXPIRED' | 'DELETED'
export type ListingType = 'PRODUCT' | 'SERVICE'

export class ListingModel {
  constructor(private data: Listing) {}

  // Getters básicos
  get id() { return this.data.id }
  get title() { return this.data.title }
  get description() { return this.data.description }
  get price() { return this.data.price }
  get type() { return this.data.type }
  get status() { return this.data.status }
  get userId() { return this.data.user_id }
  get categoryId() { return this.data.category_id }
  get imageUrls() { return this.data.image_urls || [] }
  get createdAt() { return new Date(this.data.created_at) }
  get updatedAt() { return new Date(this.data.updated_at) }
  get views() { return this.data.views || 0 }
  get location() { return this.data.location }

  // Métodos de validação
  isActive() {
    return this.status === 'ACTIVE'
  }

  isProduct() {
    return this.type === 'PRODUCT'
  }

  isService() {
    return this.type === 'SERVICE'
  }

  canEdit(userId: string) {
    return this.userId === userId
  }

  // Formatadores
  formatPrice() {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(this.price)
  }

  formatDate() {
    return this.createdAt.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Conversão para JSON
  toJSON(): Listing {
    return this.data
  }
}
