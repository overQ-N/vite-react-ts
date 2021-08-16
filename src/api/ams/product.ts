import request from "@/common/request";
import { TResponse, TData } from "@/api/api";

// 获取商品数据
export function findProdList(data: TData): TResponse {
  return request({
    url: "/admin/prod/findProdList",
    data,
    method: "post",
  });
}

// 更新秒杀款状态
export function batchUpdateProdSnapUp(data: FormData): TResponse {
  return request({
    url: "/admin/prod/batchUpdateProdSnapUp",
    data,
    method: "POST",
  });
}

// 删除
export function del(id: number): TResponse {
  return request({
    url: `/admin/prod/${id}`,
    method: "DELETE",
  });
}
