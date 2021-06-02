import React from "react";
import { routes as routesInterface } from "@/types/Routes";
import Routes from "@/routes";
import { Route } from "react-router-dom";
import RoutesGuard from "@/component/RouteGuard";

export default class LayoutSwitch extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  private base = (): JSX.Element[] => {
    return Routes.map((item: routesInterface, index: number): JSX.Element => {
      const key = "switch" + index;
      const Html =
        item.childer === undefined
          ? this.once(key, item)
          : this.child(key, item);

      return <div key={key}>{Html}</div>;
    });
  };

  private once = (key: string, item: routesInterface): JSX.Element => {
    const path = this.props.path([item.path]);
    const config: object = {
      component: item.component,
      route: [item],
      tagChange: this.props.brand,
      value: item,
    };
    return (
      <Route
        path={path}
        key={key}
        render={(prpos: any) => (
          <RoutesGuard {...prpos} {...this.props} {...config} />
        )}
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
        value: value,
      };
      return (
        <Route
          path={path}
          render={(prpos: any) => {
            return <RoutesGuard {...prpos} {...this.props} {...config} />;
          }}
          key={ckey}
        ></Route>
      );
    });
    return Html === undefined ? <></> : <>{Html}</>;
  };

  render = () => {
    return <>{this.base()}</>;
  };
}
