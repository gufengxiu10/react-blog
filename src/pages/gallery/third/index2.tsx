import { DatePicker, Select } from "antd";
import React from "react";
import LazyLoad from "react-lazyload";
import './index.scss';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from "axios";
const { Option } = Select;

export default class MovieItem extends React.Component<any> {

    public nv: any;

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // When the component is mounted, add your DOM listener to the "nv" elem.
        // (The "nv" elem is assigned in the render function.)

    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        this.nv.removeEventListener("nv-enter", this.handleNvEnter);
    }

    // Use a class arrow function (ES7) for the handler. In ES6 you could bind()
    // a handler in the constructor.
    handleNvEnter = (event: any) => {
        console.log("Nv Enter:", event);
    }

    load = (e: any) => {
        const url: string = e.target.getAttribute('src');
        const request = new XMLHttpRequest();
        request.responseType = 'blob';
        request.open('get', '/api/pixiv/img?url=' + url, true);
        request.onreadystatechange = (response: any) => {
            const blob = new Blob([request.response])
            const ou = URL.createObjectURL(blob)
            e.target.src = ou
        }
        request.send();
    }

    render() {
        // Here we render a single <div> and toggle the "aria-nv-el-current" attribute
        // using the attribute spread operator. This way only a single <div>
        // is ever mounted and we don't have to worry about adding/removing
        // a DOM listener every time the current index changes. The attrs
        // are "spread" onto the <div> in the render function: {...attrs}
        const attrs = this.props.index === 0 ? { "aria-nv-el-current": true } : {};

        // Finally, render the div using a "ref" callback which assigns the mounted
        // elem to a class property "nv" used to add the DOM listener to.
        return (
            <>
                <img ref={elem => this.nv = elem} className="menu_item nv-default" src="https://pixiv-image.pwp.link/c/540x540_70/img-master/img/2021/08/17/17/59/38/92056053_p0_master1200.jpg" alt="" onError={(e) => this.load(e)} />
            </>
        );
    }

}