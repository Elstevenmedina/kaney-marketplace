import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { filterByCategory } from '@/store/slices/marketplaceSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import applesImg from '@/assets/product-apples.jpg';
import carrotsImg from '@/assets/product-carrots.jpg';
import grainsImg from '@/assets/product-grains.jpg';
import lettuceImg from '@/assets/product-lettuce.jpg';
import tomatoesImg from '@/assets/product-tomatoes.jpg';
import peppersImg from '@/assets/product-peppers.jpg';

const categories = [
  { id: 'hortalizas', name: 'Hortalizas', image: tomatoesImg, comingSoon: false },
  { id: 'frutas', name: 'Frutas', image: applesImg, comingSoon: false },
  { id: 'granos-semillas', name: 'Granos y Semillas', image: grainsImg, comingSoon: false },
  { id: 'hojas-aromaticas', name: 'Hojas o Aromáticas', image: lettuceImg, comingSoon: false },
  { id: 'tuberculos', name: 'Tubérculos', image: carrotsImg, comingSoon: false },
];

export const CategoryNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedCategory = useAppSelector((state) => state.marketplace.selectedCategory);

  const handleCategoryClick = (categoryId: string | null, comingSoon: boolean) => {
    if (!comingSoon && categoryId) {
      navigate(`/category/${categoryId}`);
    }
  };

  const handleAllProductsClick = () => {
    navigate('/products');
  };

  return (
    <section className="bg-background py-6 sm:py-8">
      <div className="w-full px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center sm:text-left">
          Categorías de Productos
        </h2>
        
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              
              return (
                <Card
                  key={category.id || 'all'}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? 'ring-2 ring-primary shadow-lg' : ''
                  } ${category.comingSoon ? 'opacity-75' : ''}`}
                  onClick={() => handleCategoryClick(category.id, category.comingSoon)}
                >
                  <CardContent className="p-0 relative">
                    {category.image ? (
                      <div className="aspect-square overflow-hidden rounded-t-lg relative">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className={`w-full h-full object-cover ${category.comingSoon ? 'opacity-30' : ''}`}
                        />
                        {category.comingSoon && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-bold text-primary text-xs">
                              Muy Pronto
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                        <span className="text-2xl">🛒</span>
                      </div>
                    )}
                    <div className="p-2 text-center">
                      <h3 className="font-semibold text-xs text-foreground leading-tight">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Mobile Todos Button */}
          <button
            onClick={handleAllProductsClick}
            className="group w-full flex items-center justify-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-all duration-300 py-3 px-4 border border-primary/20 rounded-lg hover:border-primary/40"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
              Todos los Productos
            </span>
            <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-end gap-4">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 flex-1">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              
              return (
                <Card
                  key={category.id || 'all'}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? 'ring-2 ring-primary shadow-lg' : ''
                  } ${category.comingSoon ? 'opacity-75' : ''}`}
                  onClick={() => handleCategoryClick(category.id, category.comingSoon)}
                >
                  <CardContent className="p-0 relative">
                    {category.image ? (
                      <div className="aspect-square overflow-hidden rounded-t-xl relative">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className={`w-full h-full object-cover ${category.comingSoon ? 'opacity-30' : ''}`}
                        />
                        {category.comingSoon && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-bold text-primary text-sm sm:text-lg">
                              Muy Pronto
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-xl flex items-center justify-center">
                        <span className="text-3xl sm:text-4xl">🛒</span>
                      </div>
                    )}
                    <div className="p-2 sm:p-3 text-center">
                      <h3 className="font-semibold text-xs sm:text-sm text-foreground">{category.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Desktop Todos Button */}
          <button
            onClick={handleAllProductsClick}
            className="group flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-all duration-300 pb-3 px-3 py-2 relative"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">
              Todos los Productos
            </span>
            <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            
            {/* Underline effect on hover */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
          </button>
        </div>
      </div>
    </section>
  );
};
