import { PayloadAction } from "@reduxjs/toolkit";
import { ProcessingFileResponse } from "models";

export type FileID = string | number;
type FileDefault = File;
type FileCompressed = ProcessingFileResponse | null;

export interface DndFilesState {
  files: {
    [key: FileID]: {
      file: FileDefault;
      processed: FileCompressed;
    };
  };
}

export type LoadFilesPayload = PayloadAction<
  Array<{
    id: FileID;
    file: FileDefault;
  }>
>;

export type SetFilesPayload = PayloadAction<
  Array<{
    id: FileID;
    processed: FileCompressed;
  }>
>;

export type GenerateResponse = Array<{
  id: FileID;
  processed: FileCompressed;
}>;
