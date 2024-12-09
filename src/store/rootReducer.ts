import { combineReducers } from "@reduxjs/toolkit";

import { reducer as example } from "./example";

export const rootReducer = combineReducers({
  example,
});

export type RootState = ReturnType<typeof rootReducer>;
