import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store/rootReducer";
import type {
  DndFilesState,
  LoadFilesPayload,
  SetFilesPayload,
} from "./interface";

const initialState: DndFilesState = {
  isProcessing: false,
  files: [],
};

export const { reducer, actions } = createSlice({
  name: "dndFiles",
  initialState,
  reducers: {
    loadFiles(s, _: LoadFilesPayload) {},

    setFiles(s, f: SetFilesPayload) {
      s.files = f.payload;
    },

    clear(s) {
      s.files = initialState.files;
    },
  },
});

export { reducer as dndFilesReducer, actions as dndFilesActions };
export const dndFilesSelector = (state: RootState) => state.dndFiles;
