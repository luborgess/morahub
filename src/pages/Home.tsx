import { ProductCard } from '@/components/ProductCard'
import { ServiceCard } from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
import { CategoryCarousel } from '@/components/CategoryCarousel'
import { Banner } from '@/components/Banner'
import type { CategoryType } from '@/types/category'

export default function Home() {
  // Sample product data
  const products = [
    {
      title: 'Bicicleta Mountain Bike',
      price: 800,
      description: 'Bicicleta em ótimo estado, pouco uso',
      condition: 'Usado - Bom estado',
      views: 45,
      date: '24/12/2024',
      image: 'https://placehold.co/400x300'
    },
    // Add more sample products here
  ]

  // Sample services data
  const services = [
    {
      title: 'Manutenção de Notebooks',
      description: 'Formatação, limpeza e upgrades',
      price: { value: 50 },
      rating: 4.8,
      icon: 'notebook' as const
    },
    {
      title: 'Aulas Particulares',
      description: 'Cálculo, Física e Programação',
      price: { value: 60, unit: 'hora' },
      rating: 5.0,
      icon: 'teaching' as const
    },
    {
      title: 'Refeições Caseiras',
      description: 'Marmitas saudáveis e veganas',
      price: { value: 15, unit: 'refeição' },
      rating: 4.9,
      icon: 'food' as const
    }
  ]

  // Category icons data
  const categories: CategoryType[] = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Celulares',
      to: '/category/celulares'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      label: 'Decoração',
      to: '/category/decoracao'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: 'Autos',
      to: '/category/autos'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Imóveis',
      to: '/category/imoveis'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-4">
      <Banner />

      <div className="py-6">
        <CategoryCarousel categories={categories} />
      </div>

      <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-12 mb-6">
        <h2 className="text-2xl font-bold">Serviços em Destaque</h2>
        <Button variant="secondary">Ver todos</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  )
}