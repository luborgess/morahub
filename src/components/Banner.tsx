import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface BannerSlide {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  backgroundColor: string;
  tags: string[];
}

const SLIDE_DURATION = 5000; // 5 seconds per slide

export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides: BannerSlide[] = [
    {
      title: "Só as melhores marcas pra você",
      subtitle: "Form, Zara, Nike e Adidas",
      buttonText: "Comprar agora",
      buttonLink: "/promocoes",
      backgroundColor: "bg-purple-600",
      tags: ["Nike", "Zara", "New Shop", "Outlet"],
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070"
    },
    {
      title: "Ofertas Especiais em Eletrônicos",
      subtitle: "Smartphones, Notebooks e Tablets",
      buttonText: "Ver ofertas",
      buttonLink: "/eletronicos",
      backgroundColor: "bg-blue-600",
      tags: ["Apple", "Samsung", "Xiaomi"],
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2129"
    },
    {
      title: "Decoração para seu Lar",
      subtitle: "Móveis e Acessórios",
      buttonText: "Explorar",
      buttonLink: "/decoracao",
      backgroundColor: "bg-green-600",
      tags: ["Casa", "Decoração", "Design"],
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % slides.length);
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentBanner = slides[currentSlide];

  return (
    <div className="relative">
      <div className={`${currentBanner.backgroundColor} rounded-lg overflow-hidden relative mb-1`}>
        <div className="flex items-center">
          <div className="flex-1 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{currentBanner.title}</h2>
            <p className="text-white/80 mb-4">{currentBanner.subtitle}</p>
            <div className="flex gap-2 mb-4">
              {currentBanner.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/20 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={currentBanner.buttonLink}
              className="inline-block px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              {currentBanner.buttonText}
            </Link>
          </div>
          <div className="flex-1 relative h-48">
            <img
              src={currentBanner.image}
              alt={currentBanner.title}
              className="absolute right-0 h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="flex gap-2 px-1">
        {slides.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden"
          >
            <div
              className={`h-full rounded-full ${currentBanner.backgroundColor} transition-all duration-100 ease-linear`}
              style={{
                width: `${index === currentSlide ? progress : index < currentSlide ? 100 : 0}%`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
