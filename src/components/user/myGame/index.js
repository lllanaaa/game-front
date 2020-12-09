import React,{ Component,Fragment } from 'react';
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import {Col,Row,message} from 'antd';
import '../myCart/index.scss'
import {
    getMyGameInfo
} from '../../../api/index'

class MyGame extends Component{

    constructor(props) {
        super(props);
        this.state={
            games:[],
            totalGame: 0,
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData=()=> {
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        getMyGameInfo(userId).then( (res)=>{
            if(res.data.code === 200) {
                console.log(res.data)
                this.setState({
                    games: res.data.games,
                    totalGame: res.data.totalGame
                })
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }

    navigateToGame=(gameId)=> {
        this.props.history.push(`/game?id=${gameId}`);
    }

    render(){
        const handledGoodsData = this.state.games.map( (item,index)=>{
            return (
                <Fragment  key={item.gameId}>
                    <Row className='goods'>
                        <Col span={8}>
                            <img 
                                style={{ cursor:'pointer',width:'80%',height:'10vh',backgroundColor:'#fff' }}
                                alt=""
                                src={item.picUrl}
                                onClick={ ()=>this.navigateToGame(item.gameId) }
                            />
                        </Col>
                        <Col span={16} style={{ lineHeight:'5vh' }}>
                            <Row>
                                <span style={{ cursor:'pointer' }} onClick={ ()=>this.navigateToGame(item.gameId) }>{item.gameName}</span>
                                <span style={{ marginLeft:'5vw',color:'#56707f' }}>发行于:&nbsp;{item.publishTime}</span>
                            </Row>
                            <Row>
                                {
                                    item.labels.length > 0?
                                    <span>
                                        {
                                            item.labels.map( (item,index)=>{
                                                return (
                                                    <Fragment key={index}>
                                                        <span style={{ backgroundColor:'rgb(27,40,56)',padding:'0.5vh 0.5vw',borderRadius:'2px',marginRight:'0.5vw' }}>
                                                            {item}
                                                        </span>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </span>
                                    :null
                                }
                            </Row>
                        </Col>
                    </Row>
                </Fragment>
            )
        } )

        return (
            <div className='myCart'>
                <div className='header'>
                    <Header />
                </div>
                <div className='myCartContent' >
                    <Row>
                        <Col span={6}></Col>
                        <Col className='titleLeft' span={6}>
                            <span>我的游戏库</span>
                            {
                                this.state.totalGame === 0?null:
                                <span>&nbsp;({this.state.totalGame})</span>
                            }
                        </Col>
                        <Col className='titleRight' span={6}></Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <Row className='top'></Row>
                            {
                                handledGoodsData.length>0?
                                <Row>
                                    {
                                        handledGoodsData
                                    }
                                </Row>
                                :null
                            }
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row style={{ minHeight:'10vh' }}></Row>
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default MyGame;