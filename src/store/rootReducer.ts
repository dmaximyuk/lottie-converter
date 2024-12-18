import { combineReducers } from "@reduxjs/toolkit";

import { reducer as dndFiles } from "./dndFiles";

export const rootReducer = combineReducers({
  dndFiles,
});

export type RootState = ReturnType<typeof rootReducer>;
