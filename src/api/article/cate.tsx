import request from "@/util/request";

// 获得文章列表
export const lists = () => request.get("/article/cate");
