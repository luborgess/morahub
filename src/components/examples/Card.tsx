import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Gift, Package, Repeat, ShoppingBag, Tag, Timer, User } from 'lucide-react';

// Define os tipos possíveis de listagem (venda, aluguel, doação, troca)
type ListingType = 'SALE' | 'RENT' | 'DONATION' | 'EXCHANGE';

// Define os estados possíveis de uma listagem
type ListingStatus = 'ACTIVE' | 'SOLD' | 'RESERVED' | 'DELETED';

// Interface que define a estrutura de uma listagem
type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  type: ListingType;
  status: ListingStatus;
  condition: string | null;
  images: { url: string; metadata?: any }[];
  visualizacoes: number;
  created_at: string;
};

const HomePage = () => {
  // Dados mockados para exemplo
  const listings: Listing[] = [
    {
      id: "1",
      title: "Bicicleta Mountain Bike",
      price: 800,
      type: "SALE",
      status: "ACTIVE",
      condition: "Usado - Bom estado",
      description: "Bicicleta em ótimo estado, pouco uso",
      images: [{ url: "/api/placeholder/400/300" }],
      visualizacoes: 45,
      created_at: new Date().toISOString()
    },
    // ... outros itens
  ];

  /**
   * Retorna o ícone apropriado baseado no tipo da listagem
   * @param type - Tipo da listagem (SALE, RENT, DONATION, EXCHANGE)
   * @returns Componente de ícone do Lucide
   */
  const getListingTypeIcon = (type: ListingType) => {
    switch (type) {
      case 'SALE':
        return <Tag className="w-3 h-3" />;
      case 'RENT':
        return <Timer className="w-3 h-3" />;
      case 'DONATION':
        return <Gift className="w-3 h-3" />;
      case 'EXCHANGE':
        return <Repeat className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  /**
   * Retorna as classes de estilo para o badge baseado no tipo da listagem
   * @param type - Tipo da listagem
   * @returns String com classes do Tailwind
   */
  const getListingTypeColor = (type: ListingType) => {
    switch (type) {
      case 'SALE':
        return 'bg-blue-600 text-white';
      case 'RENT':
        return 'bg-purple-600 text-white';
      case 'DONATION':
        return 'bg-green-600 text-white';
      case 'EXCHANGE':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  /**
   * Formata o preço baseado no tipo da listagem
   * Para doações retorna "Doação", para trocas retorna "Troca"
   * Para outros tipos formata o valor em reais
   * @param price - Preço do item
   * @param type - Tipo da listagem
   * @returns String formatada do preço
   */
  const formatPrice = (price: number, type: ListingType) => {
    if (type === 'DONATION') return 'Doação';
    if (type === 'EXCHANGE') return 'Troca';
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Seção Hero com gradiente e título */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bem-vindo ao MoraHub
          </h1>
          <p className="text-xl text-gray-100">
            Conectando produtos e serviços nas moradias universitárias da UFMG
          </p>
        </div>
      </div>

      {/* Grid de listagens */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Container da imagem com badge de status */}
              {listing.images[0] && (
                <div className="relative">
                  <img
                    src={listing.images[0].url}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  {listing.status === 'RESERVED' && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-500 text-white font-semibold">
                        Reservado
                      </Badge>
                    </div>
                  )}
                </div>
              )}
              
              {/* Cabeçalho do card com título e badge de tipo */}
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold line-clamp-1">
                    {listing.title}
                  </CardTitle>
                  <Badge className={getListingTypeColor(listing.type)}>
                    {getListingTypeIcon(listing.type)}
                    <span className="ml-1">{listing.type}</span>
                  </Badge>
                </div>
                <CardDescription className="text-2xl font-bold text-green-600">
                  {formatPrice(listing.price, listing.type)}
                </CardDescription>
              </CardHeader>

              {/* Conteúdo do card com descrição e condição */}
              <CardContent className="space-y-3">
                <p className="text-gray-600 line-clamp-2">{listing.description}</p>
                
                {listing.condition && (
                  <Badge variant="secondary" className="bg-gray-200 text-gray-800 font-medium">
                    <Package className="w-3 h-3 mr-1" />
                    {listing.condition}
                  </Badge>
                )}
              </CardContent>

              {/* Rodapé do card com métricas */}
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {listing.visualizacoes} views
                  </span>
                  <span>
                    {new Date(listing.created_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;