import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store/rootReducer";
import type {
  DndFilesState,
  LoadFilesPayload,
  SetFilesPayload,
} from "./interface";

const initialState: DndFilesState = {
  files: {},
};

export const { reducer, actions } = createSlice({
  name: "dndFiles",
  initialState,
  reducers: {
    loadFiles(s, a: LoadFilesPayload) {
      a.payload.map((f) => {
        s.files[f.id] = { ...f, processed: null };
      });
    },

    setFiles(s, a: SetFilesPayload) {
      a.payload.map((c) => {
        s.files[c.id].processed = c.processed;
      });
    },

    clear(s) {
      s.files = initialState.files;
    },
  },
});

export { reducer as dndFilesReducer, actions as dndFilesActions };
export const dndFilesSelector = (state: RootState) => state.dndFiles;
