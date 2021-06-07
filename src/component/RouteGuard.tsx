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
    // this.props.tagChange(breadcrumb);
  };

  render = () => {
    const route = {
      history: this.props.history,
      location: this.props.history,
      match: this.props.match,
    };

    const Html = this.props.component;
    return <Html route={route} />;
  };
}
