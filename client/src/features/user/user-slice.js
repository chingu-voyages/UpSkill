// Write all logic to set up and get all lessons here
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../api";

export const getUser = createAsyncThunk(
  "user/info",
  async (credential, thunkAPI) => {
    try {
      const response = await getUserInfo(credential);
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

const initialState = {
  id: null,
  skills: null,
  about: null,
  hobbies: null,
  mission: null,
  learning: null,
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
        state.skills = null;
        (state.about = null),
          (state.hobbies = null),
          (state.mission = null),
          (state.tokens = null),
          (state.learning = null),
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
          (state.learning = action.payload?.learning),
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
        (state.skills = action.payload.skills
          ? action.payload.skills
          : state.skills),
          (state.learning = action.payload.learning
            ? action.payload.learning
            : state.learning);
      }
    },
    setPhoto(state, action) {
      if (action.payload?.error) {
        return { ...state };
      } else {
        state.profilePic = action.payload.profilePic
          ? action.payload.profilePic
          : state.profilePic;
      }
    },
    // Write your different action logics here
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
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
          state.skills = action.payload?.skills;
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
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log({ action });
      });
  },
});

export const { setUser, setUserData, setBio, setSkills, setPhoto } =
  userSlice.actions;

export default userSlice.reducer;
