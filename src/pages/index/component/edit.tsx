import React from "react";
import { connect } from "react-redux";
class Edit extends React.Component<any> {
  constructor(prpos: any) {
    super(prpos);
  }

  render = () => {
    return <div>{this.props.git.count}</div>;
  };
}

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(Edit);
