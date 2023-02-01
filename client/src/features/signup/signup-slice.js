// Write all logic to sign up and create your account here
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupAPI } from "../../api";

export const signup = createAsyncThunk(
  "auth/signup",
  async (Credentials, thunkAPI) => {
    try {
      const response = await signupAPI(Credentials);
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const signUpSlice = createSlice({
  name: "signUp",
  initialState: { registered: false, error: null, isSignup: false },
  reducers: {
    setErrorSignup(state, action) {
      state.error = action.payload;
    },
    setIsSignup(state) {
      state.isSignup = !state.isSignup;
    },
    notPostSignUp(state) {
      state.registered = false;
      state.error = null;
      state.isSignup = false;
    },
    // Write your different action logics here
  },
  extraReducers(builder) {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        sessionStorage.setItem("U-connect", action.payload?.token);
        state.registered = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = JSON.parse(action.error.message).Error;
      });
  },
});

export const { setErrorSignup, setIsSignup, notPostSignUp } =
  signUpSlice.actions;

export default signUpSlice.reducer;