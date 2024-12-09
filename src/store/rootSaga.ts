import { all } from "redux-saga/effects";

import { exampleSaga } from "./example/sagas";

export function* rootSaga() {
  yield all([exampleSaga()]);
}
