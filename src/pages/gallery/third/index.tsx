import { DatePicker, Select, Spin } from "antd";
import React from "react";
import LazyLoad from "react-lazyload";
import './index.scss';
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default class Index extends React.Component<any, any>{

    myRef: any;
    public state: {
        pixiv: any;
        page: number;
        isEnd: boolean
    }

    constructor(props: any) {
        super(props);
        this.state = {
            pixiv: [],
            page: 1,
            isEnd: false,
        }
        this.myRef = React.createRef();
    }


    componentDidMount = () => {
        Object.defineProperty(Image.prototype, 'authsrc', {
            writable: true,
            enumerable: true,
            configurable: true
        })

        window.onload = () => {

        }
        this.info()
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollHeight - document.documentElement.clientHeight - document.documentElement.scrollTop === 0 && this.state.isEnd === false) {
                const page = this.state.page + 1;
                this.setState({ page: page })
                this.info(page);
            }
        })
    }

    componentDidUpdate = () => {
        this.getMacy();
    }

    load = (e: any) => {
        const url: string = e.target.getAttribute('data-src');
        const request = new XMLHttpRequest();
        request.responseType = 'blob';
        request.open('get', '/api/pixiv/img?url=' + url, true);
        request.onreadystatechange = (response: any) => {
            const u = URL.createObjectURL(new Blob([request.response]));
            e.target.setAttribute('data-src', u);
            e.target.src = u
            e.target.style.display = 'block';
            e.target.nextElementSibling.style.display = "none"
        }
        request.send();
    }

    info = async (page = 9) => {
        // var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        //     return t.filter((function(t) {
        //         if (t.restrict || t.x_restrict || t.sanity_level >= 4 || "illust" !== t.type && e || t.title.includes("漫画") && e)
        //             return !1;
        //         if (t.tags && t.tags.length && e)
        //             for (var i = 0; i < t.tags.length; i++)
        //                 if (na.includes(t.tags.name))
        //                     return !1;
        //         return window.pixiviz.infoMap[t.id] || (window.pixiviz.infoMap[t.id] = t),
        //         !0
        //     }
        //     ))
        const response = await axios.get('/api/pixiv?page=' + page);
        const { data } = response;
        const nd = this.state.pixiv
        if (data.data.illusts.length > 0) {
            nd.push(...data.data.illusts.filter((item: any) => {
                if (item.restrict || item.x_restrict || item.type !== 'illust' || item.sanity_level >= 4 || item.title.includes('漫画')) {
                    return false
                }

                let b = true;
                for (let i = 0; i < item.tags.length; i++) {
                    if (item.tags[i].name.includes('漫画')) {
                        b = false;
                        break;
                    }
                }

                return b === true ? true : false;
            }).map((item: any) => {
                const height = parseInt((280 / item.width * item.height).toString());
                const data = {
                    height: height,
                    url: item.image_urls.medium.replace('i.pximg.net', 'pixiv-image-lv.pwp.link'),
                    title: item.title,
                    id: item.id,
                    tag: item.tags
                }
                return data;
            }));

            this.setState({ pixiv: nd })
        } else {
            this.setState({ isEnd: true })
        }

    }

    loading = (e: any) => {
        const img = new Image();
        img.onload = () => {
            if (img.complete === true) {
                e.target.style.display = 'block';
                e.target.parentNode.nextElementSibling.style.display = "none"
            }
        }

        // img.onerror = () => this.load(e)
        img.src = e.target.src;
    }

    render = () => {
        const imgItem = this.state.pixiv.map((item: any, index: any) => {
            return <div className="item" key={index} style={{ height: item.height }}>
                <LazyLoad>
                    <div>
                        <div className="item-img">
                            <img src={item.url} alt={item.alt} onLoad={(e) => this.loading(e)} style={{ display: 'none' }} />
                            <p className="title">{item.title}</p>
                        </div>
                        <div className="loading" style={{ lineHeight: item.height + 'px', 'textAlign': 'center' }}>
                            <Spin indicator={antIcon} />
                        </div>
                    </div>
                </LazyLoad>
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
        for (let j = 0; j < height.length; j++) {
            if (height[j] > maxHeight) {
                maxIndex = j;
                maxHeight = height[j]
            }
        }

        this.myRef.current.style.height = height[maxIndex] + 'px'
        current.style.width = (itemWidth + gap) * column + "px"
    }
}