import { all, call, takeLatest } from "redux-saga/effects";
import { deflate, inflate, gunzip, strFromU8 } from "fflate";

import { dndFilesActions } from "./index";

import { LoadFilesPayload, ProcessingFileResponse } from "./interface";

async function createResponse(
  data: ProcessingFileResponse["data"]["default"],
  file: File,
  event: ProgressEvent<FileReader>,
): Promise<ProcessingFileResponse> {
  const ext = "zlottie";
  const compressed = (await deflateData(data)) || [];

  return {
    data: {
      default: data,
      compressed,
    },
    file: {
      ext,
      name: file.name,
      newSize: 0,
      prevSize: 0,
    },
  };
}

async function deflateData(data: Uint8Array | string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const uint8Array = typeof data === "string" ? encoder.encode(data) : data;

  return new Promise((resolve, reject) => {
    if (uint8Array.length >= 1) {
      deflate(uint8Array, (err, data) => {
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
        | "lottie"
        | "json"
        | undefined;
      if (!event.target?.result) {
        reject(new Error("File read error."));
        return;
      }

      if (ext) {
        const arrayBuffer = event.target.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        switch (ext) {
          case "tgs":
            gunzip(uint8Array, async (err, decompressed) => {
              if (err) {
                reject(new Error(`Error parsing data`));
                return;
              }

              resolve(createResponse(strFromU8(decompressed), file, event));
            });
            break;
          case "lottie":
            console.log(file, event);
            break;
          case "json":
            if (uint8Array.length >= 1) {
              resolve(createResponse(strFromU8(uint8Array), file, event));
            } else {
              reject(new Error(`Error parsing data`));
            }
            break;
        }
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
    const results = yield all(tasks);
    console.log("Все результаты:", results);
  } catch (e) {
    console.error(e);
  }
}

export function* dndFilesSaga() {
  yield all([takeLatest(dndFilesActions.loadFiles, loadFiles)]);
}
