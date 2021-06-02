import React from "react";
import { Form, Input, Row, Col, Select, Radio, Image, Button } from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";
import FromHeader from "../../component/FromHeader";
import axios from "axios";
const { Option } = Select;

export default class list extends React.Component<any, any> {
  public state: any = {
    data: {},
  };

  constructor(props: any) {
    super(props);
    console.log(this);
    this.save = this.save.bind(this);
  }

  componentDidMount = () => {
    this.info();
  };

  info = async () => {
    const {
      route: { match },
    } = this.props;
    const data = await axios.get("/article/" + match.params.id);
    console.log(data);
    this.setState({ data: data.data });
  };

  save = async () => {
    const {
      route: { match },
    } = this.props;
    const resut = await axios.put(
      "/article/" + match.params.id,
      this.state.data
    );
    console.log(resut);
  };

  render = () => {
    const children: Array<any> = [];
    for (let i = 10; i < 36; i++) {
      children.push(
        <Option key={i.toString(36) + i} value={i}>
          {i.toString(36) + i}
        </Option>
      );
    }

    const header = {
      title: "编辑",
      subTitle: "编辑副标题",
      extra: [
        <Button key="3">重置</Button>,
        <Button key="1" type="primary" onClick={this.save}>
          保存
        </Button>,
      ],
      onBack: (props: any) => {
        console.log(props);
      },
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
      execute: (editor: any, selection: any, position: any) => {
        console.log(editor, selection, position);
      },
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
                    <Form.Item label="分类">
                      <Select defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="标签">
                      <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Tags Mode"
                      >
                        {children}
                      </Select>
                      ,
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="分类">
                      <Radio.Group value={1}>
                        <Radio value={1}>原创</Radio>
                        <Radio value={2}>转载</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="评论">
                      <Radio.Group value={1}>
                        <Radio value={1}>开启</Radio>
                        <Radio value={2}>关闭</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="是否发布">
                      <Radio.Group value={1}>
                        <Radio value={1}>发布</Radio>
                        <Radio value={2}>下架</Radio>
                      </Radio.Group>
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
