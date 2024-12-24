import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CategoryIcon } from './CategoryIcon';
import type { CategoryType } from '@/types/category';

interface CategoryCarouselProps {
  categories: CategoryType[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex-none">
            <CategoryIcon {...category} />
          </div>
        ))}
      </div>
    </div>
  );
}
