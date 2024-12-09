import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { configStore } from "./configStore";

export const store = configStore(rootSaga, rootReducer);
Object.assign(window, { store });
