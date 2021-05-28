import React from "react";
import { Layout, Breadcrumb } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import LayoutRoute from "@/layuot/Route";

const { Header, Content, Footer, Sider } = Layout;
interface state {
  collapsed: boolean | undefined;
  breadItem: any;
  breadItemCurrent: any;
}

export default class LayoutBase extends React.Component {
  public state: state;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    console.log(this.props);
    this.state = {
      collapsed: false,
      breadItem: <ul></ul>,
      breadItemCurrent: null,
    };
    this.onCollapse = this.onCollapse.bind(this);
    this.brand = this.brand.bind(this);
  }

  onCollapse(collapsed: boolean) {
    this.setState({ collapsed });
  }

  brand = (item: Array<string>) => {
    const bitem = item.map((item: string, index: number) => {
      return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
    });
    this.setState({
      breadItem: <Breadcrumb style={{ margin: "16px 0" }}>{bitem}</Breadcrumb>,
    });
  };

  render = () => {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }} id="components-layout-demo-side">
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <LayoutRoute type="menu" brand={this.brand} />
          </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              {this.state.breadItem}
              <LayoutRoute type="switch" brand={this.brand} />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  };
}
