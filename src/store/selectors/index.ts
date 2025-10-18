import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { searchProducts } from '@/services/searchService';

// ==========================================
// Auth Selectors
// ==========================================
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectKYCStatus = (state: RootState) => state.auth.kycStatus;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// ==========================================
// Marketplace Selectors
// ==========================================
export const selectMarketplace = (state: RootState) => state.marketplace;
export const selectProducts = (state: RootState) => state.marketplace.products;
export const selectCategories = (state: RootState) => state.marketplace.categories;
export const selectSelectedProduct = (state: RootState) => state.marketplace.selectedProduct;
export const selectRelatedProducts = (state: RootState) => state.marketplace.relatedProducts;
export const selectFilters = (state: RootState) => state.marketplace.filters;
export const selectSearchQuery = (state: RootState) => state.marketplace.searchQuery;
export const selectFeaturedProducts = (state: RootState) => state.marketplace.featuredProducts;
export const selectLiquidationProducts = (state: RootState) => state.marketplace.liquidationProducts;
export const selectMarketplaceLoading = (state: RootState) => state.marketplace.loading;
export const selectSelectedCategory = (state: RootState) => state.marketplace.selectedCategory;

// ==========================================
// Cart Selectors
// ==========================================
export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCurrency = (state: RootState) => state.cart.currency;
export const selectCartExchangeRate = (state: RootState) => state.cart.exchangeRate;
export const selectCartSubtotal = (state: RootState) => state.cart.subtotal;
export const selectCartLogistics = (state: RootState) => state.cart.logisticsEstimate;
export const selectCartTax = (state: RootState) => state.cart.tax;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectRecommendedProducts = (state: RootState) => state.cart.recommendedProducts;

// ==========================================
// Checkout Selectors
// ==========================================
export const selectCheckout = (state: RootState) => state.checkout;
export const selectCurrentStep = (state: RootState) => state.checkout.currentStep;
export const selectTotalSteps = (state: RootState) => state.checkout.totalSteps;
export const selectCustomerInfo = (state: RootState) => state.checkout.customerInfo;
export const selectFiscalData = (state: RootState) => state.checkout.fiscalData;
export const selectDeliveryInfo = (state: RootState) => state.checkout.deliveryInfo;
export const selectPaymentMethod = (state: RootState) => state.checkout.paymentMethod;
export const selectOrderSummary = (state: RootState) => state.checkout.orderSummary;
export const selectValidationErrors = (state: RootState) => state.checkout.validationErrors;
export const selectCheckoutLoading = (state: RootState) => state.checkout.loading;
export const selectOrderId = (state: RootState) => state.checkout.orderId;

// ==========================================
// Customer Profile Selectors
// ==========================================
export const selectCustomerProfile = (state: RootState) => state.customer;
export const selectCustomer = (state: RootState) => state.customer.customer;
export const selectOrders = (state: RootState) => state.customer.orders;
export const selectAddresses = (state: RootState) => state.customer.addresses;
export const selectRefunds = (state: RootState) => state.customer.refunds;
export const selectSupportTickets = (state: RootState) => state.customer.supportTickets;
export const selectActiveTab = (state: RootState) => state.customer.activeTab;
export const selectEditingAddress = (state: RootState) => state.customer.editingAddress;
export const selectEditingProfile = (state: RootState) => state.customer.editingProfile;
export const selectCustomerLoading = (state: RootState) => state.customer.loading;

// ==========================================
// UI Selectors
// ==========================================
export const selectUI = (state: RootState) => state.ui;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectLanguage = (state: RootState) => state.ui.language;
export const selectUICurrency = (state: RootState) => state.ui.currency;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectModals = (state: RootState) => state.ui.modals;
export const selectUILoading = (state: RootState) => state.ui.loading;
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state: RootState) => state.ui.mobileMenuOpen;

// ==========================================
// Memoized Selectors
// ==========================================

// Cart item count
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

// Total cart items (unique products)
export const selectUniqueCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

// Unread notifications count
export const selectUnreadNotificationsCount = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(n => !n.read).length
);

// Default address
export const selectDefaultAddress = createSelector(
  [selectAddresses],
  (addresses) => addresses.find(addr => addr.isDefault) || addresses[0] || null
);

// Filtered products with search and category
export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchQuery, selectSelectedCategory],
  (products, searchQuery, selectedCategory) => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query using intelligent search
    if (searchQuery) {
      filtered = searchProducts(filtered, searchQuery);
    }

    return filtered;
  }
);

// Search-only filtered products (no category filter)
export const selectSearchFilteredProducts = createSelector(
  [selectProducts, selectSearchQuery],
  (products, searchQuery) => {
    if (searchQuery && searchQuery.trim().length > 0) {
      return searchProducts(products, searchQuery);
    }
    // Si no hay query, retornar array vacío para mostrar mensaje de búsqueda requerida
    return [];
  }
);

// Cart totals in selected currency
export const selectCartTotalsInCurrency = createSelector(
  [selectCartSubtotal, selectCartLogistics, selectCartTax, selectCartTotal, selectCartCurrency, selectCartExchangeRate],
  (subtotal, logistics, tax, total, currency, exchangeRate) => {
    const rate = currency === 'BS' ? exchangeRate : 1;
    
    return {
      subtotal: subtotal * rate,
      logistics: logistics * rate,
      tax: tax * rate,
      total: total * rate,
      currency
    };
  }
);

// Check if checkout is complete
export const selectCheckoutComplete = createSelector(
  [selectCustomerInfo, selectFiscalData, selectDeliveryInfo, selectPaymentMethod],
  (customerInfo, fiscalData, deliveryInfo, paymentMethod) => {
    return !!(customerInfo && fiscalData && deliveryInfo && paymentMethod);
  }
);

// Active orders (not delivered or cancelled)
export const selectActiveOrders = createSelector(
  [selectOrders],
  (orders) => orders.filter(order => 
    order.status !== 'delivered' && order.status !== 'cancelled'
  )
);

// Pending refunds
export const selectPendingRefunds = createSelector(
  [selectRefunds],
  (refunds) => refunds.filter(refund => refund.status === 'pending')
);

// Open support tickets
export const selectOpenSupportTickets = createSelector(
  [selectSupportTickets],
  (tickets) => tickets.filter(ticket => 
    ticket.status === 'open' || ticket.status === 'in-progress'
  )
);
