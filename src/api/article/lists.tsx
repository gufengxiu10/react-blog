import request from "@/util/request";

export const lists = () => request.get("/article");
