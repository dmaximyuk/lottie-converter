import { all } from "redux-saga/effects";

import { dndFilesSaga } from "./dndFiles/sagas";

export function* rootSaga() {
  yield all([dndFilesSaga()]);
}
