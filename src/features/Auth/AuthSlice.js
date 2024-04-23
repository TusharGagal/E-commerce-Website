import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckUser, CreateUser, SignOut } from "./AuthAPI";
import { updateUser } from "../User/userAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await CreateUser(userData);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
    const response = await CheckUser(loginInfo);
    return response.data;
  }
);
export const singOutAsync = createAsyncThunk("user/signOut", async (userId) => {
  const response = await SignOut(userId);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(singOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(singOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
