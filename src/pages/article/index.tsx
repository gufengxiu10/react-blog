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
} from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FromHeader from "@/component/FromHeader";
import ArticleApi from "@/api/article";
const { Option } = Select;

class Article extends React.Component<any> {
  public state: {
    visible: boolean;
    data: Array<any>;
    tableSpinLoading: boolean;
    search: {};
  } = {
    visible: false,
    data: [],
    tableSpinLoading: false,
    search: {
      key: "",
    },
  };

  columns: Array<{}> = [
    {
      title: "编号",
      dataIndex: "id",
    },
    {
      title: "标题",
      className: "column-money",
      dataIndex: "title",
    },
    {
      titel: "操作",
      render: (text: Data, row: Data, index: number) => {
        const url = "/article/id/" + row.id;
        return (
          <>
            <Button.Group>
              <Link to={url}>
                <Button type="primary" size="small">
                  编辑
                </Button>
              </Link>
              <Popconfirm
                title="是否删除当前商品？"
                onConfirm={() => this.tableColumnDel(row.key)}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" danger>
                  删除
                </Button>
              </Popconfirm>
            </Button.Group>
          </>
        );
      },
    },
  ];

  constructor(props: {}) {
    super(props);
    this.modalShow = this.modalShow.bind(this);
    this.modalHide = this.modalHide.bind(this);
    this.search = this.search.bind(this);
  }

  contributePost = async () => {
    try {
      await this.props.getList();
    } catch (err) {}
  };

  componentDidMount() {
    this.list();
  }

  modalShow() {
    this.setState({ visible: true });
  }

  modalHide() {
    this.setState({ visible: false });
  }

  async list() {
    const { data } = await ArticleApi.lists();
    console.log(data);
    data.forEach((item: Data) => {
      item.key = item.id;
    });
    this.setState({ data: data });
  }

  tableColumnDel = (key: any) => {
    this.setState({ tableSpinLoading: true });
    setTimeout(() => {
      this.setState({
        data: this.state.data.filter(
          (item: any) => Number(item.key) != Number(key)
        ),
      });
      message.success("删除成功");
      this.setState({ tableSpinLoading: false });
    }, 3000);
  };

  colspan = (item: any) => {
    return (
      <Row>
        <Col span={5}>
          <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
      </Row>
    );
  };

  search = () => {
    this.setState({
      tableSpinLoading: true,
    });
    setTimeout(() => {
      this.setState({
        tableSpinLoading: false,
      });
    }, 3000);
  };

  render() {
    return (
      <FromHeader>
        <Row gutter={16} style={{ marginBottom: 10, padding: "0 10px" }}>
          <Input.Group compact>
            <Select defaultValue="Option1-1">
              <Option value="Option1-1">标题名</Option>
              <Option value="Option1-2">文章ID</Option>
            </Select>
            <Input
              allowClear
              style={{ width: "20%", marginRight: "10px" }}
              defaultValue="0571"
            />
            <Select defaultValue="Option1-1" style={{ width: "20%", marginRight: "10px" }}>
              <Option value="Option1-1">标题名</Option>
              <Option value="Option1-2">文章ID</Option>
            </Select>
            <Button onClick={this.search}>搜索</Button>
          </Input.Group>
          {/* <Input.Group>
            <Input
              allowClear
              style={{ width: "20%", marginRight: "10px" }}
              defaultValue="0571"
            />
            <Input
              allowClear
              style={{ width: "20%", marginRight: "10px" }}
              defaultValue="0571"
            />
            <Button onClick={this.search}>搜索</Button>
          </Input.Group> */}
          {/* <Col span={6}>
            <Button onClick={this.search}>搜索</Button>
          </Col> */}
        </Row>
        <Spin spinning={this.state.tableSpinLoading}>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            bordered
            expandable={{
              expandedRowRender: (item) => this.colspan(item),
              rowExpandable: (record) => true,
            }}
          />
        </Spin>
      </FromHeader>
    );
  }
}

export default connect()(Article);
