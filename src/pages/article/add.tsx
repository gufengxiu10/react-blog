import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Radio,
  Button,
  Spin,
  message,
  Modal,
} from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";
import FromHeader from "../../component/FromHeader";
import { connect } from "react-redux";
import SaveLabel from "./component/save/LabelComponent";
import SelectComponent from "./component/save/SelectComponent";
import ArticleApi from "@/api/article";

import UploadImage from "@/component/upload/Image";
import "@/static/style/article/save.scss";

const { confirm } = Modal;

class Add extends React.Component<any, any> {
  public state: {
    data: any;
    originData: any;
    tableSpinLoading: boolean;
  } = {
    data: {
      is_comment: 1,
      is_original: 1,
      is_release: 1,
      is_password: 0,
    },
    originData: {},
    tableSpinLoading: false,
  };

  constructor(props: any) {
    super(props);
    this.save = this.save.bind(this);
    this.restore = this.restore.bind(this);
  }

  save = async () => {
    const {
      route: { match },
    } = this.props;

    confirm({
      title: "是否要保存",
      onOk: async () => {
        Modal.destroyAll();
        const updateData: any = {};
        if (this.state.data.is_password == 0) {
          updateData["password"] = "";
        }

        if (this.state.data.is_original == 1) {
          updateData["author"] = "";
          updateData["url"] = "";
        }

        this.setState({
          data: Object.assign({}, this.state.data, updateData),
        });

        this.setState({ tableSpinLoading: true });
        await ArticleApi.ArticleAdd(
          Object.assign({}, this.state.data, updateData)
        ).then((res: any) => {
          res.code == 200
            ? Modal.confirm({
                title: "是否继续添加？",
                okText: "返回",
                onOk: () => {
                  this.props.route.history.push("/article/list");
                },
                cancelText: "继续",
              })
            : message.error(res.msg);
          this.setState({ tableSpinLoading: false });
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  restore = () => {
    if (this.state.data !== this.state.originData) {
      this.setState({ data: Object.assign({}, this.state.originData) });
    }
  };

  render = () => {
    const header = {
      title: "添加",
      subTitle: "添加副标题",
      extra: [
        <Button key="3" onClick={this.restore}>
          重置
        </Button>,
        <Button key="1" type="primary" onClick={this.save}>
          保存
        </Button>,
      ],
      onBack: () => this.props.route.history.push("/article/list"),
    };
    console.log(this.state);
    let content = "";
    if (this.state.data.content != undefined) {
      content = this.state.data.content;
    }

    return (
      <>
        <Spin spinning={this.state.tableSpinLoading}>
          <FromHeader header={header} route={this.props.route}>
            <Form>
              <Row gutter={16}>
                <Col span={18}>
                  <Form.Item label="标题">
                    <Input
                      value={this.state.data.title}
                      onChange={(e) =>
                        this.setState({
                          data: Object.assign(this.state.data, {
                            title: e.target.value,
                          }),
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="简介">
                    <Input
                      value={this.state.data.subtitle}
                      onChange={(e: any) =>
                        this.setState({
                          data: Object.assign(this.state.data, {
                            subtitle: e.target.value,
                          }),
                        })
                      }
                    />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <SelectComponent
                        onChange={(value: any) => {
                          this.setState({
                            data: Object.assign(this.state.data, {
                              cat_id: value,
                            }),
                          });
                        }}
                        {...{ value: this.state.data.cat_id }}
                      />
                      {/* <Form.Item label="分类">{this.state.cate}</Form.Item> */}
                    </Col>
                    <Col span={12}>
                      <SaveLabel
                        onChange={(value: any) => {
                          console.log(value);
                          this.setState({
                            data: Object.assign(this.state.data, {
                              tag_id: value,
                            }),
                          });
                        }}
                        {...{ value: this.state.data.tag_id }}
                      />
                      {/* <Form.Item label="标签">{this.state.tag}</Form.Item> */}
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="是否原创">
                        <Radio.Group
                          value={this.state.data.is_original}
                          onChange={(e) =>
                            this.setState({
                              data: Object.assign(this.state.data, {
                                is_original: e.target.value,
                              }),
                            })
                          }
                        >
                          <Radio value={1}>原创</Radio>
                          <Radio value={0}>转载</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="评论">
                        <Radio.Group
                          value={this.state.data.is_comment}
                          onChange={(e) =>
                            this.setState({
                              data: Object.assign(this.state.data, {
                                is_comment: e.target.value,
                              }),
                            })
                          }
                        >
                          <Radio value={1}>开启</Radio>
                          <Radio value={0}>关闭</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        display:
                          this.state.data.is_original == 0 ? "block" : "none",
                      }}
                    >
                      <Form.Item label="作者">
                        <Input
                          value={this.state.data.author}
                          onChange={(e) =>
                            this.setState({
                              data: Object.assign(this.state.data, {
                                author: e.target.value,
                              }),
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label="文章出处">
                        <Input
                          value={this.state.data.url}
                          onChange={(e) =>
                            this.setState({
                              data: Object.assign(this.state.data, {
                                url: e.target.value,
                              }),
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="是否发布">
                        <Radio.Group
                          value={this.state.data.is_release}
                          onChange={(e) =>
                            this.setState({
                              data: Object.assign(this.state.data, {
                                is_release: e.target.value,
                              }),
                            })
                          }
                        >
                          <Radio value={1}>发布</Radio>
                          <Radio value={0}>下架</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item label="密码">
                        <Radio.Group
                          value={this.state.data.is_password}
                          onChange={(e) =>
                            this.setState({
                              data: Object.assign(this.state.data, {
                                is_password: e.target.value,
                              }),
                            })
                          }
                        >
                          <Radio value={1}>是</Radio>
                          <Radio value={0}>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        display:
                          this.state.data.is_password == 1 ? "block" : "none",
                      }}
                    >
                      <Form.Item label="密码">
                        <Input
                          value={this.state.data.password}
                          onChange={(e) =>
                            this.setState({
                              data: Object.assign(this.state.data, {
                                password: e.target.value,
                              }),
                            })
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <UploadImage
                    src={this.state.data.main_image}
                    style={{ width: "100%" }}
                    done={(path: string) =>
                      this.setState({
                        data: Object.assign(this.state.data, {
                          main_image: path,
                        }),
                      })
                    }
                  />
                </Col>
              </Row>
              <Form.Item label="内容">
                <MarkdownEditor
                  value={content}
                  onChange={(editor: any, data: any, value: any) =>
                    this.setState({
                      data: Object.assign(this.state.data, {
                        content: value,
                      }),
                    })
                  }
                  visible={true}
                  toolbars={["bold", "italic", "header"]}
                />
              </Form.Item>
            </Form>
          </FromHeader>
        </Spin>
      </>
    );
  };
}

export default connect(null)(Add);
