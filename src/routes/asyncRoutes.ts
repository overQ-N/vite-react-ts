import { useStores } from "@/hooks";
import loadable from "@loadable/component";
import { RouteConfig } from "react-router-config";
import Layout from "@/layouts";
import { getStore, setStore } from "@/utils/storage";
import { MenuItem } from "@/stores/commonStore";
import Home from "@/pages/home";
const menu: MenuItem[] = getStore({ key: "menu" }) || [];
const asyncRoutes: RouteConfig[] = [];
menu.forEach((item) => {
  const path = item.path;
  const routeItem: RouteConfig = {
    path,
    exact: false,
    component: Layout,
    routes: [],
  };
  if (item.children) {
    item.children.forEach((cItem) => {
      routeItem.routes?.push({
        path: `${path}/${cItem.path}`,
        component: loadable(() => import(`@/${cItem.component}`)),
      });
    });
  }
  asyncRoutes.push(routeItem);
});

export default asyncRoutes;
