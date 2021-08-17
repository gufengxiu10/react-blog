import request from "@/util/request";

// 获得文章列表
export const lists = () => request.get("/api/article/cate");

// 更新分类
export const update = (id: number, params: { name: string }) => request.patch("/api/article/cate/" + id, params);

// 删除分类
export const del = (id: number) => request.delete('/api/article/cate/' + id)

// 添加
export const add = (params: any) => request.post('/api/article/cate', params);