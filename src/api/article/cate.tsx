import request from "@/util/request";

// 获得文章列表
export const lists = () => request.get("/api/article/cate");

// 更新分类
export const update = (id: number) => request.get("/api/article/cate/" + id);

// 删除分类
export const del = (id: number) => request.delete('/api/article/cate/del' + id)

// 添加
export const add = (param: any) => request.post('/api/article/cate');