import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
              src="/src/assets/logo-dark.png" 
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
          <div className="text-center max-w-4xl">
            <h2 className="text-5xl font-bold mb-8 text-white">
              Digitalizamos la cadena de suministro agrícola de Venezuela para erradicar la pobreza rural
            </h2>
            <p className="text-2xl leading-relaxed" style={{ color: '#c4dad2' }}>
              Construimos un sistema alimentario más justo, eficiente y sostenible, conectando directamente al campo con la ciudad.
            </p>
          </div>
        </div>
      ),
      background: "bg-[#16423c]"
    },
    {
      id: 3,
      title: "Problema",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-7xl mx-auto px-8 h-full flex flex-col">
            <h2 className="text-5xl font-bold text-left mt-8" style={{ color: '#16423c' }}>
              El eslabón entre el agricultor y la ciudad está roto
            </h2>
            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Texto descriptivo */}
              <div className="space-y-4 flex flex-col justify-center">
                <p className="text-xl text-left" style={{ color: '#6a9c89' }}>
                  La gran mayoría de los productores del país tienen mucha dificultad para llevar sus productos a las grandes ciudades. De hecho, una gran parte de ellos no tienen siquiera las herramientas logísticas para poder hacerlo.
                </p>
                <p className="text-lg text-left" style={{ color: '#6a9c89' }}>
                  Lo que denota en los siguientes estudios realizados por la ENCOVI (Encuesta Nacional de Condiciones de Vida)
                </p>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-left" style={{ color: '#16423c' }}>
                    Los proveedores actuales enfrentan esta situación con dos estrategias limitadas:
                  </p>
                  <div className="space-y-2">
                    <p className="text-base text-left" style={{ color: '#6a9c89' }}>
                      <span className="font-semibold" style={{ color: '#16423c' }}>Proveedores con transporte:</span> Asumen viajes extensos y costos logísticos significativos. Afrontan incertidumbre sobre la venta total y pagan tarifas adicionales (como en el Mercado de Coche), sin eliminar el problema de la alta merma de productos.
                    </p>
                    <p className="text-base text-left" style={{ color: '#6a9c89' }}>
                      <span className="font-semibold" style={{ color: '#16423c' }}>Proveedores sin transporte:</span> Ven su operación restringida únicamente a su mercado local.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Estadísticas */}
              <div className="space-y-5 flex flex-col justify-center">
                {/* Pobreza Rural */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold" style={{ color: '#16423c' }}>Pobreza Rural</h3>
                    <span className="text-4xl font-black" style={{ color: '#ff751f' }}>73.4%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div 
                      className="h-8 rounded-full" 
                      style={{ 
                        width: '73.4%', 
                        backgroundColor: '#ff751f' 
                      }}
                    >
                    </div>
                  </div>
                  <p className="text-base" style={{ color: '#6a9c89' }}>
                    de los hogares agrícolas viven en pobreza • ENCOVI 2023
                  </p>
                </div>

                {/* Inseguridad Alimentaria */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold" style={{ color: '#16423c' }}>Inseguridad Alimentaria</h3>
                    <span className="text-4xl font-black" style={{ color: '#6a9c89' }}>89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div 
                      className="h-8 rounded-full" 
                      style={{ 
                        width: '89%', 
                        backgroundColor: '#6a9c89' 
                      }}
                    >
                    </div>
                  </div>
                  <p className="text-base" style={{ color: '#6a9c89' }}>
                    de hogares en Venezuela sufren inseguridad alimentaria • ENCOVI 2023
                  </p>
                </div>

                {/* Pérdida de Producción */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold" style={{ color: '#16423c' }}>Pérdida de Producción</h3>
                    <span className="text-4xl font-black" style={{ color: '#16423c' }}>40%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div 
                      className="h-8 rounded-full" 
                      style={{ 
                        width: '40%', 
                        backgroundColor: '#16423c' 
                      }}
                    >
                    </div>
                  </div>
                  <p className="text-base" style={{ color: '#6a9c89' }}>
                    de la producción se pierde antes de llegar al consumidor • Estimado FAO
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
      id: 4,
      title: "Solución",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-6" style={{ color: '#16423c' }}>
              Presentamos un Ecosistema B2B Inteligente
            </h2>
            <p className="text-2xl text-left mb-12" style={{ color: '#6a9c89' }}>
              <span className="font-bold">KANEY</span> es una plataforma que re-imagina la logística agrícola, haciéndola más rentable, eficiente y confiable.
            </p>
            
            <div className="flex">
                      {/* Contenido compactado a la izquierda */}
                      <div className="w-2/5 pr-4">
                        <div className="space-y-6 -mt-8">
                          <h3 className="text-2xl font-bold mb-6" style={{ color: '#16423c' }}>Nuestro Proceso</h3>
                  
                  {/* Paso 1: Marketplace */}
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#ff751f' }}>
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <h4 className="text-xl font-bold" style={{ color: '#16423c' }}>Marketplace Inteligente</h4>
                    </div>
                            <p className="text-base leading-relaxed ml-13" style={{ color: '#6a9c89' }}>
                              Los productores publican sus productos, dándoles visibilidad masiva a nivel nacional.
                            </p>
                  </div>

                  {/* Paso 2: Logística Consolidada */}
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#6a9c89' }}>
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <h4 className="text-xl font-bold" style={{ color: '#16423c' }}>Logística Optimizada</h4>
                    </div>
                            <p className="text-base leading-relaxed ml-13" style={{ color: '#6a9c89' }}>
                              Creamos una ruta de recogida para buscar los productos en el campo. Estos son llevados a nuestro cross docking, y de ahí la entrega hacia sus compradores será manejada por Yummy.
                            </p>
                  </div>

                  {/* Paso 3: Hub Cross-Docking */}
                  <div className="relative">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#c4dad2' }}>
                        <span className="text-sm font-bold" style={{ color: '#16423c' }}>3</span>
                      </div>
                      <h4 className="text-xl font-bold" style={{ color: '#16423c' }}>Control de Calidad</h4>
                    </div>
                            <p className="text-base leading-relaxed ml-13" style={{ color: '#6a9c89' }}>
                              Inspeccionamos cada producto para garantizar calidad. Cualquier producto que no sea apto para consumo humano, será reutilizado en nuestro portal KANEY Sustentable, reduciendo así la merma.
                            </p>
                  </div>
                </div>
              </div>

                      {/* Imágenes de las apps móviles */}
                      <div className="w-3/5 flex items-center justify-end space-x-2">
                        {/* Imagen principal (marketplace) */}
                        <img 
                          src="/src/assets/kaney_phone.png" 
                          alt="App KANEY - Interfaz móvil" 
                          className="w-64 h-auto rounded-2xl mr-8"
                        />
                        {/* Imagen secundaria (provider) */}
                        <img 
                          src="/src/assets/kaney_provider_phone.png" 
                          alt="App KANEY Provider - Interfaz móvil" 
                          className="w-64 h-auto rounded-2xl opacity-80 -mt-6 ml-8"
                        />
                      </div>
            </div>
          </div>
        </div>
      ),
      background: "bg-gradient-to-br from-[#e9efec] to-[#c4dad2]"
    },
    {
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
      title: "Competencia",
      content: (
        <div className="h-full flex flex-col">
          <div className="max-w-6xl mx-auto px-8 py-8">
            <h2 className="text-5xl font-bold text-left mb-8" style={{ color: '#16423c' }}>
              Nuestra Competencia es un Sistema Roto
            </h2>
            <p className="text-xl text-left mb-12" style={{ color: '#6a9c89' }}>
              No competimos con otras apps. Competimos contra la anarquía. Nuestro foso es la confianza.
            </p>
            
            <div className="space-y-8">
              {/* Diferenciación #1 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-l-4" style={{ borderLeftColor: '#ff751f' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff751f' }}>
                    <span className="text-white text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#16423c' }}>Confianza</h3>
                    <p className="text-base leading-relaxed" style={{ color: '#6a9c89' }}>
                      Mientras el sistema actual se basa en el miedo y la extorsión, nosotros construimos una plataforma basada en la transparencia y la seguridad contractual.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diferenciación #2 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-l-4" style={{ borderLeftColor: '#6a9c89' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6a9c89' }}>
                    <span className="text-white text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#16423c' }}>Logística Integrada</h3>
                    <p className="text-base leading-relaxed" style={{ color: '#6a9c89' }}>
                      Nadie más puede ofrecer una solución de punta a punta porque no tienen las alianzas ni la tecnología para gestionar la complejidad del terreno.
                    </p>
                  </div>
                </div>
              </div>

              {/* Diferenciación #3 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-l-4" style={{ borderLeftColor: '#c4dad2' }}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#c4dad2' }}>
                    <span className="text-lg font-bold" style={{ color: '#16423c' }}>3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#16423c' }}>Ecosistema Sostenible</h3>
                    <p className="text-base leading-relaxed" style={{ color: '#6a9c89' }}>
                      Nuestro programa "KANEY Sustentable" es una prueba de nuestra visión a largo plazo, transformando una debilidad sistémica en una fortaleza.
                    </p>
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
          <p className="text-sm" style={{ color: '#16423c' }}>www.kaneyconecta.com</p>
          <p className="text-sm" style={{ color: '#16423c' }}>kaney@conecta.com</p>
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
          backgroundColor: currentSlide === 1 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(22, 66, 60, 0.1)' 
        }}
      >
            <div className="flex items-center justify-center">
              <img 
                src="/src/assets/logo-dark.png" 
                alt="Kaney Logo" 
                className="h-6 w-auto"
              />
            </div>
      </div>
    </div>
  );
};

export default PitchDeck;