import loadable from "@loadable/component";
import { RouteConfig } from "react-router-config";
import asyncRoutes from "./asyncRoutes";
import Layout from "@/layouts";
import Home from "@/pages/home";
import Login from "@/layouts/login";

const routesConfig: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: Layout,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
    ],
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: "/hybird",
    exact: true,
    component: Layout,
    routes: [
      {
        path: "/",
        exact: false,
        component: loadable(() => import("@/pages/hybird")),
      },
    ],
  },
];

export default routesConfig.concat(asyncRoutes);
