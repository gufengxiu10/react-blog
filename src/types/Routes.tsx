export interface routes {
  title: string;
  name: string;
  path: string;
  component?: any;
  hidden?: boolean;
  childer?: Array<routes>;
}
