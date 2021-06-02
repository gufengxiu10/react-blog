import React from "react";
import LayoutMenu from "@/layuot/component/route/LayoutMenu";
import LayoutSwitch from "@/layuot/component/route/LayoutSwitch";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider } = Layout;
export default class Routes extends React.Component<any> {
  public state: any = {};
  private config: Object = {};
  constructor(props: any) {
    super(props);
    this.config = {
      path: this.path,
      brand: this.props.brand,
    };

    this.onCollapse = this.onCollapse.bind(this);
    this.brand = this.brand.bind(this);
  }

  componentDidMount = () => {
    setInterval(() => {
      // this.props.onIncrement(90);
    }, 2000);
  };

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

  private path = (path: Array<string>) => {
    const allPath: string = path
      .map((item: string) => {
        console.log(item)
        return item
          .split("/")
          .filter((item: any) => item)
          .join("/");
      })
      .join("/");

    return allPath[0] !== "/" ? "/" + allPath : allPath;
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
            <LayoutMenu {...this.config} {...this.props} />
          </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "20px 16px" }}>
              {this.state.breadItem}
              <LayoutSwitch {...this.config} {...this.props} />
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
