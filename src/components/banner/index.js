import  React, { Component } from 'react';
import { Carousel, Spin, Row, Col  } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { getSongBanner } from '../../api';
import { withRouter } from 'react-router-dom'
import './index.scss'

class Banner extends Component {

    constructor(props){
        super(props);
        this.state={
            indexBanner: 0,//当前显示轮播图的引索,默认为第一张
            banners: [],
        }
    }

    componentDidMount() {
        getSongBanner().then( (res)=>{
            //请求轮播图数据,通过getBannerFunc函数给回到
            if(res.data.code === 200) {
                this.state.banners = [...res.data.banners];
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        })

    }

    handleClick = (targetId) => {
        this.props.history.push(`/game?id=${targetId}`)
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
            indexBanner: current
        })
    };

    render() {
        const banners = this.state.banners.length > 0
            ?
            this.state.banners.map( (item, index) => {
                return (
                    <div className={`indexBanner`} key={item.picUrl} style={{height:"300px"}}>
                        <div>
                            {
                                item.picUrl
                                    ?
                                    <img
                                        src={item.picUrl}
                                        alt={item.name}
                                        onClick={ ()=>this.handleClick(item.id) }
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
            <div style={{ position:"relative",paddingTop:"30px",minWidth:"990px", marginTop:"30px"}} className={`indexBanner${this.state.indexBanners}`}>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div style={{ height:"336px" }}>

                            <div className='leftArrow' onClick={ ()=>this.prevImg() }>
                                <LeftOutlined style={{ fontSize:"40px",color:"#fff",width:"40px",height:"70px" }}/>
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
                                <RightOutlined style={{ fontSize:"40px",color:"#fff",width:"40px",height:"70px" }}/>
                            </div>

                        </div>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        )
    }

}

export default withRouter(Banner)
