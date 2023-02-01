// Write all logic to login and logout here
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../api";
import { jwtFuncDecode } from "../../App";

// Action creators
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

// Slice reducer for authentication state management
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    error: null,
  },
  reducers: {
    logOut(state) {
      sessionStorage.clear();
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    ifAuthenticated(state) {
      const decode = jwtFuncDecode();
      if (decode.error) {
        state.error = null;
        state.isAuthenticated = false;
      } else {
        state.error = null;
        state.token = sessionStorage.getItem("U-connect");
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        sessionStorage.setItem("U-connect", action.payload?.token);
        state.token = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = JSON.parse(action.error.message).Error;
      });
  },
});
export const { logOut, ifAuthenticated } = authSlice.actions;

export default authSlice.reducer;