import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logoDark from '../assets/logo-dark.png';
import kaneyPhone from '../assets/kaney_phone.png';
import kaneyProviderPhone from '../assets/kaney_provider_phone.png';
import camion4 from '../assets/camion_4.jpg';
import wheatHarvest from '../assets/Wheat-harvest.png';
import camposCultivo from '../assets/campos-de-cultivo.jpg';
import fotoNatasha from '../assets/foto_natasha.png';
import fotoRaymond from '../assets/foto_raymond.png';
import fotoClaudio from '../assets/foto_claudio.png';
import kaneyMarketPc from '../assets/kaney_market_pc.png';
import kaneyMarketPc2 from '../assets/kaney_market_pc2.png';
import kaneyMarketPc3 from '../assets/kaney_market_pc3.png';
import moticoYummy from '../assets/motico_yummy.png';
import tabletLogistica from '../assets/tablet_logistica.png';
import kaneyPhoneProvider1 from '../assets/kaney_phone_provider1.png';
import kaneyPhoneProvider2 from '../assets/kaney_phone_provider2.png';
import kaneyPhoneProvider3 from '../assets/kaney_phone_provider3.png';
import kaneySostenibleDark from '../assets/kaney_sostenible_dark.png';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(0);
  const [currentMarketplaceImage, setCurrentMarketplaceImage] = useState(0);
  const [currentQualityImage, setCurrentQualityImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [roadmapStep, setRoadmapStep] = useState(0);
  const [showFallingFruits, setShowFallingFruits] = useState(false);

  // Agregar estilos CSS para las animaciones
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes drawLine1 {
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes drawLine2 {
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes drawLine3 {
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes drawLine4 {
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes animate-fill-circle-1 {
        from {
          stroke-dashoffset: ${2 * Math.PI * 48};
        }
        to {
          stroke-dashoffset: ${2 * Math.PI * 48 * (1 - 0.734)};
        }
      }
      @keyframes animate-fill-circle-2 {
        from {
          stroke-dashoffset: ${2 * Math.PI * 48};
        }
        to {
          stroke-dashoffset: ${2 * Math.PI * 48 * (1 - 0.89)};
        }
      }
      @keyframes animate-fill-circle-3 {
        from {
          stroke-dashoffset: ${2 * Math.PI * 48};
        }
        to {
          stroke-dashoffset: ${2 * Math.PI * 48 * (1 - 0.40)};
        }
      }
      @keyframes animate-move-truck-across {
        from {
          left: calc(100% + 20px);
        }
        to {
          left: -100px;
        }
      }
      .animate-move-truck-across {
        animation-duration: 8s;
        animation-timing-function: ease-in-out;
      }
      @keyframes pulse-step {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(255, 117, 31, 0.7);
        }
        50% {
          transform: scale(1.05);
          box-shadow: 0 0 0 20px rgba(255, 117, 31, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(255, 117, 31, 0);
        }
      }
      @keyframes fall-fruit {
        0% {
          transform: translateY(-100px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(calc(100vh + 100px)) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Array de imágenes para el slideshow
  const backgroundImages = [camion4, wheatHarvest, camposCultivo];
  const marketplaceImages = [kaneyMarketPc, kaneyMarketPc2, kaneyMarketPc3];
  const qualityImages = [kaneyPhoneProvider3, kaneyPhoneProvider2, kaneyPhoneProvider1];

  // Slideshow automático cada 4 segundos para fondo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Slideshow automático cada 4 segundos para marketplace
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMarketplaceImage((prev) => (prev + 1) % marketplaceImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [marketplaceImages.length]);

  // Slideshow automático cada 2 segundos para control de calidad
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQualityImage((prev) => (prev + 1) % qualityImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [qualityImages.length]);

  // Control de animaciones para las diapositivas del ecosistema B2B
  useEffect(() => {
    if (currentSlide === 5 || currentSlide === 6 || currentSlide === 7 || currentSlide === 8 || currentSlide === 9 || currentSlide === 10) { // Diapositivas 6 (Marketplace), 7 (Logística), 8 (Control de Calidad), 9 (KANEY Sostenible), 10 (Triple Impacto) y 11 (Modelo de Negocio)
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1500); // Duración de la animación (un poco más para que se vea)

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [currentSlide]);

  // Animación del roadmap
  useEffect(() => {
    if (currentSlide === 14) { // Roadmap es ahora la diapositiva 15 (índice 14)
      setRoadmapStep(0);
      const timer1 = setTimeout(() => setRoadmapStep(1), 1000);
      const timer2 = setTimeout(() => setRoadmapStep(2), 2000);
      const timer3 = setTimeout(() => setRoadmapStep(3), 3000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setRoadmapStep(0);
    }
  }, [currentSlide]);

  // Animación de frutas cayendo en la diapositiva 9 (KANEY Sostenible)
  useEffect(() => {
    if (currentSlide === 8) { // KANEY Sostenible es la diapositiva 9 (índice 8)
      const timer = setTimeout(() => {
        setShowFallingFruits(true);
      }, 5000); // 5 segundos después de entrar a la diapositiva
      
      return () => {
        clearTimeout(timer);
        setShowFallingFruits(false);
      };
    } else {
      setShowFallingFruits(false);
    }
  }, [currentSlide]);

  const slides = [
    {
      id: 1,
      title: "Kaney: Pitch Deck Interactivo",
      content: (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-2xl mb-8" style={{ color: '#16423c' }}>
              <span className="font-bold">BRIDGES</span> presenta
            </p>
                <img 
                  src={logoDark} 
                  alt="Kaney Logo" 
                  className="h-32 w-auto mx-auto transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-lg cursor-pointer"
                />
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 2,
      title: "Misión",
      content: (
        <div className="h-full flex flex-col items-center justify-center" style={{ backgroundColor: '#16423c' }}>
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 className="text-5xl font-bold mb-8 text-white">
              La gran mayoría de los productores del país tienen mucha dificultad para llevar sus productos a las grandes ciudades. De hecho, una gran parte de ellos no cuenta con las herramientas logísticas para poder hacerlo.
            </h2>
            
            <div className="mt-16 space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20">
                <p className="text-3xl font-bold text-white mb-6 text-center">
                  Esto termina provocando una triple pérdida para el agricultor:
                </p>
                
                <div className="grid grid-cols-3 gap-8">
                  {/* Tiempo */}
                  <div className="text-center">
                    <h3 className="text-4xl font-black mb-2" style={{ color: '#ff751f', opacity: 0.8 }}>TIEMPO</h3>
                    <p className="text-lg text-white/90">Horas perdidas en viajes</p>
                  </div>
                  
                  {/* Dinero */}
                  <div className="text-center">
                    <h3 className="text-4xl font-black mb-2" style={{ color: '#ff751f', opacity: 0.8 }}>DINERO</h3>
                    <p className="text-lg text-white/90">Costos logísticos altos</p>
                  </div>
                  
                  {/* Cosecha */}
                  <div className="text-center">
                    <h3 className="text-4xl font-black mb-2" style={{ color: '#ff751f', opacity: 0.8 }}>COSECHA</h3>
                    <p className="text-lg text-white/90">Productos que se pierden</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-[#16423c]"
    },
    {
      id: 3,
      title: "Misión",
      content: (
        <div 
          className="w-full h-full flex flex-col items-center justify-center relative"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: '100% auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginLeft: '-2rem',
            marginRight: '-2rem',
            paddingLeft: '2rem',
            paddingRight: '2rem'
          }}
        >
          {/* Overlay con degradado */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#16423c]/85 via-[#16423c]/75 to-[#16423c]/90"
          ></div>
          
          <div className="text-center max-w-6xl relative z-10">
            <h2 className="text-4xl font-bold mb-8 text-white">
              Los proveedores actuales enfrentan esta situación con dos estrategias limitadas:
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Proveedores con transporte:
                </h3>
                <p className="text-xl leading-relaxed text-white">
                  Asumen viajes extensos y costos logísticos significativos. Afrontan incertidumbre sobre la venta total y pagan tarifas adicionales (como en el Mercado de Coche), sin eliminar el problema de la alta merma de productos.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Proveedores sin transporte:
                </h3>
                <p className="text-xl leading-relaxed text-white">
                  Ven su operación restringida únicamente a su mercado local. Limitándolos al punto de tener que abandonar sus cultivos por no poder tener acceso a un mercado más grande y rentable.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-[#16423c]"
    },
    {
      id: 4,
      title: "Problema",
      content: (
        <div 
          className="w-full h-full flex flex-col items-center justify-center"
          style={{ 
            background: 'linear-gradient(to bottom, #16423c 0%, #000000 100%)'
          }}
        >
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 className="text-5xl font-bold mb-8 text-white">
              El campo muere de hambre
            </h2>
            
            <p className="text-2xl leading-relaxed mb-12 text-white">
              Según estudios realizados por la <span className="font-bold" style={{ color: '#ff751f' }}>ENCOVI (Encuesta Nacional de Condiciones de Vida)</span>, es fácil ver que este no es un problema pequeño. Es impactante ver cómo nuestros agricultores producen la comida más fresca y de mejor calidad de Venezuela, pero las zonas rurales sufren de pobreza extrema.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Pobreza Rural */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-8 text-white">Pobreza Rural</h3>
                
                {/* Círculo de porcentaje */}
                <div className="relative w-44 h-44 mx-auto mb-8">
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 120 120">
                    {/* Fondo del círculo */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="10"
                      fill="none"
                    />
                        {/* Círculo de progreso */}
                        <circle
                          cx="60"
                          cy="60"
                          r="48"
                          stroke="#ff751f"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 48}`}
                          strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.734)}`}
                          className={`transition-all duration-2000 ease-out ${
                            currentSlide === 3 && isAnimating
                              ? 'animate-fill-circle-1'
                              : ''
                          }`}
                          style={{
                            strokeDashoffset: currentSlide === 3 && isAnimating 
                              ? `${2 * Math.PI * 48}` 
                              : `${2 * Math.PI * 48 * (1 - 0.734)}`
                          }}
                        />
                  </svg>
                  {/* Porcentaje en el centro */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">73.4%</span>
                  </div>
                </div>
                
                <p className="text-sm text-white leading-relaxed">
                  de los hogares agrícolas viven en pobreza
                </p>
                <p className="text-xs mt-2 text-white opacity-80">
                  ENCOVI 2023
                </p>
              </div>

              {/* Inseguridad Alimentaria */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-8 text-white">Inseguridad Alimentaria</h3>
                
                {/* Círculo de porcentaje */}
                <div className="relative w-44 h-44 mx-auto mb-8">
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 120 120">
                    {/* Fondo del círculo */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="10"
                      fill="none"
                    />
                        {/* Círculo de progreso */}
                        <circle
                          cx="60"
                          cy="60"
                          r="48"
                          stroke="#6a9c89"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 48}`}
                          strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.89)}`}
                          className={`transition-all duration-2000 ease-out delay-300 ${
                            currentSlide === 3 && isAnimating
                              ? 'animate-fill-circle-2'
                              : ''
                          }`}
                          style={{
                            strokeDashoffset: currentSlide === 3 && isAnimating 
                              ? `${2 * Math.PI * 48}` 
                              : `${2 * Math.PI * 48 * (1 - 0.89)}`
                          }}
                        />
                  </svg>
                  {/* Porcentaje en el centro */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">89%</span>
                  </div>
                </div>
                
                <p className="text-sm text-white leading-relaxed">
                  de hogares en Venezuela sufren inseguridad alimentaria
                </p>
                <p className="text-xs mt-2 text-white opacity-80">
                  ENCOVI 2023
                </p>
              </div>

              {/* Pérdida de Producción */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-8 text-white">Pérdida de Producción</h3>
                
                {/* Círculo de porcentaje */}
                <div className="relative w-44 h-44 mx-auto mb-8">
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 120 120">
                    {/* Fondo del círculo */}
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="10"
                      fill="none"
                    />
                        {/* Círculo de progreso */}
                        <circle
                          cx="60"
                          cy="60"
                          r="48"
                          stroke="#ff751f"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 48}`}
                          strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.40)}`}
                          className={`transition-all duration-2000 ease-out delay-600 ${
                            currentSlide === 3 && isAnimating
                              ? 'animate-fill-circle-3'
                              : ''
                          }`}
                          style={{
                            strokeDashoffset: currentSlide === 3 && isAnimating 
                              ? `${2 * Math.PI * 48}` 
                              : `${2 * Math.PI * 48 * (1 - 0.40)}`
                          }}
                        />
                  </svg>
                  {/* Porcentaje en el centro */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">40%</span>
                  </div>
                </div>
                
                <p className="text-sm text-white leading-relaxed">
                  de la producción se pierde antes de llegar al consumidor
                </p>
                <p className="text-xs mt-2 text-white opacity-80">
                  Estimado FAO
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-[#16423c]"
    },
    {
      id: 5,
      title: "Solución",
      content: (
            <div className="h-full w-full flex flex-col items-center justify-center relative">
              {/* Fondo con blur */}
              <div 
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ 
                  backgroundImage: `url(${backgroundImages[currentBackgroundImage]})`,
                  backgroundSize: '100% auto',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(2px)'
                }}
              ></div>
              
              {/* Overlay para mejorar legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#e9efec]/80 via-[#e9efec]/70 to-[#c4dad2]/80"></div>
          
          <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={logoDark} 
                  alt="KANEY Logo" 
                  className="h-16 w-auto"
                />
              </div>
              <h2 className="text-5xl font-bold" style={{ color: '#16423c' }}>
                es una plataforma que reimagina la logística agrícola.
              </h2>
            </div>
            
            <p className="text-3xl font-bold mb-8" style={{ color: '#16423c' }}>
              Facilitamos el envío de productos para lograr una conexión más eficiente, confiable y ecológica con los distribuidores de mercancía.
            </p>
            
            <div className="space-y-4">
              <p className="text-xl font-bold" style={{ color: '#16423c' }}>
                El modelo que desarrollamos en <span className="font-bold">KANEY</span> servirá como puente entre proveedores y distribuidores.
              </p>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 6,
      title: "Marketplace",
      content: (
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* Animación de líneas curvas */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" fill="none">
              {/* Línea 1 - Naranja */}
              <path 
                d="M950,550 Q800,300 650,200 Q500,100 350,150 Q200,200 50,50" 
                stroke="#ff751f" 
                strokeWidth="3" 
                fill="none"
                className="opacity-60"
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                  animation: 'drawLine1 3s ease-in-out forwards'
                }}
              />
              
              {/* Línea 2 - Verde */}
              <path 
                d="M950,520 Q750,250 600,180 Q450,80 300,120 Q150,170 50,80" 
                stroke="#6a9c89" 
                strokeWidth="2.5" 
                fill="none"
                className="opacity-50"
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                  animation: 'drawLine2 3.5s ease-in-out forwards'
                }}
              />
              
              {/* Línea 3 - Verde claro */}
              <path 
                d="M950,580 Q850,350 700,250 Q550,120 400,180 Q250,230 50,120" 
                stroke="#c4dad2" 
                strokeWidth="2" 
                fill="none"
                className="opacity-40"
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                  animation: 'drawLine3 4s ease-in-out forwards'
                }}
              />
              
              {/* Línea 4 - Verde oscuro */}
              <path 
                d="M950,490 Q800,200 650,120 Q500,60 350,100 Q200,150 50,30" 
                stroke="#16423c" 
                strokeWidth="2.5" 
                fill="none"
                className="opacity-45"
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: '1000',
                  animation: 'drawLine4 3.2s ease-in-out forwards'
                }}
              />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex items-center justify-center space-x-12">
              {/* Texto a la izquierda */}
              <div className="w-2/5 text-center">
                <h2 
                  className={`text-6xl font-black mb-6 transition-all duration-1000 ease-out ${
                    currentSlide === 5 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 5
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#16423c',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  ECOSISTEMA B2B INTELIGENTE
                </h2>
                
                <h3 
                  className={`text-4xl font-bold mb-8 transition-all duration-1000 ease-out delay-200 ${
                    currentSlide === 5 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 5
                      ? 'transform translate-x-0 opacity-100'
                      : currentSlide === 6
                      ? 'transform translate-x-8 opacity-0'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#ff751f',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  <span 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl font-black mr-4"
                    style={{ 
                      backgroundColor: '#ff751f',
                      boxShadow: '0 4px 8px rgba(255, 117, 31, 0.3)'
                    }}
                  >
                    1
                  </span>
                  MARKETPLACE
                </h3>
                
                <p 
                  className={`text-2xl leading-relaxed font-semibold transition-all duration-1000 ease-out delay-400 ${
                    currentSlide === 5 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 5
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#6a9c89',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  Los proveedores publican sus productos, dándoles visibilidad masiva a nivel nacional.
                </p>
              </div>

                  {/* Imagen a la derecha */}
                  <div className="w-3/5 flex justify-center">
                    <img 
                      src={marketplaceImages[currentMarketplaceImage]} 
                      alt="KANEY Marketplace - Plataforma web" 
                      className={`w-full h-auto max-w-2xl rounded-2xl transition-all duration-1000 ease-out delay-600 ${
                        currentSlide === 5 && isAnimating
                          ? 'transform translate-x-0 opacity-100' 
                          : currentSlide === 5
                          ? 'transform translate-x-0 opacity-100'
                          : 'transform translate-x-8 opacity-0'
                      }`}
                    />
                  </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 7,
      title: "Logística",
      content: (
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* Líneas curvas estáticas */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" fill="none">
              {/* Línea 1 - Naranja */}
              <path 
                d="M950,550 Q800,300 650,200 Q500,100 350,150 Q200,200 50,50" 
                stroke="#ff751f" 
                strokeWidth="3" 
                fill="none"
                className="opacity-60"
              />
              
              {/* Línea 2 - Verde */}
              <path 
                d="M950,520 Q750,250 600,180 Q450,80 300,120 Q150,170 50,80" 
                stroke="#6a9c89" 
                strokeWidth="2.5" 
                fill="none"
                className="opacity-50"
              />
              
              {/* Línea 3 - Verde claro */}
              <path 
                d="M950,580 Q850,350 700,250 Q550,120 400,180 Q250,230 50,120" 
                stroke="#c4dad2" 
                strokeWidth="2" 
                fill="none"
                className="opacity-40"
              />
              
              {/* Línea 4 - Verde oscuro */}
              <path 
                d="M950,490 Q800,200 650,120 Q500,60 350,100 Q200,150 50,30" 
                stroke="#16423c" 
                strokeWidth="2.5" 
                fill="none"
                className="opacity-45"
              />
            </svg>
          </div>

          {/* Imagen animada Motico Yummy */}
          <div 
            className={`absolute transition-all duration-[9000ms] ease-in-out ${
              currentSlide === 6 && isAnimating
                ? 'animate-move-truck-across'
                : ''
            }`}
            style={{
              bottom: '40px', // Misma distancia que el footer (30px + 30px de padding)
              left: currentSlide === 6 && isAnimating ? '-210px' : 'calc(100% + 100px)',
              zIndex: 20
            }}
          >
            <img 
              src={moticoYummy} 
              alt="Motico Yummy - Logística" 
              className="w-20 h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex items-center justify-center space-x-12">
              {/* Texto a la izquierda */}
              <div className="w-2/5 text-center">
                <h2 
                  className={`text-6xl font-black mb-6 transition-all duration-1000 ease-out ${
                    currentSlide === 6 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 6
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#16423c',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  ECOSISTEMA B2B INTELIGENTE
                </h2>
                
                <h3 
                  className={`text-4xl font-bold mb-8 transition-all duration-1000 ease-out delay-200 ${
                    currentSlide === 6 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 6
                      ? 'transform translate-x-0 opacity-100'
                      : currentSlide === 5
                      ? 'transform -translate-x-8 opacity-0'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#ff751f',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  <span 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl font-black mr-4"
                    style={{ 
                      backgroundColor: '#ff751f',
                      boxShadow: '0 4px 8px rgba(255, 117, 31, 0.3)'
                    }}
                  >
                    2
                  </span>
                  LOGÍSTICA
                </h3>
                
                <p 
                  className={`text-2xl leading-relaxed font-semibold transition-all duration-1000 ease-out delay-400 ${
                    currentSlide === 6 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 6
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#6a9c89',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  Creamos una ruta de recogida para buscar los productos en el campo. Estos son llevados a nuestro cross docking, y de ahí la entrega hacia sus compradores será manejada por <span className="font-bold animate-pulse" style={{ color: '#8e43c0' }}>Yummy</span>.
                </p>
              </div>

              {/* Imagen a la derecha */}
              <div className="w-3/5 flex justify-center items-center px-4">
                <img 
                  src={tabletLogistica} 
                  alt="Tablet Logística - KANEY" 
                  className={`w-full h-auto max-w-lg rounded-xl transition-all duration-1000 ease-out delay-600 ${
                    currentSlide === 6 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 6
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform translate-x-8 opacity-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 8,
      title: "Control de Calidad",
      content: (
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* Líneas curvas estáticas */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" fill="none">
              {/* Línea 1 - Naranja */}
              <path 
                d="M950,550 Q800,300 650,200 Q500,100 350,150 Q200,200 50,50" 
                stroke="#ff751f" 
                strokeWidth="3" 
                fill="none"
                className="opacity-60"
              />
              
              {/* Línea 2 - Verde */}
              <path 
                d="M950,520 Q750,250 600,180 Q450,80 300,120 Q150,170 50,80" 
                stroke="#6a9c89" 
                strokeWidth="2.5" 
                fill="none"
                className="opacity-50"
              />
              
              {/* Línea 3 - Verde claro */}
              <path 
                d="M950,580 Q850,350 700,250 Q550,120 400,180 Q250,230 50,120" 
                stroke="#c4dad2" 
                strokeWidth="2" 
                fill="none"
                className="opacity-40"
              />
              
              {/* Línea 4 - Verde oscuro */}
              <path 
                d="M950,490 Q800,200 650,120 Q500,60 350,100 Q200,150 50,30" 
                stroke="#16423c" 
                strokeWidth="2.5" 
                fill="none"
                className="opacity-45"
              />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex items-center justify-center space-x-12">
              {/* Texto a la izquierda */}
              <div className="w-2/5 text-center">
                <h2 
                  className={`text-6xl font-black mb-6 transition-all duration-1000 ease-out ${
                    currentSlide === 7 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 7
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#16423c',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  ECOSISTEMA B2B INTELIGENTE
                </h2>
                
                <h3 
                  className={`text-4xl font-bold mb-8 transition-all duration-1000 ease-out delay-200 ${
                    currentSlide === 7 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 7
                      ? 'transform translate-x-0 opacity-100'
                      : currentSlide === 6
                      ? 'transform -translate-x-8 opacity-0'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#ff751f',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  <span 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white text-2xl font-black mr-4"
                    style={{ 
                      backgroundColor: '#ff751f',
                      boxShadow: '0 4px 8px rgba(255, 117, 31, 0.3)'
                    }}
                  >
                    3
                  </span>
                  CONTROL DE CALIDAD
                </h3>
                
                <p 
                  className={`text-2xl leading-relaxed font-semibold transition-all duration-1000 ease-out delay-400 ${
                    currentSlide === 7 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 7
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform -translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    color: '#6a9c89',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  Inspeccionamos cada producto para garantizar calidad. Cualquier producto que no sea apto para consumo humano, será reutilizado en nuestro portal KANEY Sustentable, reduciendo así la merma.
                </p>
              </div>

              {/* Imagen a la derecha */}
              <div className="w-3/5 flex justify-center items-center px-8">
                <img 
                  src={qualityImages[currentQualityImage]} 
                  alt="Control de Calidad - KANEY" 
                  className={`w-full h-auto max-w-xs rounded-lg transition-all duration-1000 ease-out delay-600 ${
                    currentSlide === 7 && isAnimating
                      ? 'transform translate-x-0 opacity-100' 
                      : currentSlide === 7
                      ? 'transform translate-x-0 opacity-100'
                      : 'transform translate-x-8 opacity-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 9,
      title: "KANEY Sostenible",
      content: (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <div 
              className={`mb-8 -mt-12 transition-all duration-1000 ease-out ${
                currentSlide === 8 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 8
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
            >
              <img 
                src={kaneySostenibleDark} 
                alt="KANEY Sostenible Logo" 
                className="h-36 w-auto mx-auto block"
              />
            </div>
            
            <p 
              className={`text-2xl leading-relaxed font-semibold transition-all duration-1000 ease-out delay-200 ${
                currentSlide === 8 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 8
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
              style={{ color: '#16423c' }}
            >
              Esta será nuestra solución para evitar que la merma se desperdicie. Todos los productos no sean aptos para el consumo humano, entrarán en esta sección, la cual se encargará de darles un nuevo propósito a través de donaciones a <span className="font-bold">ONGs, universidades locales, granjas porcinas</span>, entre otros.
            </p>
            
            {/* Iconos representativos */}
            <div 
              className={`flex justify-center items-center space-x-12 mt-8 transition-all duration-1000 ease-out delay-400 ${
                currentSlide === 8 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 8
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
            >
              {/* ONGs */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <span className="text-3xl">🤝</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#16423c' }}>ONGs</p>
              </div>
              
              {/* Universidades */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <span className="text-3xl">🎓</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#16423c' }}>Universidades</p>
              </div>
              
              {/* Granjas Porcinas */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg">
                  <span className="text-3xl">🐷</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#16423c' }}>Granjas Porcinas</p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 10,
      title: "Triple Impacto",
      content: (
        <div className="h-full flex flex-col items-center justify-start relative overflow-hidden" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Círculos decorativos */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: '#ff751f' }}></div>
            <div className="absolute top-40 right-16 w-24 h-24 rounded-full opacity-15" style={{ backgroundColor: '#6a9c89' }}></div>
            <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#16423c' }}></div>
            <div className="absolute bottom-32 right-32 w-28 h-28 rounded-full opacity-10" style={{ backgroundColor: '#ff751f' }}></div>
          </div>

          <div className="max-w-6xl mx-auto px-8 text-center relative z-10 w-full">
            {/* Título principal con efecto visual */}
            <div 
              className={`mb-8 transition-all duration-1000 ease-out ${
                currentSlide === 9 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 9
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
            >
              <h2 
                className="text-5xl font-black mb-3"
                style={{ 
                  color: '#ff751f',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(135deg, #ff751f 0%, #ff8c42 50%, #ffa726 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                ¡TRIPLE IMPACTO!
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#ff751f' }}></div>
            </div>

            {/* Tarjetas de impacto con animaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Impacto 1 - Comunidad Agrícola */}
              <div 
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-orange-300 transition-all duration-700 ease-out transform hover:scale-105 hover:-translate-y-2 ${
                  currentSlide === 9 && isAnimating
                    ? 'transform translate-x-0 opacity-100' 
                    : currentSlide === 9
                    ? 'transform translate-x-0 opacity-100'
                    : 'transform -translate-x-8 opacity-0'
                }`}
                style={{ 
                  animationDelay: '200ms',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
                }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" 
                       style={{ background: 'linear-gradient(135deg, #ff751f 0%, #ff8c42 100%)' }}>
                    <span className="text-3xl">🌾</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>
                    Comunidad Agrícola
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#6a9c89' }}>
                    Empoderamos a nuestros agricultores con herramientas logísticas modernas y aumentando sus ingresos.
                  </p>
                </div>
              </div>

              {/* Impacto 2 - Distribuidores */}
              <div 
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-green-300 transition-all duration-700 ease-out transform hover:scale-105 hover:-translate-y-2 ${
                  currentSlide === 9 && isAnimating
                    ? 'transform translate-x-0 opacity-100' 
                    : currentSlide === 9
                    ? 'transform translate-x-0 opacity-100'
                    : 'transform -translate-x-8 opacity-0'
                }`}
                style={{ 
                  animationDelay: '400ms',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
                }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" 
                       style={{ background: 'linear-gradient(135deg, #6a9c89 0%, #8bb3a0 100%)' }}>
                    <span className="text-3xl">🚚</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>
                    Distribuidores
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#6a9c89' }}>
                    Simplificamos la cadena de suministro, garantizando productos frescos y reduciendo la complejidad logística.
                  </p>
                </div>
              </div>

              {/* Impacto 3 - Medio Ambiente */}
              <div 
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-blue-300 transition-all duration-700 ease-out transform hover:scale-105 hover:-translate-y-2 ${
                  currentSlide === 9 && isAnimating
                    ? 'transform translate-x-0 opacity-100' 
                    : currentSlide === 9
                    ? 'transform translate-x-0 opacity-100'
                    : 'transform -translate-x-8 opacity-0'
                }`}
                style={{ 
                  animationDelay: '600ms',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
                }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" 
                       style={{ background: 'linear-gradient(135deg, #16423c 0%, #2d5a4a 100%)' }}>
                    <span className="text-3xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>
                    Medio Ambiente
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: '#6a9c89' }}>
                    Reducimos el desperdicio alimentario y optimizamos rutas de transporte para minimizar la huella de carbono.
                  </p>
                </div>
              </div>
            </div>

            {/* Mensaje de cierre impactante */}
            <div 
              className={`bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-6 border-l-4 shadow-lg transition-all duration-1000 ease-out delay-800 ${
                currentSlide === 9 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 9
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
              style={{ borderLeftColor: '#ff751f' }}
            >
              <p className="text-2xl font-bold leading-relaxed" style={{ color: '#16423c' }}>
                <span className="text-3xl" style={{ color: '#ff751f' }}>KANEY</span> está creando un ecosistema donde 
                <span className="font-black" style={{ color: '#ff751f' }}> todos ganan</span>, 
                <span className="font-black" style={{ color: '#6a9c89' }}> el planeta se beneficia</span>, y 
                <span className="font-black" style={{ color: '#16423c' }}> el futuro es sostenible</span>.
              </p>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 11,
      title: "Modelo de Negocio",
      content: (
        <div className="h-full flex flex-col items-center justify-start relative overflow-hidden" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Líneas geométricas */}
            <div className="absolute top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30"></div>
            <div className="absolute top-32 right-0 w-px h-32 bg-gradient-to-b from-transparent via-green-300 to-transparent opacity-30"></div>
            <div className="absolute bottom-24 left-0 w-64 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-30"></div>
            {/* Círculos decorativos */}
            <div className="absolute top-24 right-20 w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: '#ff751f' }}></div>
            <div className="absolute bottom-32 left-16 w-12 h-12 rounded-full opacity-15" style={{ backgroundColor: '#6a9c89' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-8 text-center relative z-10 w-full">
            {/* Título principal con efecto empresarial */}
            <div 
              className={`mb-12 transition-all duration-1000 ease-out ${
                currentSlide === 10 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 10
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
            >
              <h2 
                className="text-6xl font-black mb-4"
                style={{ 
                  color: '#16423c',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(135deg, #16423c 0%, #2d5a4a 50%, #16423c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                MODELO DE NEGOCIO
              </h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#ff751f' }}></div>
                <div className="w-8 h-1 rounded-full" style={{ backgroundColor: '#6a9c89' }}></div>
                <div className="w-16 h-1 rounded-full" style={{ backgroundColor: '#ff751f' }}></div>
              </div>
            </div>

            {/* Subtítulo empresarial */}
            <div 
              className={`mb-16 transition-all duration-1000 ease-out delay-200 ${
                currentSlide === 10 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 10
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
            >
              <h3 
                className="text-4xl font-bold mb-4"
                style={{ 
                  color: '#ff751f',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Nuestros clientes ganan, y nosotros ganamos con ellos
              </h3>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#ff751f' }}></div>
            </div>

            {/* Modelos de ingresos principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Modelo Principal - Comisiones */}
              <div 
                className={`group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-transparent hover:border-orange-300 transition-all duration-700 ease-out transform hover:scale-105 hover:-translate-y-2 ${
                  currentSlide === 10 && isAnimating
                    ? 'transform translate-x-0 opacity-100' 
                    : currentSlide === 10
                    ? 'transform translate-x-0 opacity-100'
                    : 'transform -translate-x-8 opacity-0'
                }`}
                style={{ 
                  animationDelay: '400ms',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 100%)'
                }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300" 
                       style={{ background: 'linear-gradient(135deg, #ff751f 0%, #ff8c42 100%)' }}>
                    <span className="text-4xl">💰</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#16423c' }}>
                    Comisiones por Transacción
                  </h4>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 mb-4">
                    <p className="text-3xl font-black" style={{ color: '#ff751f' }}>3-5%</p>
                    <p className="text-sm font-semibold" style={{ color: '#16423c' }}>por cada pedido</p>
                  </div>
                  <p className="text-lg leading-relaxed" style={{ color: '#6a9c89' }}>
                    Modelo escalable y sostenible que crece con el volumen de transacciones de la plataforma.
                  </p>
                </div>
              </div>

              {/* Modelo Secundario - Valorización de Desperdicios */}
              <div 
                className={`group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-transparent hover:border-green-300 transition-all duration-700 ease-out transform hover:scale-105 hover:-translate-y-2 ${
                  currentSlide === 10 && isAnimating
                    ? 'transform translate-x-0 opacity-100' 
                    : currentSlide === 10
                    ? 'transform translate-x-0 opacity-100'
                    : 'transform -translate-x-8 opacity-0'
                }`}
                style={{ 
                  animationDelay: '600ms',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 100%)'
                }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300" 
                       style={{ background: 'linear-gradient(135deg, #6a9c89 0%, #8bb3a0 100%)' }}>
                    <span className="text-4xl">♻️</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#16423c' }}>
                    Valorización de Desperdicios
                  </h4>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 mb-4">
                    <p className="text-3xl font-black" style={{ color: '#6a9c89' }}>100%</p>
                    <p className="text-sm font-semibold" style={{ color: '#16423c' }}>aprovechamiento</p>
                  </div>
                  <p className="text-lg leading-relaxed" style={{ color: '#6a9c89' }}>
                    Transformamos productos no aptos en abono y alimento porcino, generando ingresos adicionales.
                  </p>
                </div>
              </div>
            </div>

            {/* Ventajas competitivas del modelo */}
            <div 
              className={`bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl p-8 border-l-4 shadow-xl transition-all duration-1000 ease-out delay-800 ${
                currentSlide === 10 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 10
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
              style={{ borderLeftColor: '#16423c' }}
            >
              <h4 className="text-2xl font-bold mb-6 text-center" style={{ color: '#16423c' }}>
                Ventajas Competitivas del Modelo
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ff751f' }}>
                    <span className="text-2xl">📈</span>
                  </div>
                  <h5 className="font-bold mb-2" style={{ color: '#16423c' }}>Escalabilidad</h5>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Crecimiento automático con el volumen</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6a9c89' }}>
                    <span className="text-2xl">🔄</span>
                  </div>
                  <h5 className="font-bold mb-2" style={{ color: '#16423c' }}>Sostenibilidad</h5>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Cero desperdicio, máximo aprovechamiento</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#16423c' }}>
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h5 className="font-bold mb-2" style={{ color: '#16423c' }}>Simplicidad</h5>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Modelo claro y fácil de entender</p>
                </div>
              </div>
            </div>

            {/* Mensaje de cierre empresarial */}
            <div 
              className={`mt-8 bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-6 border-l-4 shadow-lg transition-all duration-1000 ease-out delay-1000 ${
                currentSlide === 10 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 10
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
              style={{ borderLeftColor: '#ff751f' }}
            >
              <p className="text-xl font-bold leading-relaxed" style={{ color: '#16423c' }}>
                <span className="text-2xl" style={{ color: '#ff751f' }}>KANEY</span> crea un modelo de negocio donde 
                <span className="font-black" style={{ color: '#ff751f' }}> la rentabilidad</span> y 
                <span className="font-black" style={{ color: '#6a9c89' }}> la sostenibilidad</span> van de la mano.
                <span className="block mt-2 text-lg" style={{ color: '#6a9c89' }}>
                  Aquí nada se desperdicia, todo se transforma en valor.
                </span>
              </p>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 12,
      title: "Mercado",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-8" style={{ color: '#16423c' }}>
              Un mercado masivo, desatendido y listo para la disrupción
            </h2>
            
            <div className="space-y-12">
              <h3 className="text-3xl font-bold text-left mb-12" style={{ color: '#16423c' }}>
                La Nueva Estimación del Mercado (Frutas y Vegetales)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* TAM */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-l-4" style={{ borderLeftColor: '#ff751f' }}>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: '#ff751f' }}>
                      <span className="text-white text-2xl font-bold">TAM</span>
                    </div>
                    <h4 className="text-2xl font-bold" style={{ color: '#16423c' }}>Mercado Total Direccionable</h4>
                  </div>
                  <p className="text-4xl font-bold text-center mb-2" style={{ color: '#ff751f' }}>$1.7B</p>
                  <p className="text-sm text-center mb-2" style={{ color: '#6a9c89' }}>
                    Frutas y vegetales frescos comercializados en Venezuela (B2C + B2B)
                  </p>
                  <p className="text-xs text-center" style={{ color: '#6a9c89' }}>
                    Estimación conservadora: 20% del mercado total de alimentos ($8.5B × 20% = $1.7B)
                  </p>
                </div>

                {/* SAM */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-l-4" style={{ borderLeftColor: '#6a9c89' }}>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: '#6a9c89' }}>
                      <span className="text-white text-2xl font-bold">SAM</span>
                    </div>
                    <h4 className="text-2xl font-bold" style={{ color: '#16423c' }}>Mercado Direccionable y Servible</h4>
                  </div>
                  <p className="text-4xl font-bold text-center mb-2" style={{ color: '#ff751f' }}>$500M</p>
                  <p className="text-sm text-center mb-2" style={{ color: '#6a9c89' }}>
                    Canal B2B (HORECA y minoristas) - compradores de gran volumen y alta frecuencia
                  </p>
                  <p className="text-xs text-center" style={{ color: '#6a9c89' }}>
                    Representa ~30% del TAM ($1.7B × 30% = $500M)
                  </p>
                </div>

                {/* SOM */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-l-4" style={{ borderLeftColor: '#c4dad2' }}>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: '#c4dad2' }}>
                      <span className="text-2xl font-bold" style={{ color: '#16423c' }}>SOM</span>
                    </div>
                    <h4 className="text-2xl font-bold" style={{ color: '#16423c' }}>Mercado Obtenible y Servible</h4>
                  </div>
                  <p className="text-4xl font-bold text-center mb-2" style={{ color: '#ff751f' }}>$25M</p>
                      <p className="text-sm text-center mb-2" style={{ color: '#6a9c89' }}>
                        Meta realista de valor bruto en 3 años - objetivo ambicioso pero alcanzable
                      </p>
                  <p className="text-xs text-center" style={{ color: '#6a9c89' }}>
                    Captura del 5% del SAM ($500M × 5% = $25M)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 13,
      title: "Aliados Clave",
      content: (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 
              className={`text-5xl font-bold mb-8 transition-all duration-1000 ease-out ${
                currentSlide === 12 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 12
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
              style={{ color: '#16423c' }}
            >
              Aliados Clave
            </h2>
            
            <p 
              className={`text-2xl leading-relaxed transition-all duration-1000 ease-out delay-200 ${
                currentSlide === 12 && isAnimating
                  ? 'transform translate-x-0 opacity-100' 
                  : currentSlide === 12
                  ? 'transform translate-x-0 opacity-100'
                  : 'transform -translate-x-8 opacity-0'
              }`}
              style={{ color: '#6a9c89' }}
            >
              Al integrarnos con Yummy para la última milla no solo nos ahorraríamos costos logísticos, sino que también expandería la red de comercio de Yummy. Y al facilitar pagos con Cashea, nos aseguramos que nuestra comunidad agrícola reciba sus pagos a tiempo y de manera segura.
            </p>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 14,
      title: "Competencia",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-6" style={{ color: '#16423c' }}>
              Entendemos el Mercado y Sus Oportunidades
            </h2>
            <p className="text-lg text-left mb-8" style={{ color: '#6a9c89' }}>
              Pleni demostró que existe una demanda real en el mercado de logística agrícola. Su pivot estratégico hacia 6 abastos propios y ser mayorista exclusivo de Farmatodo deja un mercado desatendido que nosotros podemos servir.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pleni - Evolución Estratégica */}
              <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-l-4" style={{ borderLeftColor: '#6a9c89' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#16423c' }}>PLENI - Evolución Estratégica</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Mercado Original:</span>
                    <span className="text-gray-700 ml-2">B2C (Consumidor final)</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Pivot Actual:</span>
                    <span className="text-gray-700 ml-2">6 abastos propios + Farmatodo</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Modelo Logístico:</span>
                    <span className="text-gray-700 ml-2">Punto a punto, express</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Enfoque Actual:</span>
                    <span className="text-gray-700 ml-2">Operaciones controladas</span>
                  </div>
                  <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#e9efec' }}>
                    <p className="text-sm" style={{ color: '#16423c' }}>
                      <span className="font-bold">Oportunidad:</span> Dejaron un mercado B2B desatendido que demostraron que existe y necesita solución.
                    </p>
                  </div>
                </div>
              </div>

              {/* KANEY - Solución Especializada */}
              <div className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-l-4" style={{ borderLeftColor: '#ff751f' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#16423c' }}>KANEY - Solución Especializada</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Mercado:</span>
                    <span className="text-gray-700 ml-2">B2B (Empresas)</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Ticket Promedio:</span>
                    <span className="text-gray-700 ml-2">Alto / Muy Alto</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Modelo Logístico:</span>
                    <span className="text-gray-700 ml-2">Consolidado con Cross-Docking</span>
                  </div>
                  <div>
                    <span className="font-semibold" style={{ color: '#16423c' }}>Ventaja Competitiva:</span>
                    <span className="text-gray-700 ml-2">Transportistas Independientes</span>
                  </div>
                  <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#c4dad2' }}>
                    <p className="text-sm" style={{ color: '#16423c' }}>
                      <span className="font-bold">Fortaleza:</span> Modelo diseñado específicamente para las necesidades del sector agrícola venezolano.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nuestras Fortalezas */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: '#16423c' }}>
                Nuestras Fortalezas Estratégicas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#ff751f' }}>
                    <span className="text-white text-xl font-bold">B2B</span>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: '#16423c' }}>Mercado Especializado</h4>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Enfocados en empresas, tickets altos y compras recurrentes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#6a9c89' }}>
                    <span className="text-white text-lg font-bold">RED</span>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: '#16423c' }}>Red de Transportistas</h4>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>KANEY se convierte en el cerebro que orquesta una red de transportistas independientes y empresas de transporte existentes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#c4dad2' }}>
                    <span className="text-lg font-bold" style={{ color: '#16423c' }}>QA</span>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: '#16423c' }}>Control de Calidad</h4>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Inspección especializada para productos agrícolas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 15,
      title: "Roadmap",
      content: (
        <div className="h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-center mb-6" style={{ color: '#16423c' }}>
              Roadmap Estratégico
            </h2>
            <p className="text-xl text-center mb-16" style={{ color: '#6a9c89' }}>
              De la fundación al crecimiento sostenible en 18 meses en base a $25.000
            </p>
            
            {/* Timeline Horizontal */}
            <div className="relative">
              {/* Línea de conexión horizontal */}
              <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#ff751f] via-[#6a9c89] to-[#c4dad2] rounded-full"></div>
              
              <div className="grid grid-cols-3 gap-8 relative">
                {/* Fase 1 */}
                <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center relative border-2 transition-all duration-500 ${
                  roadmapStep >= 1 ? 'animate-pulse-step' : ''
                }`} style={{ borderColor: '#ff751f' }}>
                  <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10 shadow-lg transition-all duration-500 ${
                    roadmapStep >= 1 ? 'animate-pulse-step' : ''
                  }`} style={{ backgroundColor: '#ff751f' }}>
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>Fundación</h3>
                  <p className="text-lg font-semibold mb-6" style={{ color: '#ff751f' }}>Meses 1-3</p>
                  <div className="text-base space-y-3">
                    <p className="font-medium" style={{ color: '#16423c' }}>• Planificación estratégica</p>
                    <p className="font-medium" style={{ color: '#16423c' }}>• Desarrollo MVP</p>
                    <p className="font-medium" style={{ color: '#16423c' }}>• Estructura legal</p>
                  </div>
                </div>

                {/* Fase 2 */}
                <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center relative border-2 transition-all duration-500 ${
                  roadmapStep >= 2 ? 'animate-pulse-step' : ''
                }`} style={{ borderColor: '#6a9c89' }}>
                  <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10 shadow-lg transition-all duration-500 ${
                    roadmapStep >= 2 ? 'animate-pulse-step' : ''
                  }`} style={{ backgroundColor: '#6a9c89' }}>
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>Validación</h3>
                  <p className="text-lg font-semibold mb-6" style={{ color: '#6a9c89' }}>Meses 4-12</p>
                  <div className="text-base space-y-3">
                    <p className="font-medium" style={{ color: '#16423c' }}>• Captar proveedores</p>
                    <p className="font-medium" style={{ color: '#16423c' }}>• Generar primeras órdenes</p>
                    <p className="font-medium" style={{ color: '#16423c' }}>• Optimizar logística</p>
                  </div>
                </div>

                {/* Fase 3 */}
                <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl text-center relative border-2 transition-all duration-500 ${
                  roadmapStep >= 3 ? 'animate-pulse-step' : ''
                }`} style={{ borderColor: '#c4dad2' }}>
                  <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative z-10 shadow-lg transition-all duration-500 ${
                    roadmapStep >= 3 ? 'animate-pulse-step' : ''
                  }`} style={{ backgroundColor: '#c4dad2' }}>
                    <span className="text-2xl font-bold" style={{ color: '#16423c' }}>3</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>Crecimiento</h3>
                  <p className="text-lg font-semibold mb-6" style={{ color: '#c4dad2' }}>Meses 13-18</p>
                  <div className="text-base space-y-3">
                    <p className="font-medium" style={{ color: '#16423c' }}>• Aumentar volumen</p>
                    <p className="font-medium" style={{ color: '#16423c' }}>• Expandir base de usuarios</p>
                    <p className="font-medium" style={{ color: '#16423c' }}>• Buscar rentabilidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 16,
      title: "Equipo",
      content: (
        <div className="h-full flex flex-col relative">
          
              <div className="max-w-6xl mx-auto px-8 py-8 relative z-10">
                <div className="text-center mb-12 pt-8">
                  <h2 className="text-5xl font-bold mb-4" style={{ color: '#16423c' }}>
                    Conoce
                  </h2>
                  <div className="flex items-center justify-center">
                    <img 
                      src={logoDark} 
                      alt="KANEY Logo" 
                      className="h-16 w-auto"
                    />
                  </div>
                </div>
            
            <div className="flex justify-center items-center pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 w-full max-w-5xl">
                {/* Natasha Salcedo */}
                <div className="text-center">
                  <div className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#e9efec] to-[#c4dad2] flex items-center justify-center shadow-xl p-1">
                    <div className="w-52 h-52 rounded-full overflow-hidden">
                      <img 
                        src={fotoNatasha} 
                        alt="Natasha Salcedo" 
                        className="w-full h-full object-cover scale-125"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>
                    Natasha Salcedo
                  </h3>
                  <p className="text-lg" style={{ color: '#6a9c89' }}>
                    Frontend Dev.
                  </p>
                </div>

                {/* Raymond Medina */}
                <div className="text-center">
                  <div className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#e9efec] to-[#c4dad2] flex items-center justify-center shadow-xl p-1">
                    <div className="w-52 h-52 rounded-full overflow-hidden">
                      <img 
                        src={fotoRaymond} 
                        alt="Raymond Medina" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>
                    Raymond Medina
                  </h3>
                  <p className="text-lg" style={{ color: '#6a9c89' }}>
                    Full-Stack Dev.
                  </p>
                </div>

                {/* Claudio Machado */}
                <div className="text-center">
                  <div className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#e9efec] to-[#c4dad2] flex items-center justify-center shadow-xl p-1">
                    <div className="w-52 h-52 rounded-full overflow-hidden">
                      <img 
                        src={fotoClaudio} 
                        alt="Claudio Machado" 
                        className="w-full h-full object-cover scale-110"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#16423c' }}>
                    Claudio Machado
                  </h3>
                  <p className="text-lg" style={{ color: '#6a9c89' }}>
                    Frontend Dev.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Diapositiva actual */}
      <div className={`h-full w-full ${slides[currentSlide].background} flex items-center justify-center`}>
        {slides[currentSlide].content}
      </div>

      {/* Información de contacto global */}
      <div className="fixed bottom-12 left-8 z-10">
        <div className="flex space-x-4">
          <p className="text-sm" style={{ color: (currentSlide === 1 || currentSlide === 2 || currentSlide === 3) ? '#ffffff' : '#16423c' }}>www.kaneyconecta.com</p>
          <p className="text-sm" style={{ color: (currentSlide === 1 || currentSlide === 2 || currentSlide === 3) ? '#ffffff' : '#16423c' }}>kaney@conecta.com</p>
        </div>
      </div>

      {/* Navegación */}
      <div className="fixed bottom-12 right-4 z-20 flex items-center space-x-4">
        {/* Indicadores de diapositivas */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-[#6a9c89]' : 'bg-[#c4dad2]'
              }`}
            />
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-3 rounded-full transition-colors shadow-lg ${
              currentSlide === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-[#6a9c89] text-white hover:bg-[#16423c] hover:shadow-xl'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-3 rounded-full transition-colors shadow-lg ${
              currentSlide === slides.length - 1 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-[#6a9c89] text-white hover:bg-[#16423c] hover:shadow-xl'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Pie de página */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-10 text-center py-2" 
          style={{ 
            backgroundColor: currentSlide === 1 || currentSlide === 2 || currentSlide === 3 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(22, 66, 60, 0.1)' 
          }}
        >
            <div className="flex items-center justify-center" style={{ color: currentSlide === 1 || currentSlide === 2 || currentSlide === 3 ? '#16423c' : '#16423c' }}>
              <img 
                src={logoDark} 
                alt="Kaney Logo" 
                className="h-6 w-auto"
              />
            </div>
        </div>
    </div>
  );
};

export default PitchDeck;