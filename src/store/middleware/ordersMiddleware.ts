import { Middleware, AnyAction } from '@reduxjs/toolkit';

/**
 * Orders middleware that automatically saves orders state to localStorage
 * whenever orders-related actions are dispatched
 */
export const ordersMiddleware: Middleware = (store) => (next) => (action: AnyAction) => {
  const result = next(action);
  
  // Save orders to localStorage when orders actions are dispatched
  if (action.type?.startsWith('orders/')) {
    const state = store.getState() as { orders: { orders: unknown[] } };
    
    try {
      localStorage.setItem('kaney_orders', JSON.stringify(state.orders.orders));
      console.log('Middleware: Órdenes guardadas automáticamente en localStorage');
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }
  
  return result;
};
