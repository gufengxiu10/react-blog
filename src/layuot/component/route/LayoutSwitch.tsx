import React from "react";
import { routes as routesInterface } from "@/types/Routes";
import Routes from "@/route";
import { Route } from "react-router-dom";
import RoutesGuard from "@/component/RouteGuard";

export default class LayoutSwitch extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  private base = (): JSX.Element[] => {
    return Routes.map((item: routesInterface, index: number): JSX.Element => {
      const key = "switch" + index;
      return item.childer === undefined
        ? this.once(key, item)
        : this.child(key, item);
    });
  };

  private once = (key: string, item: routesInterface): JSX.Element => {
    const path = this.props.path([item.path]);
    const config: object = {
      component: item.component,
      route: [item],
      tagChange: this.props.brand,
    };
    console.log(key);
    return (
      <Route
        path={path}
        key={key}
        render={(prpos: any) => <RoutesGuard {...prpos} {...config} />}
      ></Route>
    );
  };

  private child = (key: string, item: routesInterface): JSX.Element => {
    const Html = item.childer?.map((value: routesInterface, index: number) => {
      const ckey = key + index;
      const path = this.props.path([item.path, value.path]);
      const config: object = {
        component: value.component,
        route: [item, value],
        tagChange: this.props.brand,
      };
      return (
        <Route
          path={path}
          render={(prpos: any) => <RoutesGuard {...prpos} {...config} />}
          key={ckey}
        ></Route>
      );
    });
    console.log(Html)
    return Html === undefined ? <></> : <>{Html}</>;
  };

  render = () => {
    return <>{this.base()}</>;
  };
}
