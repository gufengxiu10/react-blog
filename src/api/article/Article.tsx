import request from "@/util/request";

// 获得文章列表
export const lists = (params: any = {}) =>
  request.get("/api/article", {
    params: params,
  });

export const info = (id: any) => request.get("/api/article/" + id);

export const save = (id: number, params: any) =>
  request.put("/api/article/" + id, params);

export const add = (params: any) => request.post("/api/article/add", params);

export const del = (id: number) => request.delete("/api/article/" + id);
