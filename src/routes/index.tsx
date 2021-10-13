import loadable from "@loadable/component";
import { RouteConfig, renderRoutes } from "react-router-config";
import asyncRoutes from "./asyncRoutes";
import layoutRoutes from "./layoutRoutes";
import Layout from "@/layouts";
import Login from "@/pages/login";
import Home from "@/pages/home";
const routesConfig: RouteConfig[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/hybird",
    component: Layout,
    routes: [
      {
        path: "/",
        component: loadable(() => import("@/pages/hybird")),
      },
    ],
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   routes: [
  //     {
  //       path: "/",
  //       key: "/",
  //       exact: true,
  //       name: "首页",
  //       component: Home,
  //     },
  //   ],
  // },
];

// export default routesConfig.concat(asyncRoutes);
export default ([] as any[]).concat(layoutRoutes, routesConfig);
