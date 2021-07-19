import Article from "@/pages/article/index";
import ArticleEdit from "@/pages/article/edit";
import ArticleAdd from "@/pages/article/add";
import ArticleCate from "@/pages/articleCate/index";
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
        component: ArticleEdit,
      },
      {
        title: "文章添加",
        name: "list",
        path: "add",
        hidden: true,
        component: ArticleAdd,
      },
      {
        title: "文章列表",
        name: "list",
        path: "/list",
        component: Article,
      },
      {
        title: "文章分类",
        name: "list",
        path: "cate",
        component: ArticleCate,
      },
    ],
  },
];

export default routes;
