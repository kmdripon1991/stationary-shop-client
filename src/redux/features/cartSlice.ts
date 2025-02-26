import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the cart
export type TCartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  model: string;
};

interface CartState {
  items: TCartItem[];
}

const initialState: CartState = {
  items: [],
};

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const carts = state.items;
      const isExist = carts.find((item) => item._id === action.payload._id);
      if (isExist) {
        isExist.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    // Action to remove an item from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existItem = state.items.find((item) => item._id === id);
      if (existItem && quantity > 0) {
        existItem.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
