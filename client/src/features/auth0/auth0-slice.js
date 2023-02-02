import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth0API } from "../../api";
import { jwtFuncDecode } from "../../App";

export const authZero = createAsyncThunk(
  "auth/auth0",
  async (credentials, thunkAPI) => {
    try {
      const response = await auth0API(credentials);
      return response?.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response?.data));
    }
  }
);

const auth0Slice = createSlice({
  name: "authO",
  initialState: {
    token: null,
    error: null,
  },
  reducers: {
    setError(state, action) {
      state.error = JSON.stringify(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authZero.fulfilled, (state, action) => {
        sessionStorage.setItem("U-connect", action.payload?.token);
        state.token = action.payload;
        state.error = null;
      })
      .addCase(authZero.rejected, (state, action) => {
        console.log(action);
        state.error = JSON.parse(action.error.message)?.Error;
      });
  },
});

export const { setError } = auth0Slice.actions;

export default auth0Slice.reducer;
