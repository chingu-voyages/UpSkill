// The redux store saves the whole state of the app in an immutable object tree
import { configureStore } from "@reduxjs/toolkit";
import getLessonsReducer from "../features/get-lessons/get-lessons-slice";
import getTokenReducer from "../features/get-tokens/get-tokens-slice";
import authSliceReducer from "../features/login-logout/login-logout-slice";
import postReviewReducer from "../features/post-reviews/post-review-slice";
import searchSkillsReducer from "../features/post-reviews/post-review-slice";
import signUpReducer from "../features/signup/signup-slice";
import userStateReducer from "../features/user/user-slice";

export const store = configureStore({
  reducer: {
    user: userStateReducer,
    getLesson: getLessonsReducer,
    getToken: getTokenReducer,
    auth: authSliceReducer,
    postReview: postReviewReducer,
    searchSkill: searchSkillsReducer,
    signUp: signUpReducer,
  },
});
