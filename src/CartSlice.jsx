import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },

  reducers: {
    // ✅ ADD ITEM — Called from handleAddToCart() in ProductList.jsx
    addItem: (state, action) => {
      // cost is now correctly received as a number
      const { name, image, cost } = action.payload; // Extract product details
      const existingItem = state.items.find(item => item.name === name); // Check if item exists

      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add new item with quantity 1 (with cost as a number)
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ✅ REMOVE ITEM — Called when user removes product from cart
    removeItem: (state, action) => {
      // action.payload = product name
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // ✅ UPDATE QUANTITY — Called when user changes quantity in cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extract item name and updated quantity
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update quantity if item exists
      }
    },
  },
});

// ✅ Export actions for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// ✅ Export reducer for store.js
export default CartSlice.reducer;