import { getRoute } from "utils";

import { RouteID } from "models";

export const getRoutePath = (rId: RouteID): string => {
  return getRoute(rId)?.path || "/";
};
