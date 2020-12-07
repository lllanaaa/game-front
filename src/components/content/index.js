import React,{ Component } from 'react';
import {Row, Col, Card, Spin} from 'antd';
import 'antd/dist/antd.css'
import './index.css'

import withRouter from "react-router-dom/es/withRouter";

import {getSongDiscount, getSongRecommend, getSongLastest } from '../../api';

const { Meta } = Card;


class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discountGames: [
                {gameId: 7, gameName: "爬行者世界4", price: 2570, discount: 0.1, picUrl: 'https://i.niupic.com/images/2020/12/07/958v.jpg'},
                {gameId: 2, gameName: "罪恶帝国", price: 4100, discount: 0.17, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 6, gameName: "月牙楼风云", price: 1520, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
            ],
            recommendGames: [
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 2, gameName: "罪恶帝国", price: 4100, discount: 0.17, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 3, gameName: "糖豆人：终极淘汰赛", price: 3090, discount: 0.88, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 4, gameName: "When Ski Lifts Go Wrong", price: 1520, picUrl: '../../source/game_pic/content_pic/1.jpg'},
            ],
            lastestGames: [
                {gameId: 7, gameName: "爬行者世界4", price: 2570, discount: 0.1, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 2, gameName: "罪恶帝国", price: 4100, discount: 0.17, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 5, gameName: "永夜之冬", price: 520, discount: 0.79, picUrl: '../../source/game_pic/content_pic/1.jpg'},
            ]
        }
    }

    componentDidMount() {
        getSongDiscount().then( (res)=>{
            if(res.data.code === 200) {
                this.state.discountGames = res.data.discount;
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

        getSongRecommend().then( (res)=>{
            if(res.data.code === 200) {
                this.state.recommendGames = res.data.recommend;
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

        getSongLastest().then( (res)=>{
            if(res.data.code === 200) {
                this.state.lastestGames = res.data.lastest;
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
                    <Col span={4}>
                        <Card
                            hoverable
                            cover={<img alt="" src={item.picUrl} onClick={ ()=>this.handleClick(item.gameId) }/>}
                        >
                            <p>{item.gameName}</p>
                            <span style={{color:"grey",textDecoration:"line-through"}}>{item.price}</span>
                            <span style={{fontSize: 40, marginLeft:"80px"}}>{parseInt(item.price * item.discount)}</span>
                        </Card>
                    </Col>
                )
            })
            :
            <Spin />

        const recommend = this.state.recommendGames.length > 0
            ?
            this.state.recommendGames.map((item, index) => {
                return (
                    <Col span={4}>
                        <Card
                            hoverable
                            cover={<img alt="" src={item.picUrl} onClick={ ()=>this.handleClick(item.gameId) }/>}
                        >
                            <p>{item.gameName}</p>
                            <span style={{color:"grey",textDecoration:"line-through"}}>{item.price}</span>
                            <span style={{fontSize: 40, marginLeft:"80px"}}>{parseInt(item.price * item.discount)}</span>
                        </Card>
                    </Col>
                )
            })
            :
            <Spin />

        const lastest = this.state.lastestGames.length > 0
            ?
            this.state.lastestGames.map((item, index) => {
                return (
                    <Col span={4}>
                        <Card
                            hoverable
                            cover={<img alt="" src={item.picUrl} onClick={ ()=>this.handleClick(item.gameId) }/>}
                        >
                            <p>{item.gameName}</p>
                            <span style={{color:"grey",textDecoration:"line-through"}}>{item.price}</span>
                            <span style={{fontSize: 40, marginLeft:"80px"}}>{parseInt(item.price * item.discount)}</span>
                        </Card>
                    </Col>
                )
            })
            :
            <Spin />

        return (
            <div>
                <h3 style={{marginLeft: "180px"}}>特别优惠</h3>

                <div className="site-card-wrapper" style={{marginLeft: "20px"}}>
                    <Row gutter={16}>
                        <Col span={4}></Col>
                        {discount}
                        <Col span={4}></Col>
                    </Row>
                </div>

                <h3 style={{marginLeft: "180px"}}>为您推荐</h3>

                <div className="site-card-wrapper" style={{marginLeft: "20px"}}>
                    <Row gutter={16}>
                        <Col span={4}></Col>
                        {recommend}
                        <Col span={4}></Col>
                    </Row>
                </div>


                <h3 style={{marginLeft: "180px"}}>最热新品</h3>

                <div className="site-card-wrapper" style={{marginLeft: "20px"}}>
                    <Row gutter={16}>
                        <Col span={4}></Col>
                        {lastest}
                        <Col span={4}></Col>
                    </Row>
                </div>

            </div>
        )
    }
}

export default withRouter(Content);