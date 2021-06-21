import loadable from "@loadable/component";
import { RouteConfig } from "react-router-config";
import Layout from "@/layouts";
import Home from "@/pages/home";

const routesConfig: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: Home,
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
export default routesConfig;
