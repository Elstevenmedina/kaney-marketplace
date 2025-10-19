import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logoDark from '../assets/logo-dark.png';
import kaneyPhone from '../assets/kaney_phone.png';
import kaneyProviderPhone from '../assets/kaney_provider_phone.png';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
              className="h-32 w-auto mx-auto"
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
            
            <div className="space-y-4">
              <p className="text-xl text-white">
                Esto termina provocando una triple pérdida para el agricultor:
              </p>
              <p className="text-2xl font-bold text-white">
                <span className="font-bold">Tiempo</span>, <span className="font-bold">Dinero</span> y <span className="font-bold">Cosecha</span>.
              </p>
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
            backgroundSize: 'cover',
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
        <div className="h-full flex flex-col">
<<<<<<< HEAD
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between">
              {/* Texto a la izquierda */}
              <div className="w-1/2 pr-8">
                <h2 className="text-5xl font-bold mb-8" style={{ color: '#16423c' }}>
                  <span className="font-bold">KANEY</span> es una plataforma que reimagina la logística agrícola, facilitando el envío de productos para lograr una conexión más eficiente, confiable y ecológica con los distribuidores de mercancía.
                </h2>
                
                <div className="space-y-4">
                  <p className="text-xl" style={{ color: '#6a9c89' }}>
                    El modelo que desarrollamos en KANEY servirá como puente entre proveedores y distribuidores.
                  </p>
                </div>
              </div>

              {/* Imagen a la derecha */}
              <div className="w-1/2 flex justify-center">
                <img 
                  src="/src/assets/kaney_market_pc.png" 
                  alt="KANEY Marketplace - Plataforma web" 
                  className="w-full h-auto max-w-lg rounded-2xl shadow-xl"
                />
              </div>
=======
          <div className="max-w-6xl mx-auto px-8 py-4">
            <h2 className="text-4xl font-bold text-left mb-4" style={{ color: '#16423c' }}>
              Presentamos un Ecosistema B2B Inteligente
            </h2>
            <p className="text-xl text-left mb-8" style={{ color: '#6a9c89' }}>
              <span className="font-bold">KANEY</span> es una plataforma que re-imagina la logística agrícola, haciéndola más rentable, eficiente y confiable.
            </p>
            
            <div className="flex">
                      {/* Contenido compactado a la izquierda */}
                      <div className="w-2/5 pr-4">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold mb-4" style={{ color: '#16423c' }}>Nuestro Proceso</h3>
                  
                  {/* Paso 1: Marketplace */}
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#ff751f' }}>
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: '#16423c' }}>Marketplace Inteligente</h4>
                    </div>
                            <p className="text-sm leading-relaxed ml-13" style={{ color: '#6a9c89' }}>
                              Los productores publican sus productos, dándoles visibilidad masiva a nivel nacional.
                            </p>
                  </div>

                  {/* Paso 2: Logística Consolidada */}
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#6a9c89' }}>
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: '#16423c' }}>Logística Optimizada</h4>
                    </div>
                            <p className="text-sm leading-relaxed ml-13" style={{ color: '#6a9c89' }}>
                              Creamos una ruta de recogida para buscar los productos en el campo. Estos son llevados a nuestro cross docking, y de ahí la entrega hacia sus compradores será manejada por Yummy.
                            </p>
                  </div>

                  {/* Paso 3: Hub Cross-Docking */}
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#c4dad2' }}>
                        <span className="text-sm font-bold" style={{ color: '#16423c' }}>3</span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: '#16423c' }}>Control de Calidad</h4>
                    </div>
                            <p className="text-sm leading-relaxed ml-13" style={{ color: '#6a9c89' }}>
                              Inspeccionamos cada producto para garantizar calidad. Cualquier producto que no sea apto para consumo humano, será reutilizado en nuestro portal KANEY Sustentable, reduciendo así la merma.
                            </p>
                  </div>
                </div>
              </div>

                      {/* Imágenes de las apps móviles */}
                      <div className="w-3/5 flex items-center justify-end space-x-2">
                        {/* Imagen principal (marketplace) */}
                        <img 
                          src={kaneyPhone} 
                          alt="App KANEY - Interfaz móvil" 
                          className="w-64 h-auto rounded-2xl mr-8"
                        />
                        {/* Imagen secundaria (provider) */}
                        <img 
                          src={kaneyProviderPhone} 
                          alt="App KANEY Provider - Interfaz móvil" 
                          className="w-64 h-auto rounded-2xl opacity-80 -mt-6 ml-8"
                        />
                      </div>
>>>>>>> 427e0a7a5a0941ee07bdc107f0134d1b1c007da3
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 6,
      title: "Equipo",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-8" style={{ color: '#16423c' }}>
              Nuestro Equipo
            </h2>
            
            <div className="flex justify-center items-center h-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 w-full max-w-5xl">
                {/* Natasha Salcedo */}
                <div className="text-center">
                  <div className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#e9efec] to-[#c4dad2] flex items-center justify-center shadow-xl">
                    <div className="w-52 h-52 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-5xl text-gray-400">📷</span>
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
                  <div className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#e9efec] to-[#c4dad2] flex items-center justify-center shadow-xl">
                    <div className="w-52 h-52 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-5xl text-gray-400">📷</span>
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
                  <div className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#e9efec] to-[#c4dad2] flex items-center justify-center shadow-xl">
                    <div className="w-52 h-52 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-5xl text-gray-400">📷</span>
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
    },
    {
      id: 7,
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
                    Meta realista de GMV en 3 años - objetivo ambicioso pero alcanzable
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
      id: 8,
      title: "Modelo de Negocio",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-8" style={{ color: '#16423c' }}>
              Un Modelo de Negocio Transparente y Escalable
            </h2>
            <p className="text-xl text-left mb-8" style={{ color: '#6a9c89' }}>
              Ganamos cuando nuestros usuarios ganan, creando un círculo virtuoso de crecimiento.
            </p>
            
            <div className="space-y-4">
              {/* Comisión Central */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#16423c' }}>Comisión Central</h3>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-l-4" style={{ borderLeftColor: '#ff751f' }}>
                          <p className="text-3xl font-bold mb-1" style={{ color: '#ff751f' }}>12% + Logística</p>
                          <p className="text-sm" style={{ color: '#16423c' }}>
                            Sobre el valor total (GMV) de cada venta exitosa a través de la plataforma
                          </p>
                          <p className="text-xs mt-1" style={{ color: '#6a9c89' }}>
                            Sin costos ocultos
                          </p>
                        </div>
              </div>

              {/* Economía de un Pedido Promedio */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <h3 className="text-xl font-bold text-center mb-4" style={{ color: '#16423c' }}>
                  Economía de un Pedido Promedio ($400)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Margen Bruto Kaney */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#ff751f' }}>
                      <span className="text-white text-sm font-bold">$21</span>
                    </div>
                    <h4 className="text-sm font-bold mb-1" style={{ color: '#16423c' }}>Margen Bruto Kaney</h4>
                    <p className="text-xs" style={{ color: '#6a9c89' }}>12% de comisión sobre $400</p>
                  </div>

                  {/* Costos Operativos */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#6a9c89' }}>
                      <span className="text-white text-sm font-bold">$27</span>
                    </div>
                    <h4 className="text-sm font-bold mb-1" style={{ color: '#16423c' }}>Costos Operativos</h4>
                    <p className="text-xs" style={{ color: '#6a9c89' }}>Logística, personal y tecnología</p>
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
      id: 9,
      title: "Competencia",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-6" style={{ color: '#16423c' }}>
              Aprendimos del Fracaso de Pleni
            </h2>
            <p className="text-lg text-left mb-8" style={{ color: '#6a9c89' }}>
              Pleni intentó revolucionar el B2C con entregas ultra-rápidas. Su fracaso no fue tecnológico, sino la consecuencia de un modelo logístico insostenible en Venezuela.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pleni - Modelo Fallido */}
              <div className="bg-red-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-l-4 border-red-400">
                <h3 className="text-2xl font-bold mb-4 text-red-700">PLENI (Modelo Fallido)</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-red-600">Mercado:</span>
                    <span className="text-gray-700 ml-2">B2C (Consumidor final)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600">Ticket Promedio:</span>
                    <span className="text-gray-700 ml-2">Bajo</span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600">Modelo Logístico:</span>
                    <span className="text-gray-700 ml-2">Punto a punto, express</span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-600">Costo Principal:</span>
                    <span className="text-gray-700 ml-2">Flota última milla</span>
                  </div>
                  <div className="mt-4 p-3 bg-red-100 rounded-lg">
                    <p className="text-sm text-red-700">
                      <span className="font-bold">Punto de quiebre:</span> El costo de la última milla superaba el margen de ganancia.
                    </p>
                  </div>
                </div>
              </div>

              {/* KANEY - Modelo Exitoso */}
              <div className="bg-green-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-l-4" style={{ borderLeftColor: '#6a9c89' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#16423c' }}>KANEY (Modelo Exitoso)</h3>
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
                    <span className="font-semibold" style={{ color: '#16423c' }}>Costo Principal:</span>
                    <span className="text-gray-700 ml-2">Operación Cross-Dock</span>
                  </div>
                  <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#c4dad2' }}>
                    <p className="text-sm" style={{ color: '#16423c' }}>
                      <span className="font-bold">Ventaja:</span> Modelo diseñado para ser rentable desde su concepción.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diferenciadores Clave */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-center mb-6" style={{ color: '#16423c' }}>
                Nuestros Diferenciadores Clave
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#ff751f' }}>
                    <span className="text-white text-xl font-bold">B2B</span>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: '#16423c' }}>Mercado Correcto</h4>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Tickets altos, compras recurrentes</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#6a9c89' }}>
                    <span className="text-white text-lg font-bold">CONS</span>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: '#16423c' }}>Logística Consolidada</h4>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Eficiencia operativa, costos controlados</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#c4dad2' }}>
                    <span className="text-lg font-bold" style={{ color: '#16423c' }}>QA</span>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: '#16423c' }}>Calidad Verificada</h4>
                  <p className="text-sm" style={{ color: '#6a9c89' }}>Control total, confianza garantizada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 10,
      title: "Roadmap",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <h2 className="text-4xl font-bold text-left mb-4" style={{ color: '#16423c' }}>
              Nuestro Plan a 18 Meses
            </h2>
            <p className="text-lg text-left mb-8" style={{ color: '#6a9c89' }}>
              De la validación inicial al crecimiento regional, con hitos claros y medibles.
            </p>
            
            {/* Timeline Horizontal */}
            <div className="relative">
              {/* Línea de conexión horizontal */}
              <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-[#ff751f] via-[#6a9c89] to-[#c4dad2] rounded-full"></div>
              
              <div className="grid grid-cols-3 gap-8 relative">
                {/* Fase 1 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center relative">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10" style={{ backgroundColor: '#ff751f' }}>
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#16423c' }}>Lanzamiento y Validación</h3>
                  <p className="text-sm mb-3" style={{ color: '#6a9c89' }}>Meses 1-6</p>
                  <p className="text-lg font-bold mb-3" style={{ color: '#ff751f' }}>$150K/mes</p>
                  <div className="text-sm space-y-1">
                    <p style={{ color: '#16423c' }}>• MVP en Caracas</p>
                    <p style={{ color: '#16423c' }}>• Primer Hub Cross-Docking</p>
                    <p style={{ color: '#16423c' }}>• 50 productores, 100 clientes</p>
                  </div>
                </div>

                {/* Fase 2 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center relative">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10" style={{ backgroundColor: '#6a9c89' }}>
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#16423c' }}>Expansión Regional</h3>
                  <p className="text-sm mb-3" style={{ color: '#6a9c89' }}>Meses 7-12</p>
                  <p className="text-lg font-bold mb-3" style={{ color: '#6a9c89' }}>$500K/mes</p>
                  <div className="text-sm space-y-1">
                    <p style={{ color: '#16423c' }}>• Hubs Valencia y Maracay</p>
                    <p style={{ color: '#16423c' }}>• Analíticas para clientes</p>
                    <p style={{ color: '#16423c' }}>• 200 productores, 400 clientes</p>
                  </div>
                </div>

                {/* Fase 3 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center relative">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10" style={{ backgroundColor: '#c4dad2' }}>
                    <span className="text-xl font-bold" style={{ color: '#16423c' }}>3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#16423c' }}>Optimización y Escala</h3>
                  <p className="text-sm mb-3" style={{ color: '#6a9c89' }}>Meses 13-18</p>
                  <p className="text-lg font-bold mb-3" style={{ color: '#c4dad2' }}>$1M/mes</p>
                  <div className="text-sm space-y-1">
                    <p style={{ color: '#16423c' }}>• Micro-financiamiento</p>
                    <p style={{ color: '#16423c' }}>• Programa Kaney Sustentable</p>
                    <p style={{ color: '#16423c' }}>• Rentabilidad operativa</p>
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
      id: 9,
      title: "La Petición",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-8" style={{ color: '#16423c' }}>
              Buscamos $500,000 para ejecutar esta visión
            </h2>
            <p className="text-2xl text-left mb-16" style={{ color: '#6a9c89' }}>
              Esta inversión inicial nos permitirá lanzar nuestras operaciones, validar el modelo en Caracas y prepararnos para la expansión regional que transformará el agro venezolano.
            </p>
            
            <div className="space-y-12">
              {/* Inversión solicitada */}
              <div className="text-center mb-12">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-xl border-l-4" style={{ borderLeftColor: '#ff751f' }}>
                  <p className="text-6xl font-bold mb-6" style={{ color: '#ff751f' }}>$500,000</p>
                  <p className="text-2xl mb-4" style={{ color: '#16423c' }}>
                    Inversión inicial para lanzar nuestras operaciones
                  </p>
                  <p className="text-lg" style={{ color: '#6a9c89' }}>
                    Validar el modelo en Caracas y prepararnos para la expansión regional
                  </p>
                </div>
              </div>

              {/* Llamada a la acción */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#16423c' }}>Contáctenos</h3>
                <p className="text-2xl mb-4" style={{ color: '#16423c' }}>
                  <span className="font-bold" style={{ color: '#ff751f' }}>inversion@kaney.com</span>
                </p>
                <p className="text-lg" style={{ color: '#6a9c89' }}>
                  Únase a nosotros en la transformación del sector agrícola venezolano
                </p>
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
<<<<<<< HEAD
          <p className="text-sm text-white">www.kaneyconecta.com</p>
          <p className="text-sm text-white">kaney@conecta.com</p>
=======
          <p className="text-sm" style={{ color: '#16423c' }}>www.kaneyconecta.com</p>
          <p className="text-sm" style={{ color: '#16423c' }}>conecta@kaney.com</p>
>>>>>>> 427e0a7a5a0941ee07bdc107f0134d1b1c007da3
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