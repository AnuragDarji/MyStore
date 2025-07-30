import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state[itemIndex].quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },

    // Remove a single quantity
    removeItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
        } else {
          state.splice(index, 1); // remove item if quantity reaches 0
        }
      }
    },

    // Remove all quantities of the item (entire item)
    removeAllOfItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem, removeAllOfItem } = cartSlice.actions;

export default cartSlice.reducer;
