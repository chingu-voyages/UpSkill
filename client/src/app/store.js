// The redux store saves the whole state of the app in an immutable object tree
import { configureStore } from "@reduxjs/toolkit";
import getLessonsReducer from "../features/get-lessons/get-lessons-slice";
import getTokenReducer from "../features/get-tokens/get-tokens-slice";
import loginLogoutReducer from "../features/login-logout/login-logout-slice";
import postReviewReducer from "../features/post-reviews/post-review-slice";
import searchSkillsReducer from "../features/post-reviews/post-review-slice";
import signUpReducer from "../features/signup/signup-slice";
import updateBioReducer from "../features/update-bio/update-bio-slice";

export const store = configureStore({
  reducer: {
    getLesson: getLessonsReducer,
    getToken: getTokenReducer,
    loginLogout: loginLogoutReducer,
    postReview: postReviewReducer,
    searchSkill: searchSkillsReducer,
    signUp: signUpReducer,
    updateBio: updateBioReducer,
  },
});
