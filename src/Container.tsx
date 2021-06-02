import React from "react";
import { connect } from "react-redux";
import Layout from "@/layuot/Index";
import container from "@/container/index2";
// 使用 connect 高阶组件对 Counter 进行包裹
// export default connect(container.state)(Layout);
export default class Gloadt extends React.Component {
  render = () => {
    const Html = connect(container.state)(Layout);
    return <Html />;
  };
}
