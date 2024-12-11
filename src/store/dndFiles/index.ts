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
  parsedFiles: [],
};

export const { reducer, actions } = createSlice({
  name: "dndFiles",
  initialState,
  reducers: {
    loadFiles(s, a: LoadFilesPayload) {
      s.files = a.payload;
      s.isProcessing = true;
    },

    setFiles(s, a: SetFilesPayload) {
      s.parsedFiles = a.payload;
      s.isProcessing = false;
    },

    clear(s) {
      s.isProcessing = initialState.isProcessing;
      s.files = initialState.files;
      s.parsedFiles = initialState.parsedFiles;
    },
  },
});

export { reducer as dndFilesReducer, actions as dndFilesActions };
export const dndFilesSelector = (state: RootState) => state.dndFiles;
