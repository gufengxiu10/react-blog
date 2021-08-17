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

    constructor(props: any) {
        super(props);
        this.state = {
            'pixiv': []
        }
    }


    componentDidMount = () => {
        axios.get('/api/pixiv').then((response: {
            data: any
        }) => {
            const { data } = response;
            this.setState({
                pixiv: data.data.illusts.map((item: any) => {
                    // console.log(280 / item.width * item.height)
                    const height = parseInt((280 / item.width * item.height).toString());
                    const data = {
                        height: height,
                        url: 'https://picsum.photos/280/' + height
                    }
                    return data;
                })
            })

        });
    }

    getMacy = () => {
        if (this.state.masonry) {
            this.state.masonry.reInit()
        } else {
            let masonry = new Macy({
                container: '.macy-container', // 图像列表容器
                trueOrder: false,
                waitForImages: false,
                useOwnImageLoader: false,
                debug: true,
                margin: { x: 13, y: 4 },    // 设计列与列的间距
                columns: 4,    // 设置列数
            })
            this.setState({ masonry })
        }
    }

    render = () => {
        const imgItem = this.state.pixiv.map((item: any, index: any) => {
            return <div key={index} style={{ backgroundImage: `url(${item.url})`, height: item.height }}>
            </div>

        })
        this.getMacy()
        console.log(imgItem);
        return <>
            <div className="header">
                <Select defaultValue="pixivz" style={{ width: 120 }}>
                    <Option value="pixivz">pixivz</Option>
                </Select>
                <DatePicker locale={locale} />
            </div>
            <div className="macy-container">
                {imgItem}
            </div>
        </>;
    }
}