import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

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
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
