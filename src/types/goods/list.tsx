export interface tableData {
  goodsName: string;
  url: string;
  id: number;
  key: string;
  model: string;
  cate: string;
}

export interface state {
  data: Array<tableData>;
  spanLabelStyle: object;
  tableSpinLoading: boolean;
}
