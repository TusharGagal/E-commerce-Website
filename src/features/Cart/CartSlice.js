import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchItemsByUserId,
  updateItem,
  removeItem,
  resetCart,
} from "./CartAPI";
const initialState = {
  value: 0,
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addtocart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);
export const updateItemsAsync = createAsyncThunk(
  "cart/updateItem",
  async (update) => {
    const response = await updateItem(update);
    return response.data;
  }
);
export const removeItemAsync = createAsyncThunk(
  "cart/removeItem",
  async (itemId) => {
    const response = await removeItem(itemId);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(removeItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const cartItems = (state) => state.cart.items;
export const cartstatus = (state) => state.cart.status;

export default cartSlice.reducer;
