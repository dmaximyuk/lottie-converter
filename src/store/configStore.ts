import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { enableBatching } from "./index";

const sagaMiddleware = createSagaMiddleware();

export const configStore = (saga: any, reducer: any) => {
  const store = configureStore({
    reducer: enableBatching(reducer),
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      [
        ...getDefaultMiddleware({
          thunk: false,
          serializableCheck: false,
        }),
        sagaMiddleware,
      ] as any,
  });

  sagaMiddleware.run(saga);

  return store;
};
