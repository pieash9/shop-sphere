import { getCartItem, saveToLocalStorage } from "@/utils/localStorage";
import { IProduct } from "@/utils/types/product.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cart: IProduct[];
}

const initialState: CartState = {
  cart: getCartItem(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity! += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      saveToLocalStorage(state.cart);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state.cart);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );

      if (existingProductIndex !== -1) {
        const product = state.cart[existingProductIndex];
        if (product && product.quantity !== undefined) {
          product.quantity -= 1;
        }
      }

      state.cart = state.cart.filter((item) => item.quantity! > 0);
      saveToLocalStorage(state.cart);
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
