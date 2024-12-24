import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ListingService } from '@/services/ListingService'
import { ListingModel } from '@/models/Listing'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [listing, setListing] = useState<ListingModel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadListing()
    }
  }, [id])

  const loadListing = async () => {
    if (!id) return
    
    try {
      const data = await ListingService.findById(id)
      if (!data) throw new Error('Anúncio não encontrado')
      setListing(data)
      
      // Incrementa visualizações
      await ListingService.incrementViews(id)
    } catch (err) {
      setError('Erro ao carregar anúncio')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsSold = async () => {
    if (!listing) return
    
    try {
      const success = await ListingService.markAsSold(listing.id)
      if (success) {
        loadListing()
      } else {
        throw new Error('Erro ao marcar como vendido')
      }
    } catch (err) {
      alert('Erro ao marcar como vendido')
    }
  }

  const handleDelete = async () => {
    if (!listing || !confirm('Tem certeza que deseja excluir este anúncio?')) return
    
    try {
      const success = await ListingService.delete(listing.id)
      if (success) {
        navigate('/listings')
      } else {
        throw new Error('Erro ao excluir anúncio')
      }
    } catch (err) {
      alert('Erro ao excluir anúncio')
    }
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
  if (!listing) return <div>Anúncio não encontrado</div>

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        {/* Galeria de Imagens */}
        {listing.imageUrls.length > 0 && (
          <div className="relative h-96">
            <img
              src={listing.imageUrls[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.imageUrls.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                {listing.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${listing.title} - ${index + 1}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{listing.title}</CardTitle>
              <p className="text-4xl font-bold text-primary mt-4">
                {listing.formatPrice()}
              </p>
            </div>
            {listing.status !== 'ACTIVE' && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
                {listing.status === 'SOLD' ? 'VENDIDO' : 'EXPIRADO'}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="whitespace-pre-wrap">{listing.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Tipo</h3>
              <p>{listing.isProduct() ? 'Produto' : 'Serviço'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Localização</h3>
              <p>{listing.location || 'Não informada'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Visualizações</h3>
              <p>{listing.views}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Publicado em</h3>
              <p>{listing.formatDate()}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="space-x-4">
            {user && listing.canEdit(user.id) && listing.isActive() && (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/listings/edit/${listing.id}`)}
                >
                  Editar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleMarkAsSold}
                >
                  Marcar como Vendido
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Excluir
                </Button>
              </>
            )}
          </div>
          
          <Button
            size="lg"
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(
              `Olá! Vi seu anúncio "${listing.title}" no MoraHub e gostaria de mais informações.`
            )}`)}
          >
            Entrar em Contato
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
