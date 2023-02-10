// The redux store saves the whole state of the app in an immutable object tree
import { configureStore } from "@reduxjs/toolkit";
import getLessonsReducer from "../features/get-lessons/get-lessons-slice";
import getTokenReducer from "../features/get-tokens/get-tokens-slice";
import authSliceReducer from "../features/login-logout/login-logout-slice";
import searchReducer from "../features/search/search-slice";
import signUpReducer from "../features/signup/signup-slice";
import userStateReducer from "../features/user/user-slice";
import messagesReducer from "../features/messages/messages-slice";

export const store = configureStore({
  reducer: {
    user: userStateReducer,
    getLesson: getLessonsReducer,
    getToken: getTokenReducer,
    auth: authSliceReducer,
    searchSkill: searchReducer,
    signUp: signUpReducer,
    messages: messagesReducer,
  },
});
