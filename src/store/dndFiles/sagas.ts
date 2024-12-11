import { all, call, put, take, takeLatest } from "redux-saga/effects";
import { inflate, gunzip, strFromU8, strToU8 } from "fflate";
// import Archiver from "archiver";
// const archive = Archiver("zip", {
//   zlib: { level: 9 },
// });

import zlib from "zlib";

import { dndFilesActions } from "./index";

import { LoadFilesPayload, ProcessingFileResponse } from "./interface";

async function createResponse(
  data: ProcessingFileResponse["data"]["default"],
  file: File,
  event: ProgressEvent<FileReader>,
): Promise<ProcessingFileResponse> {
  const compressed = (await deflateData(data)) || [];

  return {
    data: {
      default: data,
      compressed,
    },
    file: {
      name: file.name,
      newSize: compressed.length,
      prevSize: data.length,
    },
  };
}

async function deflateData(data: Uint8Array | string): Promise<Uint8Array> {
  console.log(strFromU8(data));
  const uint8Array = typeof data === "string" ? strToU8(data) : data;

  return new Promise((resolve, reject) => {
    if (uint8Array.length >= 1) {
      // archive.
      zlib.deflate(uint8Array, { level: 9 }, (err, data) => {
        if (err) {
          reject(new Error(`Error compress data`));
          return;
        }

        resolve(data);
      });
    } else {
      reject(new Error(`Error convert data`));
      return;
    }
  });
}

function handleProcessing(file: File): Promise<ProcessingFileResponse> {
  if (!(file instanceof File)) {
    throw new TypeError("Your file is not File instance.");
  }

  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const ext = file.name.split(".").pop()?.toLowerCase() as
        | "tgs"
        | "json"
        | undefined;

      if (!event.target?.result || !ext) {
        reject(new Error("File read error."));
        return;
      }

      const arrayBuffer = event.target.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);

      switch (ext) {
        case "tgs":
          gunzip(uint8Array, async (err, decompressed) => {
            if (err) {
              reject(new Error(`Error parsing data`));
              return;
            }

            resolve(createResponse(decompressed, file, event));
          });
          break;
        case "json":
          if (uint8Array.length >= 1) {
            resolve(createResponse(uint8Array, file, event));
          } else {
            reject(new Error(`Error parsing data`));
          }
          break;
      }
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  });
}

function* loadFiles(
  action: LoadFilesPayload,
): Generator<ReturnType<any>, void, any> {
  try {
    const tasks = action.payload.map((file) => call(handleProcessing, file));
    const results: Array<ProcessingFileResponse> = yield all(tasks);

    yield put(dndFilesActions.setFiles(results));
  } catch (e) {
    console.error(e);
  }
}

export function* dndFilesSaga() {
  yield all([takeLatest(dndFilesActions.loadFiles, loadFiles)]);
}
