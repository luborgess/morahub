import { supabase } from '@/lib/supabase'
import { ListingModel, ListingInsert, ListingUpdate, ListingStatus } from '@/models/Listing'

export class ListingService {
  // Buscar todos os anúncios (com filtros opcionais)
  static async findAll(filters?: {
    status?: ListingStatus
    categoryId?: string
    userId?: string
    type?: 'PRODUCT' | 'SERVICE'
    search?: string
    limit?: number
    offset?: number
  }) {
    let query = supabase
      .from('listings')
      .select('*, users(name, commercial_name), categories(name)')
      .order('created_at', { ascending: false })

    // Aplicar filtros
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId)
    }
    if (filters?.userId) {
      query = query.eq('user_id', filters.userId)
    }
    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error || !data) return []
    return data.map(listing => new ListingModel(listing))
  }

  // Buscar anúncio por ID
  static async findById(id: string): Promise<ListingModel | null> {
    const { data, error } = await supabase
      .from('listings')
      .select('*, users(name, commercial_name), categories(name)')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return new ListingModel(data)
  }

  // Criar anúncio
  static async create(listingData: ListingInsert): Promise<ListingModel | null> {
    // Adiciona status inicial e timestamps
    const data = {
      ...listingData,
      status: 'ACTIVE',
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data: newListing, error } = await supabase
      .from('listings')
      .insert(data)
      .select('*')
      .single()

    if (error || !newListing) return null
    return new ListingModel(newListing)
  }

  // Atualizar anúncio
  static async update(id: string, listingData: ListingUpdate): Promise<ListingModel | null> {
    const data = {
      ...listingData,
      updated_at: new Date().toISOString()
    }

    const { data: updated, error } = await supabase
      .from('listings')
      .update(data)
      .eq('id', id)
      .select('*')
      .single()

    if (error || !updated) return null
    return new ListingModel(updated)
  }

  // Marcar como vendido
  static async markAsSold(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('listings')
      .update({ status: 'SOLD', updated_at: new Date().toISOString() })
      .eq('id', id)

    return !error
  }

  // Marcar como expirado
  static async markAsExpired(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('listings')
      .update({ status: 'EXPIRED', updated_at: new Date().toISOString() })
      .eq('id', id)

    return !error
  }

  // Deletar anúncio (soft delete)
  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('listings')
      .update({ status: 'DELETED', updated_at: new Date().toISOString() })
      .eq('id', id)

    return !error
  }

  // Incrementar visualizações
  static async incrementViews(id: string): Promise<boolean> {
    const { error } = await supabase.rpc('increment_listing_views', { listing_id: id })
    return !error
  }

  // Upload de imagens
  static async uploadImages(files: File[]): Promise<string[]> {
    const urls: string[] = []

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage
        .from('listings')
        .upload(fileName, file)

      if (error) continue

      const { data: { publicUrl } } = supabase.storage
        .from('listings')
        .getPublicUrl(fileName)

      urls.push(publicUrl)
    }

    return urls
  }

  // Deletar imagem
  static async deleteImage(url: string): Promise<boolean> {
    const fileName = url.split('/').pop()
    if (!fileName) return false

    const { error } = await supabase.storage
      .from('listings')
      .remove([fileName])

    return !error
  }
}
