import { Database } from '@/types/supabase'

export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export class CategoryModel {
  constructor(private data: Category) {}

  get id() { return this.data.id }
  get name() { return this.data.name }
  get description() { return this.data.description }
  get slug() { return this.data.slug }
  get imageUrl() { return this.data.image_url }
  get parentId() { return this.data.parent_id }
  get createdAt() { return new Date(this.data.created_at) }
  get updatedAt() { return new Date(this.data.updated_at) }

  // Métodos de validação
  isParentCategory() {
    return !this.parentId
  }

  isSubcategory() {
    return !!this.parentId
  }

  toJSON(): Category {
    return this.data
  }
}
