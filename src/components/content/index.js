import React,{ Component } from 'react';
import {Row, Col, Card, Spin} from 'antd';
import 'antd/dist/antd.css'
import './index.css'
import './index.scss'

import {withRouter} from "react-router-dom";

import {getSongDiscount, getSongRecommend, getSongLastest } from '../../api';

const { Meta } = Card;


class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discountGames: [],
            recommendGames: [],
            lastestGames: []
        }
    }

    componentDidMount() {
        getSongDiscount().then( (res)=>{
            if(res.data.code === 200) {
                this.setState({
                    discountGames: res.data.discount
                });
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

        getSongRecommend().then( (res)=>{
            if(res.data.code === 200) {
                this.setState({
                    recommendGames: res.data.recommend
                });
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

        getSongLastest().then( (res)=>{
            if(res.data.code === 200) {
                this.setState({
                    lastestGames: res.data.lastest
                });
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

    }

    handleClick = (targetId) => {
        this.props.history.push(`/game?id=${targetId}`)
    };

    render(){

        const discount = this.state.discountGames.length > 0
            ?
            this.state.discountGames.map((item, index) => {
                return (
                    <Col span={6} className='box'>
                        <div className='wrapper' onClick={ ()=>this.handleClick(item.gameId) }>
                            <Row>
                                <img style={{ width:'100%',height:'30vh',borderRadius:'5px 5px 0 0' }} alt="" src={item.picUrl}/>
                            </Row>
                            <Row className='detail'>
                                <Row className='name'>{item.gameName}</Row>
                                <Row className='priceWrapper'>
                                    {
                                        item.discount === 0?
                                        <span className='price'>
                                            <div className='nodiscountPrice'>¥{item.price}</div>
                                        </span>
                                        :<Row>
                                            <span className='discount'>-{item.discount*100}%</span>
                                            <span className='price'>
                                                <div className='originPrice'>¥{item.price}</div>
                                                <div className='nowPrice'>¥{Math.ceil(item.price*(1-item.discount)*100)/100}</div>
                                            </span>
                                        </Row>
                                    }
                                </Row>
                            </Row>
                        </div>
                    </Col>
                )
            })
            :
            <Spin />

        const recommend = this.state.recommendGames.length > 0
            ?
            this.state.recommendGames.map((item, index) => {
                return (
                    <Col span={6} className='box'>
                        <div className='wrapper' onClick={ ()=>this.handleClick(item.gameId) }>
                            <Row>
                                <img style={{ width:'100%',height:'30vh',borderRadius:'5px 5px 0 0' }} alt="" src={item.picUrl}/>
                            </Row>
                            <Row className='detail'>
                                <Row className='name'>{item.gameName}</Row>
                                <Row className='priceWrapper'>
                                    {
                                        item.discount === 0?
                                        <span className='price'>
                                            <div className='nodiscountPrice'>¥{item.price}</div>
                                        </span>
                                        :<Row>
                                            <span className='discount'>-{item.discount*100}%</span>
                                            <span className='price'>
                                                <div className='originPrice'>¥{item.price}</div>
                                                <div className='nowPrice'>¥{Math.ceil(item.price*(1-item.discount)*100)/100}</div>
                                            </span>
                                        </Row>
                                    }
                                </Row>
                            </Row>
                        </div>
                    </Col>
                )
            })
            :
            <Spin />

        const lastest = this.state.lastestGames.length > 0
            ?
            this.state.lastestGames.map((item, index) => {
                return (
                    <Col span={6} className='box'>
                        <div className='wrapper' onClick={ ()=>this.handleClick(item.gameId) }>
                            <Row>
                                <img style={{ width:'100%',height:'30vh',borderRadius:'5px 5px 0 0' }} alt="" src={item.picUrl}/>
                            </Row>
                            <Row className='detail'>
                                <Row className='name'>{item.gameName}</Row>
                                <Row className='priceWrapper'>
                                    {
                                        item.discount === 0?
                                        <span className='price'>
                                            <div className='nodiscountPrice'>¥{item.price}</div>
                                        </span>
                                        :<Row>
                                            <span className='discount'>-{item.discount*100}%</span>
                                            <span className='price'>
                                                <div className='originPrice'>¥{item.price}</div>
                                                <div className='nowPrice'>¥{Math.ceil(item.price*(1-item.discount)*100)/100}</div>
                                            </span>
                                        </Row>
                                    }
                                </Row>
                            </Row>
                        </div>
                    </Col>
                )
            })
            :
            <Spin />

        return (
            <div className='shoppingContent'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <h2 style={{ color:'rgba(255,255,255,0.9)',marginLeft:'0.5vw' }}>特别优惠</h2>
                        <Row className='card'>{discount}</Row>
                        <h2 style={{ color:'rgba(255,255,255,0.9)',marginLeft:'0.5vw' }}>为您推荐</h2>
                        <Row className='card' >{recommend}</Row>
                        <h2 style={{ color:'rgba(255,255,255,0.9)',marginLeft:'0.5vw' }}>最热新品</h2>
                        <Row className='card' >{lastest}</Row>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Content);