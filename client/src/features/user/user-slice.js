// Write all logic to set up and get all lessons here
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  skills: null,
  about: null,
  hobbies: null,
  mission: null,
  tokens: null,
  profilePic: null,
  profilePicId: null,
  calendly_link: null,
  first_name: null,
  last_name: null,
  occupation: null,
  location: null,
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
    setUserData(state, action) {
      if (action.payload?.error) {
        state.id = null;
        state.skills = null;
        (state.about = null),
          (state.hobbies = null),
          (state.mission = null),
          (state.tokens = null),
          (state.profilePic = null),
          (state.profilePicId = null),
          (state.calendly_link = null),
          (state.first_name = null),
          (state.last_name = null),
          (state.occupation = null),
          (state.location = null);
      } else {
        (state.skills = action.payload?.skills),
          (state.about = action.payload?.about),
          (state.hobbies = action.payload?.hobbies),
          (state.mission = action.payload?.mission),
          (state.tokens = action.payload?.tokens),
          (state.profilePic = action.payload?.profilePic),
          (state.profilePicId = action.payload?.profilePicId),
          (state.calendly_link = action.payload?.calendly_link),
          (state.first_name = action.payload?.first_name),
          (state.last_name = action.payload?.last_name),
          (state.occupation = action.payload?.occupation),
          (state.location = action.payload?.location);
      }
    },
    setBio(state, action) {
      if (action.payload?.error) {
        return { ...state };
      } else {
        (state.hobbies = action.payload.hobbies
          ? action.payload.hobbies
          : state.hobbies),
          (state.about = action.payload.about
            ? action.payload.about
            : state.about),
          (state.mission = action.payload.mission
            ? action.payload.mission
            : state.mission);
      }
    },
    setSkills(state, action) {
      if (action.payload?.error) {
        return { ...state };
      } else {
        state.skills = action.payload.skills
          ? action.payload.skills
          : state.skills;
      }
    },
    // Write your different action logics here
  },
});

export const { setUser, setUserData, setBio, setSkills } = userSlice.actions;

export default userSlice.reducer;
