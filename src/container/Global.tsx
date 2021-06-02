import React from "react";
import { connect } from "react-redux";
import Route from "@/layuot/Route";
import { Dispatch } from "redux";
import { decrement, increment } from "@/actions";
import { StoreState } from "../types";

export default class Gloadt extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  private dispathch = () => {
    return (dispatch: Dispatch) => ({
      onDecrement: () => dispatch(decrement()),
      onIncrement: (id: number) => dispatch(increment(id)),
    });
    // return (dispathch: Dispatch) => {
    //   let object: any = {};
    //   for (let item in this.actions) {
    //     object[item] = dispathch(this.actions[item]);
    //   }
    //   return object;
    // };
  };

  render = () => {
    // 将 reducer 中的状态插入到组件的 props 中
    // const mapStateToProps = (state: StoreState): { value: number } => ({
    //   value: state,
    // });

    // const Html = connect(mapStateToProps, this.dispathch())(Route);
    return <Route />;
  };
}
