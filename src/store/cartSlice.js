/*
Cart slice (Redux)
- Defines `cart` slice with reducers to add/remove/update/clear items.
- Persists cart to `sessionStorage` and restores on load.
- Exports actions (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`) and the reducer.
*/

import { createSlice } from "@reduxjs/toolkit";

const loadCartFromSession = () => {
  try {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from sessionStorage:", error);
    return [];
  }
};

const saveCartToSession = (items) => {
  try {
    sessionStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to sessionStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromSession(),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToSession(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToSession(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      saveCartToSession(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
