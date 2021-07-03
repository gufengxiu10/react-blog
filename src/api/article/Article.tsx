import request from "@/util/request";

// 获得文章列表
export const lists = (params: any = {}) =>
  request.get("/article", {
    params: params,
  });

export const info = (id: any) => request.get("/article/" + id);
