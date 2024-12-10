import { PayloadAction } from "@reduxjs/toolkit";

export interface DndFilesState {
  isProcessing: boolean;
  files: File[];
}

export type LoadFilesPayload = PayloadAction<File[]>;
export type SetFilesPayload = PayloadAction<File[]>;

export interface ProcessingFileResponse {
  data: {
    default: string;
    compressed: Uint8Array;
  };
  file: {
    name: string;
    ext: string;
    prevSize: number;
    newSize: number;
  };
}
