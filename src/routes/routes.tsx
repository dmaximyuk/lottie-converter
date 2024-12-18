import { App, Home } from "core";

import { createBrowserRouter, type RouteObject } from "react-router-dom";

import { RouteID } from "models";

const pages: RouteObject[] = [
  {
    id: RouteID.App,
    path: "/",
    element: <App />,
    children: [
      {
        id: RouteID.Home,
        path: "/",
        element: <Home />,
      },
      {
        id: RouteID.HowToUse,
        path: "/how-to-use",
        element: <Home />,
      },
    ],
  },
];

const removeUnnecessary = (routes: RouteObject[]): RouteObject[] => {
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

const routes = removeUnnecessary(pages);
const router = createBrowserRouter(routes, { basename: "/" });

export { pages, routes, router };
