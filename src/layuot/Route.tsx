import React from "react";
import LayoutMenu from "@/layuot/component/route/LayoutMenu";
import LayoutSwitch from "@/layuot/component/route/LayoutSwitch";
import { Breadcrumb } from "antd";
export default class Routes extends React.Component<any> {
  public state: any = {};

  constructor(props: any) {
    super(props);
    const config: Object = {
      path: this.path,
      brand: this.props.brand,
    };
    switch (this.props.type) {
      case "menu":
        this.state.type = <LayoutMenu {...config} />;
        break;
      case "switch":
        this.state.type = <LayoutSwitch {...config} />;
        break;
    }
  }

  private path = (path: Array<string>) => {
    const allPath: string = path
      .map((item: string) => {
        return item
          .split("/")
          .filter((item: any) => item)
          .join("/");
      })
      .join("/");

    return allPath[0] !== "/" ? "/" + allPath : allPath;
  };

  render = () => {
    return <>{this.state.type}</>;
  };
}
