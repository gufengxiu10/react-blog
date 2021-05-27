import React from "react";
import { routes as routesInterface } from "@/types/Routes";
import Routes from "@/route";
import { Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

export default class LayoutMenu extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);
  }

  route = (): JSX.Element[] => {
    return Routes.map((item: routesInterface, key: number) => {
      let menuKey: string = "meun" + key;
      return item.childer !== undefined
        ? this.routeChild(menuKey, item)
        : this.routeOnce(menuKey, item);
    });
  };

  private routeOnce = (key: string, item: routesInterface): JSX.Element => {
    const path = this.props.path([item.path]);
    return (
      <Menu.Item key={key}>
        <Link to={path}>{item.title}</Link>
      </Menu.Item>
    );
  };

  private routeChild = (key: string, routs: routesInterface): JSX.Element => {
    const itemChild = routs.childer?.map(
      (item: routesInterface, index: number) => {
        const childKey = key + index;
        if (item.hidden === true) {
          return (
            <Menu.Item key={childKey} style={{ display: "none" }}></Menu.Item>
          );
        }

        const path = this.props.path([routs.path, item.path]);
        return (
          <Menu.Item key={childKey}>
            <Link to={path}>{item.title}</Link>
          </Menu.Item>
        );
      }
    );
    return (
      <SubMenu key={key} title={routs.title}>
        {itemChild}
      </SubMenu>
    );
  };

  render = () => {
    return (
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {this.route()}
      </Menu>
    );
  };
}
