import React from "react";
import { Data, State } from "./type/index.type";
import {
  Table,
  Popconfirm,
  Button,
  message,
  Spin,
  Row,
  Col,
  Image,
  Select,
  Input,
  Dropdown,
  Menu,
  Tag,
} from "antd";
import {
  FieldTimeOutlined,
  TagOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FromHeader from "@/component/FromHeader";
import ArticleApi from "@/api/article";
import "@/static/style/article/Index.scss";
import bg from "@/static/images/articlebg.png";
import moment from "moment";
import { ListItem } from "./component";
class Article extends React.Component<any> {
  public state: {
    visible: boolean;
    data: Array<any>;
    dataELement: JSX.Element;
    cate: Array<any>;
    tableSpinLoading: boolean;
    search: {};
  } = {
    visible: false,
    data: [],
    cate: [],
    dataELement: <></>,
    tableSpinLoading: false,
    search: {
      key: "name",
      keyValue: "",
      cate: "",
    },
  };

  constructor(props: {}) {
    super(props);
    this.modalShow = this.modalShow.bind(this);
    this.modalHide = this.modalHide.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.list();
  }

  modalShow() {
    this.setState({ visible: true });
  }

  modalHide() {
    this.setState({ visible: false });
  }

  list() {
    axios.all([ArticleApi.lists(), ArticleApi.CateList()]).then(
      axios.spread((lists, cate) => {
        const { data: articleData }: any = lists;
        const { data: cateData }: any = cate;

        articleData.forEach((item: Data) => (item.key = item.id));
        this.setState({
          data: articleData,
          cate: cateData,
        });
      })
    );
  }

  // 搜索
  search = async () => {
    this.setState({
      tableSpinLoading: true,
    });
    const { data } = await ArticleApi.lists(this.state.search);
    data.forEach((item: Data) => (item.key = item.id));
    this.setState({
      tableSpinLoading: false,
      data: data,
    });
  };

  del = (id: number) =>
    this.setState({
      data: this.state.data.filter((item: any) => item.id != id),
    });

  render() {
    const item = this.state.data.map((item) => (
      <ListItem item={item} del={this.del} />
    ));
    return <>{item}</>;
  }
}

export default connect()(Article);
