import React from "react";
import { tableData, state } from "../../types/goods/list";
import { Link } from "react-router-dom";
import {
  Table,
  Image,
  Row,
  Col,
  Button,
  Space,
  Popconfirm,
  message,
  Spin,
} from "antd";
const { Column } = Table;

export default class list extends React.Component<any, any> {
  public state: state = {
    data: [
      {
        key: "1",
        id: 2,
        goodsName: "联想启天M428商用台式机电脑[i5-9500 8G 1T DVDW DOS]单主机",
        model: "启天M428",
        cate: "通用台式计算机",
        url: "https://picsum.photos/200/200",
      },
      {
        key: "2",
        id: 3,
        goodsName: "联想启天M428商用台式机电脑[i5-9500 8G 1T DVDW DOS]单主机",
        model: "启天M428",
        cate: "通用台式计算机",
        url: "https://picsum.photos/200/200",
      },
      {
        key: "3",
        id: 4,
        goodsName: "联想启天M428商用台式机电脑[i5-9500 8G 1T DVDW DOS]单主机",
        model: "启天M428",
        cate: "通用台式计算机",
        url: "https://picsum.photos/200/200",
      },
      {
        key: "4",
        id: 5,
        goodsName: "联想启天M428商用台式机电脑[i5-9500 8G 1T DVDW DOS]单主机",
        model: "启天M428",
        cate: "通用台式计算机",
        url: "https://picsum.photos/200/200",
      },
    ],
    spanLabelStyle: {
      width: "150px",
    },
    tableSpinLoading: false,
  };

  constructor(props: any) {
    super(props);
    this.tableColumnDel = this.tableColumnDel.bind(this);
  }

  tableColumnDel(key: string) {
    this.setState({ tableSpinLoading: true });
    setTimeout(() => {
      this.setState({
        data: this.state.data.filter(
          (item: tableData) => Number(item.key) != Number(key)
        ),
      });
      message.success("删除成功");
      this.setState({ tableSpinLoading: false });
    }, 3000);
  }

  render() {
    return (
      <Spin spinning={this.state.tableSpinLoading}>
        <Table
          dataSource={this.state.data}
          bordered
          key="table"
          expandable={{
            expandedRowRender: (record: tableData) => (
              <>
                <Row
                  gutter={{
                    xl: 20,
                  }}
                >
                  <Col xl={4}>
                    <Image src={record.url} />
                  </Col>
                  <Col xl={20}>
                    <Row gutter={[16, 40]}>
                      <Col span={24}>
                        <Space>
                          <label style={this.state.spanLabelStyle}>
                            商品名:
                          </label>
                          <Space>{record.goodsName}</Space>
                        </Space>
                      </Col>
                    </Row>
                    <Row gutter={[16, 40]}>
                      <Col span={8}>
                        <Space>
                          <label style={this.state.spanLabelStyle}>型号:</label>
                          <Space>{record.model}</Space>
                        </Space>
                      </Col>
                      <Col span={8}>
                        <Space>
                          <label style={this.state.spanLabelStyle}>分类:</label>
                          <Space>{record.cate}</Space>
                        </Space>
                      </Col>
                      <Col span={8}>
                        <Space>
                          <label style={this.state.spanLabelStyle}>品牌:</label>
                          <Space>{record.cate}</Space>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            ),
          }}
        >
          <Column title="ID" dataIndex="id" key="id" width={80} />
          <Column title="商品名" dataIndex="goodsName" key="goodsName" />
          <Column
            title="操作"
            dataIndex="id"
            key="tool"
            width={120}
            render={(key: any, record: any) => {
              return (
                <Button.Group>
                  <Button size="small">
                    <Link to="/goods/save">编辑</Link>
                  </Button>
                  <Popconfirm
                    title="是否删除当前商品？"
                    onConfirm={() => this.tableColumnDel(record.key)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button size="small" danger>
                      删除
                    </Button>
                  </Popconfirm>
                </Button.Group>
              );
            }}
          />
        </Table>
      </Spin>
    );
  }
}
