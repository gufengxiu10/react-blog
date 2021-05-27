import React from "react";

export default class RouteGuard extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount = () => {
    const {
      history: { replace },
      location,
    } = this.props;

    let breadcrumb: Array<string> = [];
    this.props.route.forEach((item: any) => {
      breadcrumb.push(item.title);
    });
    // if (location.pathname === "/index") replace("/goods/list");
    this.props.tagChange(breadcrumb);
    console.log(this.props);
  };

  render = () => {
    const Html = this.props.component;
    return <Html />;
  };
}