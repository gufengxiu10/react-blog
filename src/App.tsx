import React from "react";
import "./App.css";
import Layout from "@/layuot/Index";
import "antd/dist/antd.css";

export default class App extends React.Component<any, any> {
  public state: any = {};
  constructor(props: any) {
    super(props);
    this.state.context = React.createContext({});
    this.state.contextValue = {
      dd: () => {
        console.log(1);
      },
    };
  }

  render = () => {
    const Context = this.state.context;
    return (
      <>
        <Context.Provider value={this.state.contextValue}>
          <Layout />
        </Context.Provider>
      </>
    );
  };
}
