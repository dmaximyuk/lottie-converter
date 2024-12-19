import { App, Home, HowToUse } from "core";
import { removeUnnecessary } from "utils";

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
        element: <HowToUse />,
      },
    ],
  },
];

const routes = removeUnnecessary(pages);
const router = createBrowserRouter(routes, { basename: "/zlottie" });

export { pages, routes, router };
