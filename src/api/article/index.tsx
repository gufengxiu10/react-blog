import {
  lists,
  info as ArticleInfo,
  save as ArticleSave,
  add as ArticleAdd,
  del as ArticleDel,
} from "./Article";
import { lists as CateList, update as CateUdate } from "./cate";
import { lists as TagList } from "./Tag";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  lists,
  CateList,
  ArticleInfo,
  ArticleSave,
  ArticleAdd,
  ArticleDel,
  TagList,
  CateUdate
};
