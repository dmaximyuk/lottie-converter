export function enableBatching(reducer: any) {
  return function batchingReducer(state: any, action: any) {
    switch (action.type) {
      case "BATCH_ACTIONS":
        return action.actions.reduce(batchingReducer, state);
      case "RESET_ALL":
        return reducer(undefined, action);
      default:
        return reducer(state, action);
    }
  };
}

export function batchActions(...actions: any) {
  return {
    type: "BATCH_ACTIONS",
    actions: actions.filter((action: any) => !!action),
  };
}

export function resetAllStates() {
  return {
    type: "RESET_ALL",
  };
}
