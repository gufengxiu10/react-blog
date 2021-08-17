import React from "react";


export default class Images extends React.Component<any, any>{

    constructor(props: any) {
        super(props)
        this.state = {}
        console.log(this.props);

    }

    render = () => {
        return <><img
            src='https://source.unsplash.com/random'
            style={{ width: '100%', height: "100%" }}
            alt=""
        /></>
    }
}