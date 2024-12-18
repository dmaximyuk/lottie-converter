import { RouteObject } from "react-router-dom";

export const removeUnnecessary = (routes: RouteObject[]): RouteObject[] => {
  const unnecessary = ["id"];
  return routes.map((route) => {
    const { children, ...rest } = Object.keys(route)
      .filter((key) => !unnecessary.includes(key))
      .reduce<Record<string, unknown>>((obj, key) => {
        obj[key] = (route as Record<string, unknown>)[key];
        return obj;
      }, {}) as RouteObject;

    const updatedChildren = children ? removeUnnecessary(children) : undefined;

    return {
      ...rest,
      children: updatedChildren,
    } as RouteObject;
  });
};
