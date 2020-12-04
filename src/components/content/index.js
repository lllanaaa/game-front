import React,{ Component } from 'react';
import {Row, Col, Card, Spin} from 'antd';
import 'antd/dist/antd.css'
import './index.css'

import pic1 from '../../source/game_pic/content_pic/1.jpg'
import pic2 from '../../source/game_pic/content_pic/2.jpg'
import pic3 from '../../source/game_pic/content_pic/3.jpg'
import pic4 from '../../source/game_pic/content_pic/4.jpg'
import withRouter from "react-router-dom/es/withRouter";

import {getSongDiscount, getSongRecommend, getSongLastest } from '../../api';

const { Meta } = Card;


class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discountGames: [
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
            ],
            recommendGames: [
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
            ],
            lastestGames: [
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
                {gameId: 1, gameName: "只狼", price: 219, discount: 0.2, picUrl: '../../source/game_pic/content_pic/1.jpg'},
            ]
        }
    }

    componentDidMount() {
        getSongDiscount().then( (res)=>{
            if(res.data.code === 200) {
                this.state.discountGames = [...res.data.discount];
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

        getSongRecommend().then( (res)=>{
            if(res.data.code === 200) {
                this.state.recommendGames = [...res.data.recommend];
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

        getSongLastest().then( (res)=>{
            if(res.data.code === 200) {
                this.state.lastestGames = [...res.data.lastest];
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
                            cover={<img alt="" src={pic1} onClick={ ()=>this.handleClick(item.gameId) }/>}
                        >
                            <Meta title="只狼" description="描述" />
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
                            cover={<img alt="" src={pic2} onClick={ ()=>this.handleClick(item.gameId) }/>}
                        >
                            <Meta title="只狼" description="描述" />
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
                            cover={<img alt="" src={pic3} onClick={ ()=>this.handleClick(item.gameId) }/>}
                        >
                            <Meta title="只狼" description="描述" />
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