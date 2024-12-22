import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Heart, Share2, MessageCircle, Moon, Sun, Menu } from 'lucide-react';

const ClassifiedsApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [likedAds, setLikedAds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const categories = [
    'Todos',
    'Imóveis',
    'Veículos',
    'Eletrônicos',
    'Móveis',
    'Serviços'
  ];

  const sampleAds = [
    {
      id: 1,
      title: 'Apartamento Design',
      price: 'R$ 850.000',
      category: 'Imóveis',
      location: 'Jardins, São Paulo',
      image: '/api/placeholder/300/200',
      description: 'Conceito aberto, acabamento premium',
      tags: ['Novo', 'Premium'],
      verified: true
    },
    {
      id: 2,
      title: 'Tesla Model 3',
      price: 'R$ 280.000',
      category: 'Veículos',
      location: 'Itaim Bibi, São Paulo',
      image: '/api/placeholder/300/200',
      description: 'Performance, Piloto Automático',
      tags: ['Elétrico', 'Luxo'],
      verified: true
    },
    {
      id: 3,
      title: 'MacBook Pro M2',
      price: 'R$ 12.500',
      category: 'Eletrônicos',
      location: 'Vila Olímpia, São Paulo',
      image: '/api/placeholder/300/200',
      description: '16GB RAM, 512GB SSD',
      tags: ['Apple', 'Novo']
    },
    {
      id: 4,
      title: 'Poltrona Design',
      price: 'R$ 4.800',
      category: 'Móveis',
      location: 'Moema, São Paulo',
      image: '/api/placeholder/300/200',
      description: 'Designer italiano, peça única',
      tags: ['Exclusivo', 'Design']
    }
  ];

  // Simular loading inicial
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleLike = (id) => {
    setLikedAds(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(id)) {
        newLiked.delete(id);
        handleNotification('Removido dos favoritos');
      } else {
        newLiked.add(id);
        handleNotification('Adicionado aos favoritos');
      }
      return newLiked;
    });
  };

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className={`animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl overflow-hidden`}>
      <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'
    }`}>
      {/* Notification Toast */}
      <div className={`fixed top-4 right-4 transition-all duration-300 ${
        showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
          {notificationMessage}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-50 ${
        showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setShowMobileMenu(false)}>
        <div className={`absolute right-0 top-0 h-full w-64 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } p-6 shadow-lg transition-transform duration-300 ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`} onClick={e => e.stopPropagation()}>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              {darkMode ? 'Modo Claro' : 'Modo Escuro'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <MessageCircle size={20} />
              Mensagens
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Heart size={20} />
              Favoritos
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <header className="mb-8 pt-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Classificados
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-100'
                } shadow-sm hover:shadow-md`}
                aria-label="Alternar tema"
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <button
                onClick={() => setShowMobileMenu(true)}
                className={`md:hidden p-2 rounded-full transition-all ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-100'
                } shadow-sm hover:shadow-md`}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="O que você procura?"
                className={`w-full p-4 pl-12 rounded-2xl transition-all ${
                  darkMode
                    ? 'bg-gray-800 border-gray-700 focus:border-blue-500'
                    : 'bg-white/80 backdrop-blur-sm border-gray-100'
                } border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
            </div>
            <button className={`p-4 rounded-2xl transition-all flex items-center gap-2 ${
              darkMode
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                : 'bg-white/80 backdrop-blur-sm border-gray-100 hover:bg-gray-50'
              } border shadow-sm hover:shadow-md`}>
              <Filter size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              <span>Filtros</span>
            </button>
          </div>
        </header>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-50'
              } border border-transparent`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton loading
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            sampleAds
              .filter(ad => selectedCategory === 'Todos' || ad.category === selectedCategory)
              .map((ad) => (
                <div
                  key={ad.id}
                  className={`group transition-all duration-300 rounded-3xl overflow-hidden ${
                    darkMode
                      ? 'bg-gray-800 hover:bg-gray-750'
                      : 'bg-white/80 backdrop-blur-sm hover:bg-white'
                  } border ${
                    darkMode ? 'border-gray-700' : 'border-gray-100'
                  } hover:shadow-xl`}
                >
                  <div className="relative">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Badge para anúncios verificados */}
                    {ad.verified && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-medium">
                        Verificado
                      </div>
                    )}
                    <button
                      onClick={() => toggleLike(ad.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                        darkMode
                          ? 'bg-gray-800/80 hover:bg-gray-700/80'
                          : 'bg-white/80 hover:bg-gray-50/80'
                      } backdrop-blur-sm shadow-sm hover:shadow-md`}
                    >
                      <Heart
                        size={20}
                        className={likedAds.has(ad.id) ? 'text-red-500 fill-red-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}
                      />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {ad.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs ${
                            darkMode
                              ? 'bg-blue-900/30 text-blue-400'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{ad.title}</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                      {ad.price}
                    </p>
                    <p className={`text-sm mb-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {ad.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <MapPin size={16} className="mr-1" />
                        {ad.location}
                      </div>
                      <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm hover:shadow-md transition-shadow">
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassifiedsApp;