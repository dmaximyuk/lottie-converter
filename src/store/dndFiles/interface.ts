import { PayloadAction } from "@reduxjs/toolkit";

export interface DndFilesState {
  isProcessing: boolean;
  files: Array<File>;
  parsedFiles: Array<ProcessingFileResponse>;
}

export type LoadFilesPayload = PayloadAction<DndFilesState["files"]>;
export type SetFilesPayload = PayloadAction<DndFilesState["parsedFiles"]>;

export interface ProcessingFileResponse {
  data: {
    default: Uint8Array;
    compressed: Uint8Array;
  };
  file: {
    name: string;
    prevSize: number;
    newSize: number;
  };
}
