import { Middleware, AnyAction } from '@reduxjs/toolkit';

/**
 * Cart middleware that automatically saves cart state to localStorage
 * whenever cart-related actions are dispatched
 */
export const cartMiddleware: Middleware = (store) => (next) => (action: AnyAction) => {
  const result = next(action);
  
  // Save cart to localStorage when cart actions are dispatched
  if (action.type?.startsWith('cart/')) {
    const state = store.getState() as any;
    
    try {
      localStorage.setItem('kaney_cart', JSON.stringify({
        items: state.cart.items,
        currency: state.cart.currency
      }));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
  
  return result;
};
