import { App, Home } from "core";

import { createBrowserRouter, type RouteObject } from "react-router-dom";

import { RouteId } from "models";

const pages: RouteObject[] = [
  {
    id: RouteId.App,
    path: "/",
    element: <App />,
    children: [
      {
        id: RouteId.Home,
        path: "/",
        element: <Home />,
      },
    ],
  },
];

const removeIdFromRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map(({ id, children, ...rest }): RouteObject => {
    const updatedChildren = children ? removeIdFromRoutes(children) : undefined;

    console.log(id);

    return {
      ...rest,
      children: updatedChildren,
    } as RouteObject;
  });
};

const routes = removeIdFromRoutes(pages);

const router = createBrowserRouter(routes, { basename: "/" });

export { routes, router, pages };
