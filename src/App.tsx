import React from "react";
import "./App.css";
import Layout from "@/layuot/Index";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "@/reducer";
import Global from "@/Container";

const store = createStore(reducer);
export default class App extends React.Component<any, any> {
  public state: any = {};
  constructor(props: any) {
    super(props);
  }

  render = () => {
    return (
      <Provider store={store}>
        <Global />
      </Provider>
    );
  };
}
