import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the cart
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log(action.payload);
      state.items.push(action.payload);
    },
    // Action to remove an item from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
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
