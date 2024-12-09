import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store/rootReducer";
import type { ExampleState } from "./interface";

const initialState: ExampleState = {
  isLoading: false,
};

export const { reducer, actions } = createSlice({
  name: "example",
  initialState,
  reducers: {
    clear(state) {
      state.isLoading = initialState.isLoading;
    },
  },
});

export { reducer as exampleReducer, actions as exampleActions };
export const exampleSelector = (state: RootState) => state.example;
