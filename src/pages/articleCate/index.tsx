import React from "react";
import { Button, Table, Modal, Input, Form } from "antd";
import Api from "@/api/article";
export default class Index extends React.Component<any, any> {
  columns = [
    {
      title: "分类名",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "状态",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 80,
    // },
    {
      title: "操作",
      dataIndex: "address",
      key: "address",
      width: 150,
      render: (_: any, item: any) => {
        return (
          <>
            <Button.Group size="small">
              <Button type="primary" onClick={(e: any) => {
                this.setState((state: any, props: any) => {
                  return {
                    isModalVisible: true,
                    model: {
                      name: item.name,
                      id: item.id
                    }
                  }
                })
              }}>编辑</Button>
              <Button danger>删除</Button>
            </Button.Group>
          </>
        );
      },
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false,
      model: {}
    };
  }

  componentDidMount = () => {
    this.lists();
  };

  lists = async () => {
    const { data } = await Api.CateList();
    this.setState({
      data: data.map((item: any) => {
        item.key = item.id;
        return item;
      }),
    });
  };

  render = () => {
    return (
      <>
        <Table
          dataSource={this.state.data}
          columns={this.columns}
          bordered
          pagination={false}
        />
        <>
          <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={() => console.log(1)} onCancel={() => this.setState((state: any, props: any) => {
            return {
              isModalVisible: false
            }
          })}>
            <Form>
              <Form.Item label="分类名">
                <Input value={this.state.model.name} />
                <Input hidden value={this.state.model.id} />
              </Form.Item>
            </Form>
          </Modal>
        </>
      </>
    );
  };
}
