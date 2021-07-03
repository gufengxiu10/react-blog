import React from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Radio,
  Image,
  Button,
  Spin,
  message,
  Modal,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MarkdownEditor from "@uiw/react-markdown-editor";
import FromHeader from "../../component/FromHeader";
import axios from "axios";
import { connect } from "react-redux";
import save from "@/actions/article/save";
import SaveLabel from "./component/save/LabelComponent";
import SelectComponent from "./component/save/SelectComponent";
import ArticleApi from "@/api/article";
import bg from "@/static/images/articlebg.png";
const { Info } = save;
const { Option } = Select;
const { confirm } = Modal;

class Save extends React.Component<any, any> {
  public state: {
    data: any;
    originData: any;
    tableSpinLoading: boolean;
  } = {
    data: {},
    originData: {},
    tableSpinLoading: true,
  };

  constructor(props: any) {
    super(props);
    this.save = this.save.bind(this);
    this.restore = this.restore.bind(this);
  }

  componentDidMount = () => {
    this.info();
  };

  info = () => {
    const {
      route: { match },
    } = this.props;
    // match.params.idatch.params.id
    const data: any = axios.all([ArticleApi.ArticleInfo(match.params.id)]).then(
      axios.spread((lists) => {
        const data = Object.assign({}, lists.data);
        if (lists.data.content != undefined) {
          lists.data.content = lists.data.content.name;
        }
        console.log(data);
        this.setState({
          data: data,
          originData: Object.assign({}, data),
        });
        this.setState({ tableSpinLoading: false });
      })
    );
  };

  save = async () => {
    const {
      route: { match },
    } = this.props;

    confirm({
      title: "是否要保存",
      // content: "Some descriptions",
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
        const resut = await axios
          .put(
            "/article/" + match.params.id,
            Object.assign({}, this.state.data, updateData)
          )
          .then((res: any) => {
            const { data } = res;
            data.code == 200
              ? message.success(data.msg)
              : message.error(data.msg);
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
      title: "编辑",
      subTitle: "编辑副标题",
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

    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      onChange(item: any) {},
    };
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
                  <Image
                    src={bg}
                    style={{
                      objectFit: "cover",
                      width: "400p",
                    }}
                  />
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                  ,
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

export default connect(
  (state: any) => {
    return { info: state.article };
  },
  {
    getInfo: (id: number) => Info(id),
  }
)(Save);
