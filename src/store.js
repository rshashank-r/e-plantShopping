import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer, // Register the cart slice reducer
  },
});

// Export the store so it can be used in Provider
export default store;
