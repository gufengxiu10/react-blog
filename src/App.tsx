import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import Global from "@/Container";

export default class App extends React.Component<any, any> {
  public state: any = {};
  constructor(props: any) {
    super(props);
  }

  render = () => {
    return <Global />;
  };
}
