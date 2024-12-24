import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ListingService } from '@/services/ListingService'
import { CategoryService } from '@/services/CategoryService'
import { ListingInsert, ListingUpdate } from '@/models/Listing'
import { CategoryModel } from '@/models/Category'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ListingForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const isEditing = !!id

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  
  const [formData, setFormData] = useState<ListingInsert | ListingUpdate>({
    title: '',
    description: '',
    price: 0,
    type: 'PRODUCT',
    category_id: '',
    location: '',
    image_urls: []
  })

  useEffect(() => {
    loadCategories()
    if (isEditing) {
      loadListing()
    }
  }, [id])

  const loadCategories = async () => {
    const data = await CategoryService.findAll()
    setCategories(data)
  }

  const loadListing = async () => {
    if (!id) return
    
    try {
      const listing = await ListingService.findById(id)
      if (!listing) throw new Error('Anúncio não encontrado')
      
      setFormData({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        type: listing.type,
        category_id: listing.categoryId,
        location: listing.location,
        image_urls: listing.imageUrls
      })
      setPreviewUrls(listing.imageUrls)
    } catch (err) {
      setError('Erro ao carregar anúncio')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])

    // Criar previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = async (index: number) => {
    if (isEditing && formData.image_urls?.[index]) {
      await ListingService.deleteImage(formData.image_urls[index])
    }

    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls?.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      // Upload de novas imagens
      const newImageUrls = await ListingService.uploadImages(selectedFiles)
      const allImageUrls = [...(formData.image_urls || []), ...newImageUrls]

      const data = {
        ...formData,
        price: Number(formData.price),
        image_urls: allImageUrls,
        user_id: user.id
      }

      let success
      if (isEditing && id) {
        success = await ListingService.update(id, data)
      } else {
        success = await ListingService.create(data as ListingInsert)
      }

      if (!success) throw new Error('Erro ao salvar anúncio')

      navigate('/listings')
    } catch (err) {
      setError('Erro ao salvar anúncio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar Anúncio' : 'Novo Anúncio'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Título*</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição*</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço*</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo*</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as 'PRODUCT' | 'SERVICE' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRODUCT">Produto</SelectItem>
                <SelectItem value="SERVICE">Serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria*</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Imagens</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <div className="grid grid-cols-4 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/listings')}
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
  )
}
