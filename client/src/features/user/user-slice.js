// Write all logic to set up and get all lessons here
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      if (action.payload?.error) {
        state.id = null;
      } else {
        state.id = action.payload?.id;
      }
    },
    // Write your different action logics here
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
