import { combineReducers } from "@reduxjs/toolkit";

import { reducer as dndFiles } from "./dndFiles";
import { reducer as example } from "./example";

export const rootReducer = combineReducers({
  dndFiles,
  example,
});

export type RootState = ReturnType<typeof rootReducer>;
