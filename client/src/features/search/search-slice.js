// Write all logic to search for a skill or subject here
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchSkills(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { searchSkills } = searchSlice.actions;

export default searchSlice.reducer;
