import { supabase } from '@/lib/supabase'
import { CategoryModel, CategoryInsert, CategoryUpdate } from '@/models/Category'

export class CategoryService {
  // Buscar todas as categorias
  static async findAll(): Promise<CategoryModel[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error || !data) return []
    return data.map(category => new CategoryModel(category))
  }

  // Buscar categoria por ID
  static async findById(id: string): Promise<CategoryModel | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return new CategoryModel(data)
  }

  // Buscar categorias principais (sem parent_id)
  static async findParentCategories(): Promise<CategoryModel[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .order('name')

    if (error || !data) return []
    return data.map(category => new CategoryModel(category))
  }

  // Buscar subcategorias de uma categoria
  static async findSubcategories(parentId: string): Promise<CategoryModel[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)
      .order('name')

    if (error || !data) return []
    return data.map(category => new CategoryModel(category))
  }

  // Criar categoria
  static async create(categoryData: CategoryInsert): Promise<CategoryModel | null> {
    const { data, error } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single()

    if (error || !data) return null
    return new CategoryModel(data)
  }

  // Atualizar categoria
  static async update(id: string, categoryData: CategoryUpdate): Promise<CategoryModel | null> {
    const { data, error } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) return null
    return new CategoryModel(data)
  }

  // Deletar categoria
  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    return !error
  }

  // Buscar por slug
  static async findBySlug(slug: string): Promise<CategoryModel | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) return null
    return new CategoryModel(data)
  }
}
