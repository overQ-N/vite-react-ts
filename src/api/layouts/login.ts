import request from "@/common/request";
import { UserInfo } from "@/stores/commonStore";
import { AxiosPromise, AxiosResponse } from "axios";
export function loginByUserName(params: {
  grant_type: string;
  scope: "server";
  tenantId: number;
  [key: string]: unknown;
}): AxiosPromise<UserInfo> {
  return request({
    url: "/auth/oauth/token",
    params,
    headers: {
      isToken: "false",
      TENANT_ID: "1",
      Authorization: "Basic bGVueDpsZW54",
    },
    method: "post",
  });
}
