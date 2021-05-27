import GoodsList from "./page/goods/list";
import Index from "./page/index";
import GoodsSave from "./page/goods/save";
import { routes as routesInterface } from "./types/Routes";

const routes: Array<routesInterface> = [
  {
    title: "首页",
    name: "index",
    path: "index",
    component: Index,
  },
  {
    title: "商品管理",
    name: "goods",
    path: "goods",
    childer: [
      {
        title: "商品列表",
        name: "list",
        path: "list",
        component: GoodsList,
      },
      {
        title: "商品编辑",
        name: "list",
        path: "save",
        hidden: true,
        component: GoodsSave,
      },
      {
        title: "商品分类",
        name: "list",
        path: "cate",
        component: GoodsList,
      },
    ],
  },
];

export default routes;
