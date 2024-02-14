import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const removedItemId = action.payload;
      const removedItem = state.items.find((obj) => obj.id === removedItemId);

      if (removedItem) {
        removedItem.count--;

        state.totalPrice -= removedItem.price;

        if (removedItem.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== removedItemId);
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const removedItemId = action.payload;
      const removedItem = state.items.find((obj) => obj.id === removedItemId);
      if (removedItem) {
        state.totalPrice -= removedItem.price * removedItem.count;
        state.items = state.items.filter((obj) => obj.id !== removedItemId);
      }
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
