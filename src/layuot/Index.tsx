import React from "react";
import GlobalContainer from "@/container/Global";
interface state {
  collapsed: boolean | undefined;
  breadItem: any;
  breadItemCurrent: any;
}

export default class LayoutBase extends React.Component {
  public state: state;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      collapsed: false,
      breadItem: <ul></ul>,
      breadItemCurrent: null,
    };
  }

  render = () => {
    return <GlobalContainer />;
  };
}
