# Kaney - Marketplace Agrícola Sostenible

## Descripción del Proyecto

Kaney es una plataforma digital que conecta directamente a productores agrícolas venezolanos con consumidores, eliminando intermediarios y creando un sistema alimentario más justo, eficiente y sostenible. Nuestra misión es digitalizar la cadena de suministro agrícola de Venezuela para erradicar la pobreza rural.

## Características Principales

### 🛒 **Marketplace Completo**
- Catálogo de productos agrícolas frescos y orgánicos
- Sistema de búsqueda y filtrado avanzado
- Carrito de compras con persistencia
- Proceso de checkout completo

### 💱 **Integración con BCV**
- Tasa de cambio oficial del Banco Central de Venezuela en tiempo real
- Conversión automática entre USD y VES
- Múltiples fuentes de respaldo para garantizar disponibilidad
- Actualización automática cada 6 horas

### 👥 **Perfiles de Usuario**
- **Productores**: Gestión de productos, inventario y pedidos
- **Consumidores**: Historial de compras, direcciones y preferencias
- Sistema de autenticación seguro

### 📱 **Diseño Responsivo**
- Interfaz optimizada para móviles y desktop
- Componentes UI modernos con shadcn/ui
- Experiencia de usuario fluida

## Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Maps**: React Leaflet
- **Forms**: React Hook Form + Zod

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/           # Autenticación
│   ├── checkout/       # Proceso de compra
│   ├── marketplace/    # Funcionalidades del marketplace
│   ├── profile/        # Perfiles de usuario
│   └── ui/            # Componentes base de UI
├── data/              # Datos mock y configuración
├── hooks/             # Hooks personalizados
├── lib/               # Utilidades y configuración
├── pages/             # Páginas principales
├── services/          # Servicios de API
└── store/             # Estado global (Redux)
```

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <URL_DEL_REPOSITORIO>
cd kaney-marketplace
```

2. **Instalar dependencias**
```bash
# Con npm
npm install

# Con yarn
yarn install

# Con pnpm
pnpm install

# Con bun
bun install
```

3. **Ejecutar en modo desarrollo**
```bash
# Con npm
npm run dev

# Con yarn
yarn dev

# Con pnpm
pnpm dev

# Con bun
bun dev
```

4. **Abrir en el navegador**
```
http://localhost:8080
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run build:dev` - Construcción en modo desarrollo
- `npm run preview` - Vista previa de la construcción
- `npm run lint` - Ejecutar ESLint
- `npm run type-check` - Verificación de tipos TypeScript

## Funcionalidades Implementadas

### 🏪 **Marketplace**
- Navegación por categorías de productos
- Sistema de búsqueda con filtros avanzados
- Paginación y ordenamiento
- Carrito de compras persistente
- Gestión de cantidades y productos

### 💰 **Sistema de Monedas**
- Conversión automática USD ↔ VES
- Integración con APIs del BCV
- Cache inteligente para optimizar rendimiento
- Indicadores visuales de estado de conexión

### 🛍️ **Proceso de Compra**
- Formulario de entrega
- Datos fiscales
- Resumen de pedido
- Integración con pasarelas de pago

### 👤 **Gestión de Perfiles**
- Perfil de productor con gestión de productos
- Perfil de consumidor con historial de compras
- Gestión de direcciones
- Configuraciones de usuario

## Integración BCV

El proyecto incluye una integración robusta con el Banco Central de Venezuela:

- **APIs Principales**: BCV oficial, MinetSystem BCV
- **APIs de Respaldo**: DolarAPI, Fixer.io, CurrencyAPI
- **Actualización**: Automática cada 6 horas
- **Cache**: Inteligente para evitar llamadas excesivas
- **Fallbacks**: Múltiples fuentes garantizan disponibilidad

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

- **Proyecto**: Kaney
- **Desarrollado por**: BRIDGES
- **Email**: info@kaney.ve
- **Website**: https://kaney.ve

---

**Nota**: Este proyecto está en desarrollo activo. Las funcionalidades pueden cambiar y mejorar con el tiempo.