import { createSlice } from "@reduxjs/toolkit";

export interface cartState {
  totalPrice: number;
  totalCount: number;
  items: Array<any>;
}

const initialState: cartState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);

      state.totalCount = state.items.reduce((sum, obj) => {
        return sum + obj.count;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      findItem.count -= 1;
      if (findItem.count === 0) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);

      state.totalCount = state.items.reduce((sum, obj) => {
        return sum + obj.count;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);

      state.totalCount = state.items.reduce((sum, obj) => {
        return sum + obj.count;
      }, 0);
    },
    clearItem(state) {
      state.items = [];
      state.totalCount = state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: any ) => state.cart;

export const { addItem, minusItem, clearItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
