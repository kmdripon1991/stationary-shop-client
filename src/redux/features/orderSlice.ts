import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TOrder = {
  _id: string;
  name: string;
  quantity: number;
};

const initialState: TOrder[] = [];

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder>) => {
      const orderItem = action.payload;
      state.push(orderItem);
    },
    removeOrder: (state, action: PayloadAction<TOrder>) => {
      const removeOrderItem = action.payload;
      const remainingOrderItems = state.filter(
        (item) => item._id !== removeOrderItem._id
      );
      return remainingOrderItems;
    },
    clearOrders: () => initialState,
  },
});

export const { addOrder, removeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
