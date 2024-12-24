import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  price: number;
  description: string;
  condition: string;
  views: number;
  date: string;
  image?: string;
}

export function ProductCard({
  title,
  price,
  description,
  condition,
  views,
  date,
  image = 'https://placehold.co/400x300'
}: ProductCardProps) {
  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] object-cover"
        />
        <Badge className="absolute top-2 right-2" variant="secondary">
          SALE
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-lg font-bold text-blue-600 mb-2">
          {formatCurrency(price)}
        </p>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <Badge variant="outline" className="mb-2">
          {condition}
        </Badge>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t flex justify-between text-sm text-gray-500">
        <span>{views} views</span>
        <span>{date}</span>
      </CardFooter>
    </Card>
  );
}
