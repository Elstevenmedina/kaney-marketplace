import { Button } from '@/components/ui/button';
import { ArrowRight, Store } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary w-full">
      <div className="w-full px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 leading-tight">
            Conecta con el mejor mercado agrícola de Venezuela
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Conectamos agricultores con tu negocio. Calidad garantizada, precios justos y entregas rápidas.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="accent"
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
              onClick={() => {
                const element = document.getElementById('todos-los-productos');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Ver Productos <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4" 
              onClick={() => window.open('https://proveedores.kaneyconecta.com/login', '_blank')}
            >
              <Store className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Vender
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
