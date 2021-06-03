import React from "react";
import { Form, Input, Row, Col, Select, Radio, Image, Button } from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";
import FromHeader from "../../component/FromHeader";
import axios from "axios";
import { getKeyThenIncreaseKey } from "antd/lib/message";
const { Option } = Select;

export default class list extends React.Component<any, any> {
  public state: any = {
    data: {},
    tag: [],
    cate: "",
  };

  constructor(props: any) {
    super(props);
    this.save = this.save.bind(this);
  }

  componentDidMount = () => {
    this.info();
  };

  info = () => {
    const {
      route: { match },
    } = this.props;

    axios
      .all([
        axios.get("/article/" + match.params.id),
        axios.get("/article/tag"),
        axios.get("/article/cate"),
      ])
      .then(
        axios.spread((lists, tag, cate) => {
          this.setState({ data: lists.data });
          const tagElement = tag.data.data.map((item: any, key: number) => {
            return (
              <Option key={key} value={item.id}>
                {item.name}
              </Option>
            );
          });

          this.setState({
            tag: (
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Tags Mode"
                defaultValue={[]}
              >
                {tagElement}
              </Select>
            ),
          });

          const cateElement = cate.data.data.map(
            (
              item: {
                id: number;
                name: string;
                create_time?: number;
                update_time?: number;
                delete_time?: null | number;
              },
              key: number
            ) => (
              <Option value={item.id} key={key}>
                {item.name}
              </Option>
            )
          );

          this.setState({
            cate: (
              <Select defaultValue={lists.data.cat_id}>{cateElement}</Select>
            ),
          });
        })
      );
  };

  save = async () => {
    const {
      route: { match },
    } = this.props;
    const resut = await axios.put(
      "/article/" + match.params.id,
      this.state.data
    );
  };

  original = () => {
    if (this.state.is_original === 0) {
      return (
        <Col span={24}>
          <Form.Item label="作者">
            <Input />
          </Form.Item>
          <Form.Item label="文章出处">
            <Input />
          </Form.Item>
        </Col>
      );
    }

    return null;
  };
  render = () => {
    const header = {
      title: "编辑",
      subTitle: "编辑副标题",
      extra: [
        <Button key="3">重置</Button>,
        <Button key="1" type="primary" onClick={this.save}>
          保存
        </Button>,
      ],
      onBack: (props: any) => {},
    };

    const title2 = {
      name: "title2",
      keyCommand: "title2",
      icon: (
        <svg width="12" height="12" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M496 80V48c0-8.837-7.163-16-16-16H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.621v128H154.379V96H192c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.275v320H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.621V288H357.62v128H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.275V96H480c8.837 0 16-7.163 16-16z"
          />
        </svg>
      ),
      execute: (editor: any, selection: any, position: any) => {},
    };

    return (
      <>
        <FromHeader header={header} route={this.props.route}>
          <Form>
            <Row gutter={16}>
              <Col span={18}>
                <Form.Item label="标题">
                  <Input
                    value={this.state.data.title}
                    onChange={(e: any) =>
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
                    <Form.Item label="分类">{this.state.cate}</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="标签">{this.state.tag}</Form.Item>
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
                <Image src="https://picsum.photos/400/400" />
              </Col>
            </Row>

            <Form.Item label="内容">
              <MarkdownEditor
                value="Hello Markdown!"
                visible={true}
                toolbars={["bold", "italic", "header", title2]}
              />
            </Form.Item>
          </Form>
        </FromHeader>
      </>
    );
  };
}
