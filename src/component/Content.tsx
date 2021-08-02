import * as React from "react";

export default class Content extends React.Component<any> {

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    render = () => {
        return (
            <div style={Object.assign({ backgroundColor: "#fff", minHeight: 200 }, this.props.style)}>{this.props.children}</div>
        );
    }
}
