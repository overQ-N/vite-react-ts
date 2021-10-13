import { makeAutoObservable, action, runInAction, toJS } from "mobx";
import { persist } from "mobx-persist";
import { getStore, setStore } from "@/utils/storage";
import { loginByUserName } from "@/api/layouts/login";
import { TResponse } from "@/api/api";
import { getRoleApp, getMenu } from "@/api/layouts";
import { AxiosPromise } from "axios";
import { ReactNode } from "react";
import request from "@/common/request";
export interface UserInfo {
  access_token?: string;
  dept_id?: number;
  expires_in?: number;
  nickname?: string;
  permissions?: { authority: string }[];
  refresh_token?: string;
  scope: "server";
  tenant_id?: number;
  token_type: "bearer";
  userFlag?: number;
  user_id?: number;
  username?: string;
  [key: string]: unknown;
}

export interface AppItem {
  appCode: string;
  appIcon: string;
  appKey: string;
  appName: string;
  appType: number;
  appUrl: string;
  id: number;
  nickName: string;
  seq: number;
  tenantId: number;
  [key: string]: any;
}
export interface MenuItem {
  appCode: string;
  appId: number;
  children: MenuItem[];
  component: ReactNode;
  description: string;
  icon: string;
  id: number;
  keepAlive: "0" | "1";
  label: string;
  name: string;
  parentId: number;
  path: string;
  sort: number;
  type: string;
}
type State = "done" | "pending" | "error";
export interface ICommonStore {}
class CommonStore implements ICommonStore {
  public title: string = "title";
  public theme: string = "default";
  public count: number = 0;
  userInfo: UserInfo = getStore({
    key: "userInfo",
  }) || {
    token_type: "bearer",
    scope: "server",
  };
  state: State = "done";
  apps: AppItem[] = getStore({ key: "apps" }) || [];
  menu: MenuItem[] = getStore({ key: "menu" }) || [];
  constructor() {
    makeAutoObservable(this);
  }
  setTitle(title: string) {
    this.title = title;
  }
  setTheme(theme: string) {
    this.theme = theme;
  }
  *increment() {
    yield setTimeout(
      action("increment", () => {
        this.count++;
      }),
      2000
    );
  }
  updateState(state: State) {
    this.state = state;
  }
  *setUserInfo(data: {
    grant_type: string;
    scope: "server";
    tenantId: number;
    [key: string]: unknown;
  }) {
    this.state = "pending";
    let err = null;

    try {
      const { data: res } = yield request.post("/mock/login", data);
      const userInfo: UserInfo = res.data;
      setStore({
        key: "userInfo",
        value: userInfo,
      });
      this.userInfo = userInfo;
      this.state = "done";
    } catch (error) {
      err = error;
      this.state = "error";
    }
    return err as Error;
  }
  async getApps() {
    this.state = "pending";
    try {
      const { data: res } = await getRoleApp();
      if (res.code === 0) {
        const apps: AppItem[] = res.data;
        const { data: ret } = await getMenu();
        if (ret.code === 0) {
          const menu = ret.data;
          runInAction(() => {
            this.state = "done";
            // appType=2 不显示
            const showApps = apps.filter((v) => v.appType === 1);
            this.apps = showApps;
            this.menu = menu;
            setStore({
              key: "apps",
              value: showApps,
            });
            setStore({
              key: "menu",
              value: menu,
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
      this.state = "error";
    }
  }
}
export default new CommonStore();
