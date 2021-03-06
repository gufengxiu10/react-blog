import React from "react";

import { Button, Popconfirm, Image, message, Dropdown, Menu, Tag, Spin } from "antd";
import { Link } from "react-router-dom";
import bg from "@/static/images/articlebg.png";
import moment from "moment";
import {
  FieldTimeOutlined,
  TagOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
export default class ListItem extends React.Component<any, any> {
  public state = {
    password: 0,
    passwordInput: "none",
    spin: true,
    data: {},
  };

  time: string = "1997-01-01";
  url: string = "/article/list";


  constructor(props: any) {
    super(props);
    this.time = moment.unix(this.props.item.create_time).format("gggg-M-DD");
    this.url = "/article/id/" + this.props.item.id;
  }


  loadImg = () => {

  }

  tableColumnDel = (key: any) => {
    this.setState({ tableSpinLoading: true });
    setTimeout(() => {
      const d = this.props.data.filter(
        (item: any) => Number(item.key) !== Number(key)
      );
      this.props.del(d);
      message.success("删除成功");
      this.setState({ tableSpinLoading: false });
    }, 3000);
  };

  getRandomColor() {
    return (
      "#" +
      ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6)
    );
  }

  del = (id: number): void => { };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );

    let cateElement: JSX.Element = <></>;
    if (this.props.item.cate !== undefined) {
      const cate = (
        <Tag color={this.getRandomColor()}>{this.props.item.cate.name}</Tag>
      );
      cateElement = (
        <div className="cate">
          <SafetyCertificateOutlined />
          <span style={{ marginLeft: "5px" }}>{cate}</span>
        </div>
      );
    }

    let tagElement: any = <></>;
    if (this.props.item.tag !== undefined) {
      const tag = this.props.item.tag.map((i: any) => (
        <Tag color={this.getRandomColor()} key={i.id}>{i.name}</Tag>
      ));

      tagElement = (
        <div className="tag">
          <TagOutlined />
          <span style={{ marginLeft: "5px" }}>{tag}</span>
        </div>
      );
    }

    return (
      <>
        <div className="item">
          <div className="img">
            {/* <div style={{ width: "100%", height: 500, position: "relative", textAlign: 'center', lineHeight: "500px" }}>
              <div className="img-bg" style={{ backgroundColor: "#333", width: "100%", height: "100%", position: 'absolute', top: 0, zIndex: 1 }}></div>
              <Spin size="large" style={{ textAlign: "center", position: 'absolute', zIndex: 2, top: "calc(50% - 23px)" }} />
            </div> */}
            <Image
              height={500}
              src={
                this.props.item.main_image != null
                  ? this.props.item.main_image
                  : bg
              }
            />
          </div>
          <div className="body">
            <div className="title">
              <h1>{this.props.item.title}</h1>
            </div>
            {/* <div className="content">
              {this.props.item.subtitle}
            </div> */}
            <div className="footer">
              <div className="tool">
                <Button.Group>
                  <Button size="small" style={{ color: "#0000EE" }}>
                    <Link to={this.url}>编辑</Link>
                  </Button>
                  <Popconfirm
                    title="是否删除此文章"
                    onConfirm={() => this.props.del(this.props.item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button size="small" style={{ color: "red" }}>
                      删除
                    </Button>
                  </Popconfirm>

                  <Dropdown.Button overlay={menu} size="small">
                    其他操作
                  </Dropdown.Button>
                </Button.Group>
              </div>
              <div className="title">
                <FieldTimeOutlined />
                <span style={{ marginLeft: "5px" }}>{this.time}</span>
              </div>
              {tagElement}
              {cateElement}
            </div>
          </div>
        </div>
      </>
    );
  }
}
