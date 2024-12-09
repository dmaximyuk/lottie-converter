import { all, call, takeLatest } from "redux-saga/effects";

import { Api } from "api";

import { exampleActions } from "./index";

function* loggedWorker(): Generator<ReturnType<any>, void, any> {
  try {
    const data = yield call(Api.get, "/");
    console.log(data);
  } catch (e) {
    // console.error(e.message);
  }
}

export function* exampleSaga() {
  yield all([takeLatest(exampleActions.clear, loggedWorker)]);
}
