import React from "react";
import { Button, Table, Modal, Input, Form, message } from "antd";
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

  //列表
  lists = async () => {
    const { data } = await Api.CateList();
    this.setState({
      data: data.map((item: any) => {
        item.key = item.id;
        return item;
      }),
    });
  };

  //更新
  modalOk = async () => {
    if (!(this.state.model.id !== null && this.state.model.name !== null)) {
      return message.error('参数不全');
    }

    await Api.CateUdate(this.state.model.id, {
      name: this.state.model.name
    });

    message.success('更新成功')
    this.setState((state: any, props: any) => {
      return {
        isModalVisible: false,
        data: state.data.map((item: any) => {
          if (item.id === state.model.id) {
            item.name = state.model.name
          }
          return item;
        }),
        model: {
          id: null,
          name: null
        }
      }
    })
  }

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
          <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.modalOk} onCancel={() => this.setState((state: any, props: any) => {
            return {
              isModalVisible: false,
              model: {
                id: null,
                name: null
              }
            }
          })}>
            <Form>
              <Form.Item label="分类名">
                <Input value={this.state.model.name} onChange={(e: any) => this.setState((state: any, props: any) => {
                  return {
                    model: {
                      name: e.target.value,
                      id: state.model.id
                    }
                  }
                })} />
              </Form.Item>
            </Form>
          </Modal>
        </>
      </>
    );
  };
}
