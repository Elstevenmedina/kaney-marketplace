import { Product } from '@/store/slices/marketplaceSlice';
import tomatoesImg from '@/assets/product-tomatoes.jpg';
import lettuceImg from '@/assets/product-lettuce.jpg';
import carrotsImg from '@/assets/product-carrots.jpg';
import peppersImg from '@/assets/product-peppers.jpg';
import broccoliImg from '@/assets/product-broccoli.jpg';
import cucumbersImg from '@/assets/product-cucumbers.jpg';
import applesImg from '@/assets/product-apples.jpg';
import grainsImg from '@/assets/product-grains.jpg';

export const mockProducts: Product[] = [
  // HORTALIZAS
  {
    id: '1',
    name: 'Tomates Cherry Orgánicos',
    description: 'Frescos y jugosos, cultivados sin pesticidas, perfectos para ensaladas y snacks.',
    price: 4.50,
    image: tomatoesImg,
    images: [tomatoesImg, tomatoesImg, tomatoesImg],
    category: 'hortalizas',
    featured: true,
    onSale: true,
    salePrice: 3.99,
    unit: 'kg',
    minQuantity: 5,
    variety: 'Cherry',
    size: 'pequeño',
    harvestDays: 2,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 20,
      weightPerPackage: 1
    },
    stock: 150,
    lowStockThreshold: 20,
    producer: {
      id: 'prod-1',
      name: 'Granja El Sol',
      rating: 4.8,
      location: 'Maracay, Aragua',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.8
  },
  {
    id: '2',
    name: 'Pimientos Rojos',
    description: 'Carnosos y dulces, perfectos para asar, rellenar o usar en ensaladas.',
    price: 5.80,
    image: peppersImg,
    images: [peppersImg, peppersImg, peppersImg],
    category: 'hortalizas',
    featured: false,
    onSale: true,
    salePrice: 4.50,
    unit: 'kg',
    minQuantity: 3,
    variety: 'California',
    size: 'grande',
    harvestDays: 2,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 12,
      weightPerPackage: 3
    },
    stock: 60,
    lowStockThreshold: 10,
    producer: {
      id: 'prod-2',
      name: 'Finca Los Páramos',
      rating: 4.9,
      location: 'Mérida, Mérida',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.9
  },
  {
    id: '3',
    name: 'Brócoli Orgánico',
    description: 'Crujiente y nutritivo, rico en vitaminas C y K, ideal para salteados y sopas.',
    price: 4.20,
    image: broccoliImg,
    images: [broccoliImg, broccoliImg, broccoliImg],
    category: 'hortalizas',
    featured: true,
    unit: 'kg',
    minQuantity: 6,
    variety: 'Calabrese',
    size: 'mediano',
    harvestDays: 1,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 1
    },
    stock: 90,
    lowStockThreshold: 20,
    producer: {
      id: 'prod-3',
      name: 'Agricultura Sostenible',
      rating: 4.5,
      location: 'San Cristóbal, Táchira',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.5
  },
  {
    id: '4',
    name: 'Pepinos Frescos',
    description: 'Refrescantes y hidratantes, perfectos para ensaladas y jugos detox.',
    price: 2.50,
    image: cucumbersImg,
    images: [cucumbersImg, cucumbersImg, cucumbersImg],
    category: 'hortalizas',
    featured: false,
    unit: 'kg',
    minQuantity: 8,
    variety: 'Armenio',
    size: 'mediano',
    harvestDays: 1,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 20,
      weightPerPackage: 5
    },
    stock: 110,
    lowStockThreshold: 25,
    producer: {
      id: 'prod-4',
      name: 'Huerto Familiar',
      rating: 4.3,
      location: 'Coro, Falcón',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.3
  },
  {
    id: '5',
    name: 'Cebolla Blanca',
    description: 'Aromática y dulce, base fundamental de la cocina venezolana.',
    price: 3.20,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'hortalizas',
    featured: false,
    unit: 'kg',
    minQuantity: 10,
    variety: 'Criolla',
    size: 'mediano',
    harvestDays: 5,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de malla',
      unitsPerPackage: 1,
      weightPerPackage: 15
    },
    stock: 180,
    lowStockThreshold: 30,
    producer: {
      id: 'prod-5',
      name: 'Cultivos del Valle',
      rating: 4.4,
      location: 'Barquisimeto, Lara',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.4
  },
  {
    id: '6',
    name: 'Ajo Criollo',
    description: 'Aromático y picante, esencial para el sofrito venezolano.',
    price: 8.50,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'hortalizas',
    featured: false,
    unit: 'kg',
    minQuantity: 2,
    variety: 'Criollo',
    size: 'pequeño',
    harvestDays: 10,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas de malla',
      unitsPerPackage: 1,
      weightPerPackage: 1
    },
    stock: 50,
    lowStockThreshold: 10,
    producer: {
      id: 'prod-6',
      name: 'Ajos del Trópico',
      rating: 4.7,
      location: 'Valencia, Carabobo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.7
  },
  {
    id: '7',
    name: 'Pimentón Verde',
    description: 'Fresco y crujiente, perfecto para guisos y sofritos criollos.',
    price: 4.80,
    image: peppersImg,
    images: [peppersImg, peppersImg, peppersImg],
    category: 'hortalizas',
    featured: false,
    unit: 'kg',
    minQuantity: 5,
    variety: 'Criollo',
    size: 'mediano',
    harvestDays: 3,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 15,
      weightPerPackage: 2.5
    },
    stock: 75,
    lowStockThreshold: 15,
    producer: {
      id: 'prod-7',
      name: 'Hortalizas del Llano',
      rating: 4.6,
      location: 'Calabozo, Guárico',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.6
  },
  {
    id: '8',
    name: 'Coliflor Orgánica',
    description: 'Crujiente y nutritiva, ideal para salteados y cremas.',
    price: 5.20,
    image: broccoliImg,
    images: [broccoliImg, broccoliImg, broccoliImg],
    category: 'hortalizas',
    featured: false,
    unit: 'unidad',
    minQuantity: 4,
    variety: 'Blanca',
    size: 'mediano',
    harvestDays: 2,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 1.2
    },
    stock: 40,
    lowStockThreshold: 8,
    producer: {
      id: 'prod-8',
      name: 'Vegetales Andinos',
      rating: 4.5,
      location: 'Trujillo, Trujillo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.5
  },

  // FRUTAS
  {
    id: '9',
    name: 'Manzanas Verdes',
    description: 'Crujientes y ácidas, perfectas para comer frescas o en postres.',
    price: 6.50,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: true,
    unit: 'kg',
    minQuantity: 4,
    variety: 'Granny Smith',
    size: 'mediano',
    harvestDays: 5,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 1,
      weightPerPackage: 5
    },
    stock: 70,
    lowStockThreshold: 15,
    producer: {
      id: 'prod-9',
      name: 'Frutales del Sur',
      rating: 4.4,
      location: 'San Juan de los Morros, Guárico',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.4
  },
  {
    id: '10',
    name: 'Plátanos Maduros',
    description: 'Dulces y cremosos, perfectos para comer frescos o en postres.',
    price: 3.80,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: false,
    unit: 'kg',
    minQuantity: 8,
    variety: 'Criollo',
    size: 'mediano',
    harvestDays: 2,
    maturityState: 'maduro',
    packaging: {
      type: 'Racimos',
      unitsPerPackage: 1,
      weightPerPackage: 8
    },
    stock: 120,
    lowStockThreshold: 25,
    producer: {
      id: 'prod-10',
      name: 'Platanales del Caribe',
      rating: 4.6,
      location: 'Cumana, Sucre',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.6
  },
  {
    id: '11',
    name: 'Naranjas Valencia',
    description: 'Jugosas y dulces, ricas en vitamina C, perfectas para jugos.',
    price: 4.20,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: true,
    unit: 'kg',
    minQuantity: 6,
    variety: 'Valencia',
    size: 'mediano',
    harvestDays: 3,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 1,
      weightPerPackage: 10
    },
    stock: 100,
    lowStockThreshold: 20,
    producer: {
      id: 'prod-11',
      name: 'Cítricos del Zulia',
      rating: 4.7,
      location: 'Maracaibo, Zulia',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.7
  },
  {
    id: '12',
    name: 'Mangos Criollos',
    description: 'Dulces y aromáticos, la fruta tropical por excelencia de Venezuela.',
    price: 5.50,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: false,
    onSale: true,
    salePrice: 4.20,
    unit: 'kg',
    minQuantity: 5,
    variety: 'Criollo',
    size: 'grande',
    harvestDays: 1,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 1,
      weightPerPackage: 6
    },
    stock: 80,
    lowStockThreshold: 15,
    producer: {
      id: 'prod-12',
      name: 'Mangales del Oriente',
      rating: 4.8,
      location: 'Barcelona, Anzoátegui',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.8
  },
  {
    id: '13',
    name: 'Papayas Lechosas',
    description: 'Dulces y cremosas, ricas en enzimas digestivas.',
    price: 4.80,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: false,
    unit: 'unidad',
    minQuantity: 4,
    variety: 'Lechosa',
    size: 'grande',
    harvestDays: 2,
    maturityState: 'maduro',
    packaging: {
      type: 'Individual',
      unitsPerPackage: 1,
      weightPerPackage: 1.5
    },
    stock: 60,
    lowStockThreshold: 12,
    producer: {
      id: 'prod-13',
      name: 'Frutales Tropicales',
      rating: 4.5,
      location: 'Puerto La Cruz, Anzoátegui',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.5
  },
  {
    id: '14',
    name: 'Aguacates Criollos',
    description: 'Cremosos y nutritivos, perfectos para arepas y ensaladas.',
    price: 7.20,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: true,
    unit: 'kg',
    minQuantity: 3,
    variety: 'Criollo',
    size: 'mediano',
    harvestDays: 4,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 1,
      weightPerPackage: 4
    },
    stock: 45,
    lowStockThreshold: 10,
    producer: {
      id: 'prod-14',
      name: 'Aguacateros del Centro',
      rating: 4.9,
      location: 'Maracay, Aragua',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.9
  },
  {
    id: '15',
    name: 'Fresas Orgánicas',
    description: 'Dulces y aromáticas, perfectas para postres y desayunos.',
    price: 8.50,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: false,
    unit: 'bandeja',
    minQuantity: 6,
    variety: 'Criolla',
    size: 'pequeño',
    harvestDays: 1,
    maturityState: 'maduro',
    packaging: {
      type: 'Bandejas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.5
    },
    stock: 30,
    lowStockThreshold: 6,
    producer: {
      id: 'prod-15',
      name: 'Fresas de los Andes',
      rating: 4.6,
      location: 'Mérida, Mérida',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.6
  },
  {
    id: '16',
    name: 'Uvas Criollas',
    description: 'Dulces y jugosas, perfectas para comer frescas o hacer vino.',
    price: 6.80,
    image: applesImg,
    images: [applesImg, applesImg, applesImg],
    category: 'frutas',
    featured: false,
    unit: 'kg',
    minQuantity: 4,
    variety: 'Criolla',
    size: 'mediano',
    harvestDays: 2,
    maturityState: 'maduro',
    packaging: {
      type: 'Cajas de cartón',
      unitsPerPackage: 1,
      weightPerPackage: 3
    },
    stock: 55,
    lowStockThreshold: 12,
    producer: {
      id: 'prod-16',
      name: 'Viñedos del Zulia',
      rating: 4.4,
      location: 'Maracaibo, Zulia',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.4
  },

  // GRANOS Y SEMILLAS
  {
    id: '17',
    name: 'Arroz Blanco Premium',
    description: 'Grano largo y aromático, perfecto para paellas y platos tradicionales.',
    price: 3.80,
    image: grainsImg,
    images: [grainsImg, grainsImg, grainsImg],
    category: 'granos-semillas',
    featured: false,
    unit: 'kg',
    minQuantity: 10,
    variety: 'Criollo',
    size: 'mediano',
    harvestDays: 30,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de tela',
      unitsPerPackage: 1,
      weightPerPackage: 25
    },
    stock: 200,
    lowStockThreshold: 50,
    producer: {
      id: 'prod-17',
      name: 'Arroceros del Llano',
      rating: 4.6,
      location: 'Calabozo, Guárico',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.6
  },
  {
    id: '18',
    name: 'Maíz Blanco',
    description: 'Grano tierno y dulce, base de la arepa venezolana.',
    price: 2.50,
    image: grainsImg,
    images: [grainsImg, grainsImg, grainsImg],
    category: 'granos-semillas',
    featured: true,
    unit: 'kg',
    minQuantity: 15,
    variety: 'Criollo',
    size: 'mediano',
    harvestDays: 20,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de malla',
      unitsPerPackage: 1,
      weightPerPackage: 30
    },
    stock: 300,
    lowStockThreshold: 60,
    producer: {
      id: 'prod-18',
      name: 'Maiceros del Llano',
      rating: 4.7,
      location: 'San Fernando, Apure',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.7
  },
  {
    id: '19',
    name: 'Caraotas Negras',
    description: 'Legumbre tradicional venezolana, perfecta para el pabellón criollo.',
    price: 4.20,
    image: grainsImg,
    images: [grainsImg, grainsImg, grainsImg],
    category: 'granos-semillas',
    featured: false,
    unit: 'kg',
    minQuantity: 8,
    variety: 'Criolla',
    size: 'mediano',
    harvestDays: 45,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de tela',
      unitsPerPackage: 1,
      weightPerPackage: 20
    },
    stock: 150,
    lowStockThreshold: 30,
    producer: {
      id: 'prod-19',
      name: 'Leguminosas del Centro',
      rating: 4.5,
      location: 'Valencia, Carabobo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.5
  },
  {
    id: '20',
    name: 'Lentejas Rojas',
    description: 'Nutritivas y versátiles, perfectas para sopas y guisos.',
    price: 5.50,
    image: grainsImg,
    images: [grainsImg, grainsImg, grainsImg],
    category: 'granos-semillas',
    featured: false,
    unit: 'kg',
    minQuantity: 6,
    variety: 'Criolla',
    size: 'mediano',
    harvestDays: 40,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de tela',
      unitsPerPackage: 1,
      weightPerPackage: 15
    },
    stock: 120,
    lowStockThreshold: 25,
    producer: {
      id: 'prod-20',
      name: 'Legumbres Andinas',
      rating: 4.4,
      location: 'Trujillo, Trujillo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.4
  },
  {
    id: '21',
    name: 'Quinoa Orgánica',
    description: 'Supergrano andino, rico en proteínas y aminoácidos.',
    price: 12.80,
    image: grainsImg,
    images: [grainsImg, grainsImg, grainsImg],
    category: 'granos-semillas',
    featured: true,
    unit: 'kg',
    minQuantity: 2,
    variety: 'Blanca',
    size: 'mediano',
    harvestDays: 60,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas de papel',
      unitsPerPackage: 1,
      weightPerPackage: 1
    },
    stock: 40,
    lowStockThreshold: 8,
    producer: {
      id: 'prod-21',
      name: 'Quinoa de los Andes',
      rating: 4.8,
      location: 'Mérida, Mérida',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.8
  },
  {
    id: '22',
    name: 'Avena Integral',
    description: 'Cereal nutritivo, perfecto para desayunos saludables.',
    price: 4.50,
    image: grainsImg,
    images: [grainsImg, grainsImg, grainsImg],
    category: 'granos-semillas',
    featured: false,
    unit: 'kg',
    minQuantity: 5,
    variety: 'Integral',
    size: 'mediano',
    harvestDays: 35,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas de papel',
      unitsPerPackage: 1,
      weightPerPackage: 2
    },
    stock: 80,
    lowStockThreshold: 16,
    producer: {
      id: 'prod-22',
      name: 'Cereales del Llano',
      rating: 4.3,
      location: 'San Fernando, Apure',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.3
  },

  // HOJAS O AROMÁTICAS
  {
    id: '23',
    name: 'Lechuga Romana Fresca',
    description: 'Hojas crujientes y tiernas, ideal para ensaladas y wraps saludables.',
    price: 2.80,
    image: lettuceImg,
    images: [lettuceImg, lettuceImg, lettuceImg],
    category: 'hojas-aromaticas',
    featured: false,
    unit: 'unidad',
    minQuantity: 10,
    variety: 'Romana',
    size: 'mediano',
    harvestDays: 1,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.5
    },
    stock: 80,
    lowStockThreshold: 15,
    producer: {
      id: 'prod-23',
      name: 'Huerto Verde',
      rating: 4.6,
      location: 'Valencia, Carabobo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.6
  },
  {
    id: '24',
    name: 'Cilantro Fresco',
    description: 'Aromático y fresco, esencial para la cocina venezolana y caribeña.',
    price: 1.50,
    image: lettuceImg,
    images: [lettuceImg, lettuceImg, lettuceImg],
    category: 'hojas-aromaticas',
    featured: false,
    unit: 'manojo',
    minQuantity: 20,
    variety: 'Criollo',
    size: 'pequeño',
    harvestDays: 0,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.1
    },
    stock: 300,
    lowStockThreshold: 50,
    producer: {
      id: 'prod-24',
      name: 'Hierbas del Trópico',
      rating: 4.2,
      location: 'Cumana, Sucre',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.2
  },
  {
    id: '25',
    name: 'Perejil Fresco',
    description: 'Aromático y nutritivo, perfecto para decorar y sazonar platos.',
    price: 1.80,
    image: lettuceImg,
    images: [lettuceImg, lettuceImg, lettuceImg],
    category: 'hojas-aromaticas',
    featured: false,
    unit: 'manojo',
    minQuantity: 15,
    variety: 'Criollo',
    size: 'pequeño',
    harvestDays: 0,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.1
    },
    stock: 250,
    lowStockThreshold: 40,
    producer: {
      id: 'prod-25',
      name: 'Hierbas Aromáticas',
      rating: 4.4,
      location: 'Maracay, Aragua',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.4
  },
  {
    id: '26',
    name: 'Espinaca Fresca',
    description: 'Hojas tiernas y nutritivas, ricas en hierro y vitaminas.',
    price: 3.50,
    image: lettuceImg,
    images: [lettuceImg, lettuceImg, lettuceImg],
    category: 'hojas-aromaticas',
    featured: false,
    unit: 'manojo',
    minQuantity: 8,
    variety: 'Criolla',
    size: 'mediano',
    harvestDays: 1,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.3
    },
    stock: 90,
    lowStockThreshold: 18,
    producer: {
      id: 'prod-26',
      name: 'Hortalizas de Hoja',
      rating: 4.5,
      location: 'San Cristóbal, Táchira',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.5
  },
  {
    id: '27',
    name: 'Albahaca Fresca',
    description: 'Aromática y dulce, perfecta para pesto y ensaladas.',
    price: 2.20,
    image: lettuceImg,
    images: [lettuceImg, lettuceImg, lettuceImg],
    category: 'hojas-aromaticas',
    featured: false,
    unit: 'manojo',
    minQuantity: 12,
    variety: 'Criolla',
    size: 'pequeño',
    harvestDays: 0,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.1
    },
    stock: 70,
    lowStockThreshold: 14,
    producer: {
      id: 'prod-27',
      name: 'Hierbas Mediterráneas',
      rating: 4.6,
      location: 'Valencia, Carabobo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.6
  },
  {
    id: '28',
    name: 'Cebollín Fresco',
    description: 'Aromático y suave, perfecto para decorar y sazonar.',
    price: 2.00,
    image: lettuceImg,
    images: [lettuceImg, lettuceImg, lettuceImg],
    category: 'hojas-aromaticas',
    featured: false,
    unit: 'manojo',
    minQuantity: 15,
    variety: 'Criollo',
    size: 'pequeño',
    harvestDays: 0,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.1
    },
    stock: 110,
    lowStockThreshold: 22,
    producer: {
      id: 'prod-28',
      name: 'Hierbas del Huerto',
      rating: 4.3,
      location: 'Barquisimeto, Lara',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.3
  },

  // TUBÉRCULOS
  {
    id: '29',
    name: 'Zanahorias Orgánicas',
    description: 'Dulces y crujientes, ricas en betacaroteno, perfectas para cocinar o comer crudas.',
    price: 3.20,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'tuberculos',
    featured: true,
    unit: 'kg',
    minQuantity: 8,
    variety: 'Nantes',
    size: 'mediano',
    harvestDays: 3,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de malla',
      unitsPerPackage: 1,
      weightPerPackage: 10
    },
    stock: 120,
    lowStockThreshold: 25,
    producer: {
      id: 'prod-29',
      name: 'Cultivos del Valle',
      rating: 4.7,
      location: 'Barquisimeto, Lara',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.7
  },
  {
    id: '30',
    name: 'Papa Criolla',
    description: 'Tubérculo tradicional venezolano, perfecto para sancochos y guisos.',
    price: 2.80,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'tuberculos',
    featured: false,
    unit: 'kg',
    minQuantity: 8,
    variety: 'Criolla',
    size: 'mediano',
    harvestDays: 7,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de malla',
      unitsPerPackage: 1,
      weightPerPackage: 20
    },
    stock: 200,
    lowStockThreshold: 30,
    producer: {
      id: 'prod-30',
      name: 'Cultivos Andinos',
      rating: 4.5,
      location: 'Trujillo, Trujillo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.5
  },
  {
    id: '31',
    name: 'Yuca Fresca',
    description: 'Tubérculo tropical, base de la casabe y perfecta para sancochos.',
    price: 2.20,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'tuberculos',
    featured: false,
    unit: 'kg',
    minQuantity: 10,
    variety: 'Criolla',
    size: 'grande',
    harvestDays: 5,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de malla',
      unitsPerPackage: 1,
      weightPerPackage: 25
    },
    stock: 180,
    lowStockThreshold: 35,
    producer: {
      id: 'prod-31',
      name: 'Yucales del Oriente',
      rating: 4.4,
      location: 'Barcelona, Anzoátegui',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.4
  },
  {
    id: '32',
    name: 'Ñame Criollo',
    description: 'Tubérculo nutritivo, perfecto para sopas y guisos tradicionales.',
    price: 3.50,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'tuberculos',
    featured: false,
    unit: 'kg',
    minQuantity: 6,
    variety: 'Criollo',
    size: 'grande',
    harvestDays: 8,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de malla',
      unitsPerPackage: 1,
      weightPerPackage: 15
    },
    stock: 90,
    lowStockThreshold: 18,
    producer: {
      id: 'prod-32',
      name: 'Tubérculos Tropicales',
      rating: 4.3,
      location: 'Cumana, Sucre',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.3
  },
  {
    id: '33',
    name: 'Apio Criollo',
    description: 'Crujiente y aromático, perfecto para sopas y ensaladas.',
    price: 4.80,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'tuberculos',
    featured: false,
    unit: 'unidad',
    minQuantity: 5,
    variety: 'Criollo',
    size: 'mediano',
    harvestDays: 4,
    maturityState: 'maduro',
    packaging: {
      type: 'Individual',
      unitsPerPackage: 1,
      weightPerPackage: 0.8
    },
    stock: 60,
    lowStockThreshold: 12,
    producer: {
      id: 'prod-33',
      name: 'Hortalizas de Raíz',
      rating: 4.6,
      location: 'Valencia, Carabobo',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.6
  },
  {
    id: '34',
    name: 'Rábano Fresco',
    description: 'Picante y crujiente, perfecto para ensaladas y decoración.',
    price: 2.50,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'tuberculos',
    featured: false,
    unit: 'manojo',
    minQuantity: 12,
    variety: 'Criollo',
    size: 'pequeño',
    harvestDays: 2,
    maturityState: 'maduro',
    packaging: {
      type: 'Bolsas plásticas',
      unitsPerPackage: 1,
      weightPerPackage: 0.5
    },
    stock: 75,
    lowStockThreshold: 15,
    producer: {
      id: 'prod-34',
      name: 'Raíces del Huerto',
      rating: 4.2,
      location: 'Maracay, Aragua',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.2
  },
  {
    id: '35',
    name: 'Remolacha Orgánica',
    description: 'Dulce y nutritiva, perfecta para ensaladas y jugos.',
    price: 3.80,
    image: carrotsImg,
    images: [carrotsImg, carrotsImg, carrotsImg],
    category: 'tuberculos',
    featured: false,
    unit: 'kg',
    minQuantity: 6,
    variety: 'Criolla',
    size: 'mediano',
    harvestDays: 6,
    maturityState: 'maduro',
    packaging: {
      type: 'Sacos de malla',
      unitsPerPackage: 1,
      weightPerPackage: 8
    },
    stock: 50,
    lowStockThreshold: 10,
    producer: {
      id: 'prod-35',
      name: 'Raíces Orgánicas',
      rating: 4.7,
      location: 'San Cristóbal, Táchira',
      verified: true
    },
    quality: {
      fresh: true,
      clean: true,
      correctSize: true,
      pestFree: true
    },
    rating: 4.7
  }
];