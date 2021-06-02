import Article from "@/pages/article/index";
import ArticleSave from "@/pages/article/save";
import Index from "@/pages/index/index";
import { routes as routesInterface } from "@/types/Routes";
const routes: Array<routesInterface> = [
  {
    title: "首页",
    name: "index",
    path: "index",
    component: Index,
  },
  {
    title: "文章管理",
    name: "article",
    path: "article",
    childer: [
      {
        title: "文章编辑",
        name: "list",
        path: "/id/:id",
        hidden: true,
        component: ArticleSave,
      },
      {
        title: "文章列表",
        name: "list",
        path: "/list",
        component: Article,
      },
    ],
  },
];

export default routes;
