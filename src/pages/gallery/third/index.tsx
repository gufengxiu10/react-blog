import { DatePicker, Select, Spin } from "antd";
import React from "react";
// import Content from "@/component/Content"
import LazyLoad from "react-lazyload";
// import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';
import locale from 'antd/es/date-picker/locale/zh_CN';
// import Images from "./Images"
import Macy from 'macy'
import axios from "axios";
const { Option } = Select;
// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class Index extends React.Component<any, any>{

    myRef: any;

    constructor(props: any) {
        super(props);
        this.state = {
            pixiv: []
        }
        this.myRef = React.createRef();
    }


    componentDidMount = () => {

        if (this.myRef) {
            window.addEventListener('scroll', (item: any) => {
                console.log(window.document.querySelector('.macy')?.clientHeight)
            });
        }

        axios.get('/api/pixiv').then((response: {
            data: any
        }) => {
            const { data } = response;
            this.setState({
                pixiv: data.data.illusts.filter((item: any) => item.type === 'illust' ? true : false).map((item: any) => {
                    const height = parseInt((280 / item.width * item.height).toString());
                    const data = {
                        height: height,
                        url: item.image_urls.medium.replace('i.pximg.net', 'pixiv-image-lv.pwp.link'),
                        alt: item.title,
                        id: item.id
                    }
                    return data;
                })
            })
            this.getMacy()
        });
    }

    getMacy = () => {
        if (this.state.masonry) {
            this.state.masonry.reInit()
        } else {
            let masonry = new Macy({
                container: '.macy-container', // 图像列表容器
                trueOrder: false,
                waitForImages: true,
                useOwnImageLoader: false,
                debug: true,
                margin: { x: 13, y: 4 },    // 设计列与列的间距
                columns: 3,    // 设置列数
            })
            this.setState({ masonry })
        }
    }

    render = () => {
        const imgItem = this.state.pixiv.map((item: any, index: any) => {
            return <div className="item" key={index} style={{ height: item.height }}>
                <LazyLoad>
                    <img src={item.url} alt={item.alt} onError={(e: any) => {
                        this.setState({
                            pixiv: this.state.pixiv.filter((d: any) => d.id === item.id ? false : true)
                        })
                    }} />
                </LazyLoad>
            </div>
        })

        if (this.state.masonry) {
            this.state.masonry.reInit()
        }

        return <>
            <div className="header">
                <Select defaultValue="pixivz" style={{ width: 120 }}>
                    <Option value="pixivz">pixivz</Option>
                </Select>
                <DatePicker locale={locale} />
            </div>
            <div className="macy">
                <div className="macy-container">
                    {imgItem}
                </div>
                <div className="loading" ref={this.myRef}>
                    加载中
                </div>
            </div>
        </>;
    }
}