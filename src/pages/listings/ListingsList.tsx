import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListingService } from '@/services/ListingService'
import { ListingModel } from '@/models/Listing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ListingsList() {
  const navigate = useNavigate()
  const [listings, setListings] = useState<ListingModel[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    categoryId: ''
  })

  useEffect(() => {
    loadListings()
  }, [filters])

  const loadListings = async () => {
    try {
      const data = await ListingService.findAll({
        status: 'ACTIVE',
        search: filters.search || undefined,
        type: filters.type as any || undefined,
        categoryId: filters.categoryId || undefined
      })
      setListings(data)
    } catch (err) {
      console.error('Erro ao carregar anúncios:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Anúncios</h1>
        <Button onClick={() => navigate('/listings/new')}>
          Criar Anúncio
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Buscar anúncios..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="max-w-xs"
        />
        <Select
          value={filters.type}
          onValueChange={(value) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="PRODUCT">Produtos</SelectItem>
            <SelectItem value="SERVICE">Serviços</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Anúncios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
            {listing.imageUrls[0] && (
              <img
                src={listing.imageUrls[0]}
                alt={listing.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{listing.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {listing.formatPrice()}
              </p>
              <p className="text-muted-foreground line-clamp-2">
                {listing.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate(`/listings/${listing.id}`)}
              >
                Ver Detalhes
              </Button>
              <span className="text-sm text-muted-foreground">
                {listing.formatDate()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
