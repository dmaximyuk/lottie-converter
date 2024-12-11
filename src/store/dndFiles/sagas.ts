import { all, call, put, takeLatest } from "redux-saga/effects";
import { gunzip, strFromU8, strToU8 } from "fflate";
import pako from "pako";

import { dndFilesActions } from "./index";

import { LoadFilesPayload, ProcessingFileResponse } from "./interface";

async function createResponse(
  data: string,
  file: File,
  event: ProgressEvent<FileReader>,
): Promise<ProcessingFileResponse> {
  const compressed = (await deflateData(data)) || [];

  return {
    data: {
      default: strToU8(data),
      compressed,
    },
    file: {
      name: file.name,
      newSize: compressed.length,
      prevSize: data.length,
    },
  };
}

async function deflateData(data: string): Promise<Uint8Array> {
  const u8a = strToU8(data);

  return new Promise((resolve, reject) => {
    if (u8a.length >= 1) {
      const datas = pako.deflateRaw(u8a, {
        level: 9,
        windowBits: 15,
      });
      const dataw = pako.deflate(u8a, { level: 9 });
      console.log(datas.length, dataw.length);
      resolve(datas);
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
      const u8a = new Uint8Array(arrayBuffer);

      switch (ext) {
        case "tgs":
          gunzip(u8a, async (err, decompressed) => {
            if (err) {
              reject(new Error(`Error parsing data`));
              return;
            }

            resolve(createResponse(strFromU8(decompressed), file, event));
          });
          break;
        case "json":
          if (u8a.length >= 1) {
            resolve(createResponse(strFromU8(u8a), file, event));
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
