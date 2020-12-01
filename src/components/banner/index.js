import  React, { Component } from 'react';
import { Carousel, Spin,Icon,Row,Col  } from 'antd';
import 'antd/dist/antd.css'
import { withRouter } from 'react-router-dom'
import './indexBanner.scss'

class IndexBanner extends Component {

    constructor(props){
        super(props);
        this.state={
            indexBanners:0,//当前显示轮播图的引索,默认为第一张
            bannerBgArr:[]//轮播图图片,由于没有背景图的接口数据,这里用图片加上模糊度去模拟
        }
    }

    componentDidMount() {
        getSongBanner().then( (res)=>{
            //请求轮播图数据,通过getBannerFunc函数给回到
            if(res.data.code === 200) {
                console.log(res.data)
                this.state.bannerBgArr = [...res.data.songs];
            }else {
                console.log("你的请求有错误.")
            }
        }).catch( (error)=>{
            console.log( "错位为:",error )
        })
    }

    handleClick = (targetId, type) => {
        this.props.history.push(`/song?id=${targetId}`)
    };

    prevImg = () => {
        //切换上一张图片
        this.banners.prev();
    };

    nextImg = () => {
        //切换下一张图片
        this.banners.next();
    };

    afterChange = (current) => {
        this.setState({
            indexBanners: current
        })
    };

    render() {
        //判断获取到的数据是否为空,不为空则渲染内容,也就是渲染轮播图,为空则渲染null

        const banners = this.props.homeBannerData.length > 0
            ?
            this.props.homeBannerData.map( (item,index) => {
                return (
                    <div className={`indexBanner`} key={item.picUrl} style={{height:"300px"}}>
                        <div>
                            {
                                item.picUrl
                                    ?
                                    <img
                                        src={item.picUrl}
                                        alt={item.name}
                                        onClick={ ()=>this.handleClick(item.id, item.type) }
                                        style={{ width:"730px",height:"300px",margin:'0 auto',cursor:"pointer" }}
                                    />
                                    :
                                    <Spin />
                            }
                        </div>
                    </div>
                )
            })
            :
            <Spin />;



        return (
            <div style={{ position:"relative",marginTop:"30px",minWidth:"990px"}} className={`indexBanner${this.state.indexBanners}`}>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div style={{ height:"336px" }}>

                            <div className='leftArrow' onClick={ ()=>this.prevImg() }>
                                <Icon type="left" style={{ fontSize:"40px",color:"#fff",width:"40px",height:"70px" }} />
                            </div>

                            <Carousel
                                afterChange={ (current)=>this.afterChange(current) }
                                autoplay={true}
                                effect="scrollx"
                                ref={ (middle)=>this.banners=middle }
                                style={{color:"red"}}
                            >
                                {
                                    banners
                                }
                            </Carousel>

                            <div className='rightArrow' onClick={ ()=>this.nextImg() }>
                                <Icon type="right" style={{ fontSize:"40px",color:"#fff",width:"40px",height:"70px" }}/>
                            </div>

                        </div>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        )
    }

}

export default withRouter(IndexBanner)
