import { all } from "redux-saga/effects";

import { dndFilesSaga } from "./dndFiles/sagas";
import { exampleSaga } from "./example/sagas";

export function* rootSaga() {
  yield all([dndFilesSaga(), exampleSaga()]);
}
