import React from "react";
import { Data, State } from "./type/index.type";
import { Table, Popconfirm, Button, message, Spin } from "antd";
import axioas from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FromHeader from "@/component/FromHeader";
class Article extends React.Component<any> {
  public state: State = {
    visible: false,
    data: [],
    tableSpinLoading: false,
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
  }

  contributePost = async () => {
    try {
      await this.props.getList();
      console.log(this.props);
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
    const data = await axioas.get("/article");
    data.data.forEach((item: Data) => {
      item.key = item.id;
    });
    this.setState({ data: data.data });
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

  render() {
    return (
      <FromHeader>
        <Spin spinning={this.state.tableSpinLoading}>
          <Table columns={this.columns} dataSource={this.state.data} bordered />
        </Spin>
      </FromHeader>
    );
  }
}

export default connect()(Article);
