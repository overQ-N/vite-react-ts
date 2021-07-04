import request from "@/common/request";
import { TResponse } from "@/api/api";

export function getRoleApp(): TResponse {
  return request({
    url: "/upc/sysapp/listRoleApp",
  });
}

export function getMenu(): TResponse {
  return request({
    url: "/upc/menu",
  });
}
