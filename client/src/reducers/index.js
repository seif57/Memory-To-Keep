import { combineReducers } from "@reduxjs/toolkit";

import posts from "./posts";
import auth from "./auth";

export const rootReducer = combineReducers({
  posts,
  auth,
});
