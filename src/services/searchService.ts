import { Product } from '@/store/slices/marketplaceSlice';

// Diccionario de sinónimos y términos de búsqueda
export const searchSynonyms: Record<string, string[]> = {
  // Frutas
  'manzana': ['apple', 'manzanas', 'fruta', 'roja', 'verde', 'golden'],
  'apple': ['manzana', 'manzanas', 'fruta', 'roja', 'verde', 'golden'],
  'banana': ['plátano', 'bananas', 'plátanos', 'cambur', 'fruta'],
  'plátano': ['banana', 'bananas', 'plátanos', 'cambur', 'fruta'],
  'cambur': ['banana', 'plátano', 'bananas', 'plátanos', 'fruta'],
  'naranja': ['orange', 'naranjas', 'citrico', 'fruta', 'vitamina c', 'naranjado'],
  'orange': ['naranja', 'naranjas', 'citrico', 'fruta', 'vitamina c', 'naranjado'],
  'limón': ['lemon', 'limones', 'citrico', 'acido', 'fruta'],
  'lemon': ['limón', 'limones', 'citrico', 'acido', 'fruta'],
  'fresa': ['strawberry', 'fresas', 'frutilla', 'fruta', 'roja'],
  'strawberry': ['fresa', 'fresas', 'frutilla', 'fruta', 'roja'],
  'uva': ['grape', 'uvas', 'fruta', 'vino', 'dulce'],
  'grape': ['uva', 'uvas', 'fruta', 'vino', 'dulce'],
  'piña': ['pineapple', 'piñas', 'ananá', 'fruta', 'tropical'],
  'pineapple': ['piña', 'piñas', 'ananá', 'fruta', 'tropical'],
  'mango': ['mangos', 'fruta', 'tropical', 'dulce', 'amarillo'],
  'papaya': ['papayas', 'lechosa', 'fruta', 'tropical', 'naranja'],
  'lechosa': ['papaya', 'papayas', 'fruta', 'tropical', 'naranja'],
  'aguacate': ['avocado', 'aguacates', 'palta', 'fruta', 'verde'],
  'avocado': ['aguacate', 'aguacates', 'palta', 'fruta', 'verde'],
  'palta': ['aguacate', 'avocado', 'aguacates', 'fruta', 'verde'],

  // Verduras
  'tomate': ['tomato', 'tomates', 'cherry', 'jitomate', 'verdura', 'rojo'],
  'tomato': ['tomate', 'tomates', 'cherry', 'jitomate', 'verdura', 'rojo'],
  'jitomate': ['tomate', 'tomato', 'tomates', 'cherry', 'verdura', 'rojo'],
  'lechuga': ['lettuce', 'lechugas', 'verdura', 'hoja', 'verde', 'ensalada'],
  'lettuce': ['lechuga', 'lechugas', 'verdura', 'hoja', 'verde', 'ensalada'],
  'zanahoria': ['carrot', 'zanahorias', 'verdura', 'naranja', 'raiz'],
  'carrot': ['zanahoria', 'zanahorias', 'verdura', 'naranja', 'raiz'],
  'pimiento': ['pepper', 'pimientos', 'pimentón', 'verdura', 'rojo', 'verde', 'amarillo'],
  'pepper': ['pimiento', 'pimientos', 'pimentón', 'verdura', 'rojo', 'verde', 'amarillo'],
  'pimentón': ['pimiento', 'pepper', 'pimientos', 'verdura', 'rojo', 'verde', 'amarillo'],
  'brócoli': ['broccoli', 'brocoli', 'verdura', 'verde', 'flor'],
  'broccoli': ['brócoli', 'brocoli', 'verdura', 'verde', 'flor'],
  'brocoli': ['brócoli', 'broccoli', 'verdura', 'verde', 'flor'],
  'pepino': ['cucumber', 'pepinos', 'verdura', 'verde', 'fresco'],
  'cucumber': ['pepino', 'pepinos', 'verdura', 'verde', 'fresco'],
  'cebolla': ['onion', 'cebollas', 'verdura', 'blanca', 'morada', 'amarilla'],
  'onion': ['cebolla', 'cebollas', 'verdura', 'blanca', 'morada', 'amarilla'],
  'ajo': ['garlic', 'ajos', 'verdura', 'blanco', 'condimento'],
  'garlic': ['ajo', 'ajos', 'verdura', 'blanco', 'condimento'],
  'papas': ['potato', 'patatas', 'papa', 'verdura', 'tuberculo', 'blanca'],
  'potato': ['papas', 'patatas', 'papa', 'verdura', 'tuberculo', 'blanca'],
  'papa': ['papas', 'potato', 'patatas', 'verdura', 'tuberculo', 'blanca'],
  'patatas': ['papas', 'potato', 'papa', 'verdura', 'tuberculo', 'blanca'],
  'espinaca': ['spinach', 'espinacas', 'verdura', 'hoja', 'verde'],
  'spinach': ['espinaca', 'espinacas', 'verdura', 'hoja', 'verde'],
  'coliflor': ['cauliflower', 'coliflores', 'verdura', 'blanca', 'flor'],
  'cauliflower': ['coliflor', 'coliflores', 'verdura', 'blanca', 'flor'],
  'repollo': ['cabbage', 'repollos', 'col', 'verdura', 'hoja'],
  'cabbage': ['repollo', 'repollos', 'col', 'verdura', 'hoja'],
  'col': ['repollo', 'cabbage', 'repollos', 'verdura', 'hoja'],

  // Granos
  'arroz': ['rice', 'arroz blanco', 'arroz integral', 'grano', 'cereal'],
  'rice': ['arroz', 'arroz blanco', 'arroz integral', 'grano', 'cereal'],
  'maíz': ['corn', 'maiz', 'elote', 'choclo', 'grano', 'cereal'],
  'corn': ['maíz', 'maiz', 'elote', 'choclo', 'grano', 'cereal'],
  'maiz': ['maíz', 'corn', 'elote', 'choclo', 'grano', 'cereal'],
  'elote': ['maíz', 'corn', 'maiz', 'choclo', 'grano', 'cereal'],
  'choclo': ['maíz', 'corn', 'maiz', 'elote', 'grano', 'cereal'],
  'trigo': ['wheat', 'grano', 'cereal', 'harina'],
  'wheat': ['trigo', 'grano', 'cereal', 'harina'],
  'avena': ['oat', 'oats', 'grano', 'cereal', 'saludable'],
  'oat': ['avena', 'oats', 'grano', 'cereal', 'saludable'],
  'oats': ['avena', 'oat', 'grano', 'cereal', 'saludable'],
  'quinoa': ['quinua', 'grano', 'cereal', 'superfood', 'proteina'],
  'quinua': ['quinoa', 'grano', 'cereal', 'superfood', 'proteina'],
  'lentejas': ['lentils', 'lenteja', 'legumbre', 'proteina', 'vegetal'],
  'lentils': ['lentejas', 'lenteja', 'legumbre', 'proteina', 'vegetal'],
  'lenteja': ['lentejas', 'lentils', 'legumbre', 'proteina', 'vegetal'],
  'frijoles': ['beans', 'frijol', 'alubias', 'legumbre', 'proteina'],
  'beans': ['frijoles', 'frijol', 'alubias', 'legumbre', 'proteina'],
  'frijol': ['frijoles', 'beans', 'alubias', 'legumbre', 'proteina'],
  'alubias': ['frijoles', 'beans', 'frijol', 'legumbre', 'proteina'],
  'garbanzos': ['chickpeas', 'garbanzo', 'legumbre', 'proteina', 'hummus'],
  'chickpeas': ['garbanzos', 'garbanzo', 'legumbre', 'proteina', 'hummus'],
  'garbanzo': ['garbanzos', 'chickpeas', 'legumbre', 'proteina', 'hummus'],

  // Categorías generales
  'frutas': ['fruits', 'fruta', 'fruit', 'dulce', 'vitaminas'],
  'fruits': ['frutas', 'fruta', 'fruit', 'dulce', 'vitaminas'],
  'fruta': ['frutas', 'fruits', 'fruit', 'dulce', 'vitaminas'],
  'fruit': ['frutas', 'fruits', 'fruta', 'dulce', 'vitaminas'],
  'verduras': ['vegetables', 'verdura', 'vegetable', 'hojas', 'raices'],
  'vegetables': ['verduras', 'verdura', 'vegetable', 'hojas', 'raices'],
  'verdura': ['verduras', 'vegetables', 'vegetable', 'hojas', 'raices'],
  'vegetable': ['verduras', 'vegetables', 'verdura', 'hojas', 'raices'],
  'granos': ['grains', 'grano', 'grain', 'cereales', 'cereal'],
  'grains': ['granos', 'grano', 'grain', 'cereales', 'cereal'],
  'grano': ['granos', 'grains', 'grain', 'cereales', 'cereal'],
  'grain': ['granos', 'grains', 'grano', 'cereales', 'cereal'],
  'cereales': ['granos', 'grains', 'grano', 'grain', 'cereal'],
  'cereal': ['granos', 'grains', 'grano', 'grain', 'cereales'],

  // Términos de calidad y características
  'orgánico': ['organic', 'organico', 'natural', 'ecologico', 'sin pesticidas'],
  'organic': ['orgánico', 'organico', 'natural', 'ecologico', 'sin pesticidas'],
  'organico': ['orgánico', 'organic', 'natural', 'ecologico', 'sin pesticidas'],
  'natural': ['orgánico', 'organic', 'organico', 'ecologico', 'sin pesticidas'],
  'ecológico': ['orgánico', 'organic', 'organico', 'natural', 'sin pesticidas'],
  'ecologico': ['orgánico', 'organic', 'organico', 'natural', 'sin pesticidas'],
  'fresco': ['fresh', 'frescos', 'recien cosechado', 'reciente'],
  'fresh': ['fresco', 'frescos', 'recien cosechado', 'reciente'],
  'frescos': ['fresco', 'fresh', 'recien cosechado', 'reciente'],
  'maduro': ['ripe', 'maduros', 'dulce', 'listo'],
  'ripe': ['maduro', 'maduros', 'dulce', 'listo'],
  'maduros': ['maduro', 'ripe', 'dulce', 'listo'],
  'verde': ['green', 'verdes', 'inmaduro', 'joven'],
  'green': ['verde', 'verdes', 'inmaduro', 'joven'],
  'verdes': ['verde', 'green', 'inmaduro', 'joven'],
  'rojo': ['red', 'rojos', 'roja', 'rojas'],
  'red': ['rojo', 'rojos', 'roja', 'rojas'],
  'rojos': ['rojo', 'red', 'roja', 'rojas'],
  'roja': ['rojo', 'red', 'rojos', 'rojas'],
  'rojas': ['rojo', 'red', 'rojos', 'roja'],
  'amarillo': ['yellow', 'amarillos', 'amarilla', 'amarillas'],
  'yellow': ['amarillo', 'amarillos', 'amarilla', 'amarillas'],
  'amarillos': ['amarillo', 'yellow', 'amarilla', 'amarillas'],
  'amarilla': ['amarillo', 'yellow', 'amarillos', 'amarillas'],
  'amarillas': ['amarillo', 'yellow', 'amarillos', 'amarilla'],
  'naranjas': ['naranja', 'orange', 'naranjado'],
  'naranjado': ['naranja', 'orange', 'naranjas'],

  // Términos de tamaño
  'pequeño': ['small', 'pequeños', 'mini', 'chico'],
  'small': ['pequeño', 'pequeños', 'mini', 'chico'],
  'pequeños': ['pequeño', 'small', 'mini', 'chico'],
  'mini': ['pequeño', 'small', 'pequeños', 'chico'],
  'chico': ['pequeño', 'small', 'pequeños', 'mini'],
  'mediano': ['medium', 'medianos', 'regular'],
  'medium': ['mediano', 'medianos', 'regular'],
  'medianos': ['mediano', 'medium', 'regular'],
  'regular': ['mediano', 'medium', 'medianos'],
  'grande': ['large', 'grandes', 'big', 'gigante'],
  'large': ['grande', 'grandes', 'big', 'gigante'],
  'grandes': ['grande', 'large', 'big', 'gigante'],
  'big': ['grande', 'large', 'grandes', 'gigante'],
  'gigante': ['grande', 'large', 'grandes', 'big'],

  // Términos de variedad
  'cherry': ['cereza', 'pequeño', 'mini', 'dulce'],
  'cereza': ['cherry', 'pequeño', 'mini', 'dulce'],
  'golden': ['dorado', 'amarillo', 'dulce'],
  'dorado': ['golden', 'amarillo', 'dulce'],
  'honeycrisp': ['miel crujiente', 'dulce', 'crujiente'],
  'miel crujiente': ['honeycrisp', 'dulce', 'crujiente'],
  'gala': ['roja', 'dulce', 'crisp'],
  'fuji': ['dulce', 'crisp', 'japonesa'],
  'japonesa': ['fuji', 'dulce', 'crisp'],

  // Términos de ubicación (Venezuela)
  'aragua': ['maracay', 'valencia', 'venezuela'],
  'maracay': ['aragua', 'valencia', 'venezuela'],
  'valencia': ['aragua', 'maracay', 'venezuela'],
  'carabobo': ['valencia', 'aragua', 'venezuela'],
  'miranda': ['caracas', 'los teques', 'venezuela'],
  'caracas': ['miranda', 'los teques', 'venezuela'],
  'los teques': ['miranda', 'caracas', 'venezuela'],
  'zulia': ['maracaibo', 'venezuela'],
  'maracaibo': ['zulia', 'venezuela'],
  'venezuela': ['venezolano', 'venezolana', 'nacional', 'local'],
  'venezolano': ['venezuela', 'venezolana', 'nacional', 'local'],
  'venezolana': ['venezuela', 'venezolano', 'nacional', 'local'],
  'nacional': ['venezuela', 'venezolano', 'venezolana', 'local'],
  'local': ['venezuela', 'venezolano', 'venezolana', 'nacional']
};

// Función para expandir términos de búsqueda con sinónimos
export function expandSearchTerms(query: string): string[] {
  const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
  const expandedTerms = new Set<string>();
  
  // Agregar términos originales
  terms.forEach(term => expandedTerms.add(term));
  
  // Agregar sinónimos
  terms.forEach(term => {
    if (searchSynonyms[term]) {
      searchSynonyms[term].forEach(synonym => expandedTerms.add(synonym));
    }
  });
  
  return Array.from(expandedTerms);
}

// Función de búsqueda inteligente
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query || !query.trim()) return [];
  
  const queryLower = query.toLowerCase().trim();
  
  return products.filter(product => {
    // Búsqueda directa en nombre
    if (product.name.toLowerCase().includes(queryLower)) {
      return true;
    }
    
    // Búsqueda directa en descripción
    if (product.description.toLowerCase().includes(queryLower)) {
      return true;
    }
    
    // Búsqueda directa en categoría
    if (product.category.toLowerCase().includes(queryLower)) {
      return true;
    }
    
    // Búsqueda con sinónimos expandidos
    const expandedTerms = expandSearchTerms(query);
    for (const term of expandedTerms) {
      if (product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)) {
        return true;
      }
    }
    
    return false;
  });
}

// Función para obtener sugerencias de búsqueda
export function getSearchSuggestions(query: string, products: Product[]): string[] {
  if (query.length < 2) return [];
  
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();
  
  // Sugerencias basadas en nombres de productos
  products.forEach(product => {
    if (product.name.toLowerCase().includes(queryLower)) {
      suggestions.add(product.name);
    }
  });
  
  // Sugerencias basadas en categorías
  const categories = ['Frutas', 'Verduras', 'Granos', 'Orgánico', 'Fresco'];
  categories.forEach(category => {
    if (category.toLowerCase().includes(queryLower)) {
      suggestions.add(category);
    }
  });
  
  // Sugerencias basadas en sinónimos
  Object.keys(searchSynonyms).forEach(term => {
    if (term.toLowerCase().includes(queryLower)) {
      suggestions.add(term);
    }
  });
  
  return Array.from(suggestions).slice(0, 8);
}




