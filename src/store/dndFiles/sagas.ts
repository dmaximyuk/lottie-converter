import { all, call, put, takeLatest } from "redux-saga/effects";
import { gunzip, strFromU8, strToU8 } from "fflate";
import pako from "pako";

import { dndFilesActions } from "./index";

import { LoadFilesPayload, FileID, GenerateResponse } from "./interface";
import { ProcessingFileResponse } from "models";

async function createResponse(
  data: string,
  fileId: FileID,
  file: File,
  event: ProgressEvent<FileReader>,
): Promise<GenerateResponse[0]> {
  const compressed = (await deflateData(data)) || [];

  return {
    id: fileId,
    processed: {
      data: {
        default: strToU8(data),
        compressed,
      },
      file: {
        name: file.name,
        size: {
          default: data.length,
          compressed: compressed.length,
        },
      },
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

      resolve(datas);
    } else {
      reject(new Error(`Error convert data`));
      return;
    }
  });
}

function handleProcessing(
  fileId: FileID,
  file: File,
): Promise<GenerateResponse[0]> {
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

            resolve(
              createResponse(strFromU8(decompressed), fileId, file, event),
            );
          });
          break;
        case "json":
          if (u8a.length >= 1) {
            resolve(createResponse(strFromU8(u8a), fileId, file, event));
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
    const tasks = action.payload.map((file) =>
      call(handleProcessing, file.id, file.file),
    );
    const results: GenerateResponse = yield all(tasks);

    yield put(dndFilesActions.setFiles(results));
  } catch (e) {
    console.error(e);
  }
}

export function* dndFilesSaga() {
  yield all([takeLatest(dndFilesActions.loadFiles, loadFiles)]);
}
