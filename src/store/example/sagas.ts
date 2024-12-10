import { all, call, takeLatest } from "redux-saga/effects";

import { exampleActions } from "./index";

function* loggedWorker(): Generator<ReturnType<any>, void, any> {
  try {
  } catch (e) {
    // console.error(e.message);
  }
}

export function* exampleSaga() {
  yield all([takeLatest(exampleActions.clear, loggedWorker)]);
}
