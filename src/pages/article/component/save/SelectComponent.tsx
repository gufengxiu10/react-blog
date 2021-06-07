import React from "react";
import axios from "axios";
import { Select, Form } from "antd";
const { Option } = Select;

export default class SelectComponent extends React.Component<any> {
  public state: {
    value: number;
    data: Array<any>;
  } = {
    value: this.props.value,
    data: [],
  };

  constructor(props: any) {
    super(props);
    this.getInfo();
  }

  getInfo = async () => {
    const { data } = await axios.get("/article/cate");
    this.setState({ data: data.data });
  };

  render = () => {
    const element = this.state.data.map((item: any, key: number) => {
      return (
        <Option key={key} value={item.id}>
          {item.name}
        </Option>
      );
    });

    return (
      <Form.Item label="分类">
        <Select
          style={{ width: "100%" }}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e)}
        >
          {element}
        </Select>
      </Form.Item>
    );
  };
}
