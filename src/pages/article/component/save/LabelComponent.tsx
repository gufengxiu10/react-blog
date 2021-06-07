import React from "react";
import axios from "axios";
import { Select, Form } from "antd";
const { Option } = Select;
export default class LabelComponent extends React.Component<any> {
  public state: {
    element: JSX.Element;
    data: Array<any>;
  } = {
    element: <></>,
    data: [],
  };

  constructor(props: any) {
    super(props);
    this.getInfo();
  }

  getInfo = async () => {
    const { data } = await axios.get("/article/tag");
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
      <Form.Item>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Tags Mode"
          value={this.props.value}
          onChange={(e) => this.props.onChange(e)}
        >
          {element}
        </Select>
      </Form.Item>
    );
  };
}
