import { combineReducers } from "@reduxjs/toolkit";

import posts from "./posts";

export const rootReducer = combineReducers({
  posts,
});
