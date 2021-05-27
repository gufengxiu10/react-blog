import React from "react";

export default class goods extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render = () => {
    return <div>{this.props.value}</div>;
  };
}
