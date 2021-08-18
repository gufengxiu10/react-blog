import { DatePicker, Select } from "antd";
import React from "react";
import LazyLoad from "react-lazyload";
import './index.scss';
import locale from 'antd/es/date-picker/locale/zh_CN';
import Macy from 'macy'
import axios from "axios";
const { Option } = Select;

export default class Index extends React.Component<any, any>{

    myRef: any;

    constructor(props: any) {
        super(props);
        this.state = {
            pixiv: []
        }
        this.myRef = React.createRef();
    }


    componentDidMount = async () => {
        const response = await axios.get('/api/pixiv');
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

    }

    componentDidUpdate = () => {
        this.getMacy();
    }


    getMacy = () => {
        const current = this.myRef.current;
        const children = current.children;
        const width = current.offsetWidth;
        const itemWidth = 280;
        const gap = 10;
        const column = parseInt((width / (itemWidth + gap)).toString());
        let height: Array<any> = [];
        this.state.pixiv.forEach((item: any, index: number) => {
            if (index < column) {
                children[index].style.top = 0;
                children[index].style.left = index * (itemWidth + gap) + 'px';
                height.push(children[index].offsetHeight + gap)
            } else {
                let minHeight = height[0];
                let minIndex: any = 0;
                for (let j = 0; j < height.length; j++) {
                    if (height[j] < minHeight) {
                        minIndex = j;
                    }
                }

                children[index].style.top = height[minIndex] + 'px';
                children[index].style.left = children[minIndex].offsetLeft + 'px';
                height[minIndex] += children[index].offsetHeight + gap
            }
        });

        //选择排序
        let maxHeight = height[0];
        let maxIndex = 0;
        console.log(height)
        for (let j = 0; j < height.length; j++) {
            if (height[j] > maxHeight) {
                maxIndex = j;
                maxHeight = height[j]
            }
        }

        console.log(height[maxIndex])
        this.myRef.current.style.height = height[maxIndex] + 'px'
        current.style.width = itemWidth * column + "px"
    }

    render = () => {
        const imgItem = this.state.pixiv.map((item: any, index: any) => {
            return <div className="item" key={index} style={{ height: item.height }}>
                <img src={item.url} alt={item.alt} onError={(e: any) => {
                    this.setState({
                        pixiv: this.state.pixiv.filter((d: any) => d.id === item.id ? false : true)
                    })
                }} />
            </div>
        })

        return <>
            <div className="header">
                <Select defaultValue="pixivz" style={{ width: 120 }}>
                    <Option value="pixivz">pixivz</Option>
                </Select>
                <DatePicker locale={locale} />
            </div>
            <div className="macy" >
                <div id="box" ref={this.myRef}>
                    {imgItem}
                </div>
            </div>
        </>;
    }
}