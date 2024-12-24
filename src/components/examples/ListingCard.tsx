import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Gift, Package, Repeat, ShoppingBag, Tag, Timer, User } from 'lucide-react';

// Define os tipos possíveis de listagem (venda, aluguel, doação, troca)
type ListingType = 'SALE' | 'RENT' | 'DONATION' | 'EXCHANGE';

// Define os estados possíveis de uma listagem
type ListingStatus = 'ACTIVE' | 'SOLD' | 'RESERVED' | 'DELETED';

// Interface que define a estrutura de uma listagem
interface ListingProps {
  id: string;
  title: string;
  description: string;
  price: number;
  type: ListingType;
  status: ListingStatus;
  condition: string | null;
  images: { url: string; metadata?: any }[];
  createdAt: Date;
  updatedAt: Date;
}

interface Listing {
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
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export function ListingCard({ listing }: { listing: ListingProps }) {
  // Função para formatar o preço em reais
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Função para obter o ícone baseado no tipo de listagem
  const getTypeIcon = (type: ListingType) => {
    switch (type) {
      case 'SALE':
        return <ShoppingBag className="h-4 w-4" />;
      case 'RENT':
        return <Timer className="h-4 w-4" />;
      case 'DONATION':
        return <Gift className="h-4 w-4" />;
      case 'EXCHANGE':
        return <Repeat className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Função para obter a cor do badge baseado no tipo de listagem
  const getTypeColor = (type: ListingType) => {
    switch (type) {
      case 'SALE':
        return 'bg-green-100 text-green-800';
      case 'RENT':
        return 'bg-blue-100 text-blue-800';
      case 'DONATION':
        return 'bg-purple-100 text-purple-800';
      case 'EXCHANGE':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para obter o texto do tipo de listagem
  const getTypeText = (type: ListingType) => {
    switch (type) {
      case 'SALE':
        return 'Venda';
      case 'RENT':
        return 'Aluguel';
      case 'DONATION':
        return 'Doação';
      case 'EXCHANGE':
        return 'Troca';
      default:
        return type;
    }
  };

  // Função para obter a cor do badge de status
  const getStatusColor = (status: ListingStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'SOLD':
        return 'bg-gray-100 text-gray-800';
      case 'RESERVED':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para obter o texto do status
  const getStatusText = (status: ListingStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'Ativo';
      case 'SOLD':
        return 'Vendido';
      case 'RESERVED':
        return 'Reservado';
      case 'DELETED':
        return 'Deletado';
      default:
        return status;
    }
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      {/* Imagem principal */}
      {listing.images.length > 0 && (
        <div className="relative h-48 w-full">
          <img
            src={listing.images[0].url}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{listing.title}</CardTitle>
          <Badge variant="outline" className={getTypeColor(listing.type)}>
            {getTypeIcon(listing.type)}
            <span className="ml-1">{getTypeText(listing.type)}</span>
          </Badge>
        </div>
        <CardDescription>{listing.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Preço */}
          {listing.type !== 'DONATION' && (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{formatPrice(listing.price)}</span>
            </div>
          )}

          {/* Condição */}
          {listing.condition && (
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span>{listing.condition}</span>
            </div>
          )}

          {/* Status */}
          <Badge className={getStatusColor(listing.status)}>
            {getStatusText(listing.status)}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Building2 className="h-4 w-4" />
          <span>Local</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <User className="h-4 w-4" />
          <span>Vendedor</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default HomePage;