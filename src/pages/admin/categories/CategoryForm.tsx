import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CategoryService } from '@/services/CategoryService'
import { CategoryModel, CategoryInsert, CategoryUpdate } from '@/models/Category'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function CategoryForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [parentCategories, setParentCategories] = useState<CategoryModel[]>([])
  
  const [formData, setFormData] = useState<CategoryInsert | CategoryUpdate>({
    name: '',
    description: '',
    slug: '',
    parent_id: null,
  })

  useEffect(() => {
    loadParentCategories()
    if (isEditing) {
      loadCategory()
    }
  }, [id])

  const loadParentCategories = async () => {
    const categories = await CategoryService.findParentCategories()
    setParentCategories(categories)
  }

  const loadCategory = async () => {
    if (!id) return
    
    try {
      const category = await CategoryService.findById(id)
      if (!category) throw new Error('Categoria não encontrada')
      
      setFormData({
        name: category.name,
        description: category.description,
        slug: category.slug,
        parent_id: category.parentId,
      })
    } catch (err) {
      setError('Erro ao carregar categoria')
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name),
      }

      let success
      if (isEditing && id) {
        success = await CategoryService.update(id, data)
      } else {
        success = await CategoryService.create(data as CategoryInsert)
      }

      if (!success) throw new Error('Erro ao salvar categoria')

      navigate('/admin/categories')
    } catch (err) {
      setError('Erro ao salvar categoria')
    } finally {
      setLoading(false)
    }
  }

  return (
    <RequireAuth allowedTypes={['ADMIN']}>
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nome*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Gerado automaticamente se vazio"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parent_id">Categoria Pai</Label>
              <Select
                value={formData.parent_id || ''}
                onValueChange={(value) => setFormData({ ...formData, parent_id: value || null })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria pai (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhuma (Categoria Principal)</SelectItem>
                  {parentCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/categories')}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </RequireAuth>
  )
}
