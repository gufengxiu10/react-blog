import React from "react";
import { connect } from "react-redux";
class Add extends React.Component<any> {
  constructor(prpos: any) {
    super(prpos);
  }

  count = () => {
    this.props.type();
  };

  render = () => {
    return <button onClick={this.count}>你好</button>;
  };
}

const ki = (dispatch: any) => {
  return {
    type: () => {
      dispatch({
        type: "bai",
      });
    },
  };
};

export default connect(null, ki)(Add);
