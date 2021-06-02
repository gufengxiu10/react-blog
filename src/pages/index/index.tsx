import React from "react";
import { Card, Col, Row } from "antd";
import { BookTwoTone } from "@ant-design/icons";
import toolOneImg from "@/static/images/anime-boy-hoodie-blue-eyes-headphones-painting.jpg";
import { url } from "inspector";
class index extends React.Component<any> {
  constructor(prpos: any) {
    super(prpos);
  }

  render = () => {
    return (
      <Row gutter={16}>
        <Col span={12}>
          {/* <Card bordered={true} style={{backgroundImage : `url(${toolOneImg})`}}> */}
          <Card bordered={true}>
            <Row>
              <Col span={20}>Card content</Col>
              <Col span={4}>
                <BookTwoTone style={{ fontSize: 90 }} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    );
  };
}

export default index;
