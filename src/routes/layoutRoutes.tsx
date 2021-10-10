import React, { ReactNode } from "react";
import { RouteConfig, renderRoutes } from "react-router-config";
import loadable from "@loadable/component";
import { AppstoreOutlined, PieChartOutlined } from "@ant-design/icons";
import Layout from "@/layouts";
import Home from "@/pages/home";

type ExtendRouteConfig = RouteConfig & {
  key?: string;
  name?: string;
  icon?: string | ReactNode;
};
const layoutRoutes: ExtendRouteConfig[] = [
  {
    path: "/",
    key: "/",
    exact: true,
    name: "首页",
    component: Layout,

    routes: [
      {
        path: "/",
        key: "/",
        exact: true,
        name: "首页",
        component: Home,
      },
    ],
  },
  {
    path: "/dashboard",
    key: "/dashboard",
    name: "Dashboard",
    icon: <PieChartOutlined />,
    component: Layout,
    routes: [
      {
        path: "/dashboard/analysis",
        key: "/dashboard/analysis",
        name: "分析页",
        component: loadable(
          () => import("@/views/dashboard/analysis/Analysis")
        ),
      },
      {
        path: "/dashboard/monitor",
        key: "/dashboard/monitor",
        name: "监控页",
        component: loadable(() => import("@/views/dashboard/monitor/Monitor")),
      },
      {
        path: "/dashboard/workplace",
        key: "/dashboard/workplace",
        name: "工作台",
        component: loadable(
          () => import("@/views/dashboard/workplace/Workplace")
        ),
      },
    ],
  },
  {
    path: "/admin",
    key: "/admin",
    name: "管理",
    icon: <AppstoreOutlined />,
    component: Layout,
    routes: [
      {
        path: "/admin/user",
        key: "/admin/user",
        name: "用户管理",
        component: loadable(() => import("@/views/admin/user/User")),
      },
    ],
  },
];
export default layoutRoutes;
