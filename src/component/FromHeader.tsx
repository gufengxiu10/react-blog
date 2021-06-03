import React from "react";
import { PageHeader } from "antd";
export default class FromHeader extends React.Component<any, any> {
  public state: {} = {};
  constructor(props: any) {
    super(props);
  }

  onBack = () => {
    if (
      this.props.header === undefined ||
      this.props.header.onBack === undefined
    ) {
      return null;
    }
    this.props.route.history.goBack();
  };

  render = () => {
    if (this.props.header !== undefined) {
      return (
        <>
          <PageHeader
            {...this.props.header}
            onBack={this.onBack}
            style={{
              background: "#fff",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {this.props.children}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {this.props.children}
          </div>
        </>
      );
    }
  };
}
