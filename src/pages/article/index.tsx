import React from "react";
import { Data, State } from "./type/index.type";
import axios from "axios";
import { Button, Input, Radio, Select, Row, Col, Skeleton, Empty } from "antd";
import { connect } from "react-redux";
import ArticleApi from "@/api/article";
import { Link } from "react-router-dom";
import { ListItem } from "./component";
import "@/static/style/article/Index.scss";
import "./style/index.scss";

const { Option } = Select;
const { Search } = Input;
class Article extends React.Component<any> {
  public state: {
    visible: boolean;
    data: Array<any>;
    dataELement: JSX.Element;
    cate: Array<any>;
    tableSpinLoading: boolean;
    search: {};
    skeleton: string;
    noData: string;
    item: string;
    tag: Array<any>;
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
      tag: "",
      isOnSale: -1,
      isOriginal: -1,
    },
    skeleton: "block",
    noData: "none",
    item: "block",
    tag: [],
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
    axios
      .all([ArticleApi.lists(), ArticleApi.CateList(), ArticleApi.TagList()])
      .then(
        axios.spread((lists, cate, tag) => {
          const { data: articleData }: any = lists;
          const { data: cateData }: any = cate;
          const { data: tagData }: any = tag;
          articleData.forEach((item: Data) => (item.key = item.id));
          cateData.map((item: any) => (item.key = item.id));
          tagData.map((item: any) => (item.key = item.id));
          this.setState({
            data: articleData,
            cate: cateData,
            skeleton: "none",
            noData: "none",
            tag: tagData,
          });
        })
      )
      .catch((error: any) => {
        this.setState({
          skeleton: "none",
          noData: "block",
        });
      });
  }

  // 搜索
  search = async (searchData: any = {}) => {
    try {
      this.setState({
        skeleton: "block",
        item: "none",
        noData: "none",
      });
      const search: {} = Object.assign(this.state.search, searchData);
      const { data } = await ArticleApi.lists(search);
      this.setState({
        tableSpinLoading: false,
        data: data,
        skeleton: "none",
        noData: data.length > 0 ? "none" : "block",
        item: "block",
        search: search,
      });
    } catch (error) {
      this.setState({
        skeleton: "none",
        noData: "block",
      });
    }
  };

  del = (id: number) => {
    ArticleApi.ArticleDel(id);
    this.setState({
      data: this.state.data.filter((item: any) => item.id != id),
    });
  };

  render() {
    const item = this.state.data.map((item) => (
      <ListItem item={item} del={this.del} key={item.id} />
    ));

    const cate = this.state.cate.map((item) => (
      <Option value={item.id} key={item.id}>
        {item.name}
      </Option>
    ));

    const tag = this.state.tag.map((item: any) => {
      return (
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      );
    });
    return (
      <>
        <div className="header">
          <div className="button">
            <Button.Group>
              <Link to="/article/add">
                <Button type="primary">添加</Button>
              </Link>
              <Button type="primary">重置</Button>
            </Button.Group>
          </div>
          <div className="search">
            <div>
              <Search
                allowClear={true}
                placeholder="关键字"
                enterButton="Search"
                size="large"
                onSearch={(value) => this.search({ keyValue: value })}
              />
            </div>
            <div>
              <Row gutter={10}>
                <Col span={12}>
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="分类"
                    onChange={(value) => this.search({ cate: value })}
                  >
                    {cate}
                  </Select>
                </Col>
                <Col span={12}>
                  <Select
                    style={{ width: "100%" }}
                    allowClear={true}
                    placeholder="标签"
                    onChange={(value) => this.search({ tag: value })}
                  >
                    {tag}
                  </Select>
                </Col>
              </Row>
            </div>
            <div>
              <Row gutter={10}>
                <Col span={12}>
                  <Radio.Group
                    defaultValue={-1}
                    onChange={(e) =>
                      this.search({ isOnSale: e.target.value })
                    }
                  >
                    <Radio.Button value={-1}>默认</Radio.Button>
                    <Radio.Button value={0}>上架</Radio.Button>
                    <Radio.Button value={1}>下架</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col span={12}>
                  <Radio.Group
                    defaultValue={-1}
                    onChange={(e) =>
                      this.search({ isOriginal: e.target.value })
                    }
                  >
                    <Radio.Button value={-1}>默认</Radio.Button>
                    <Radio.Button value={0}>原创</Radio.Button>
                    <Radio.Button value={1}>转载</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="skeleton" style={{ display: this.state.skeleton }}>
            <Skeleton />
          </div>
          <div className="no-data" style={{ display: this.state.noData }}>
            <Empty />
          </div>
          <div style={{ display: this.state.item }}>{item}</div>
        </div>
      </>
    );
  }
}

export default connect()(Article);
