import React,{ Component,Fragment } from 'react';
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import {Col,Row,message,Modal,Button} from 'antd';
import './index.scss'
import {
    getMyCartInfo,
    deleteMyCartGame,
    deleteMyCartAllGame,
    buyMyCartAllGame
} from '../../../api/index'

class MyCart extends Component{

    constructor(props) {
        super(props);
        this.state={
            goods:[
                {gameId: 1,gameName: 'My Time at Portia',picUrl: 'https://media.st.dl.pinyuncloud.com/steam/apps/1062830/capsule_sm_120_alt_assets_1_schinese.jpg?t=1607021443',publishTime:'datetime',price: 39.21,discount: 0.35},
                {gameId: 2,gameName: '波西亚时光',picUrl: 'https://media.st.dl.pinyuncloud.com/steam/apps/1062830/capsule_sm_120_alt_assets_1_schinese.jpg?t=1607021443',publishTime:'datetime',price: 39.21,discount: 0.35},
            ],
            goods:[],
            totalAmount: 0,
            buyVisible:false
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData=()=> {
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        getMyCartInfo(userId).then( (res)=>{
            if(res.data.code === 200) {
                console.log(res.data)
                this.setState({
                    goods: res.data.games,
                    totalAmount: res.data.totalAmount
                })
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }

    navigateToGame=(gameId)=> {
        this.props.history.push(`/game?id=${gameId}`);
    }
    navigateToShopping=()=> {
        this.props.history.push(`/shoppingMall`)
    }
    removeGame=(gameId)=> {
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        deleteMyCartGame(userId, gameId).then( (res)=>{
            if(res.data.code === 200) {
                message.info("移除成功~")
                this.getData()
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }
    removeAllGame=()=> {
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        deleteMyCartAllGame(userId).then( (res)=>{
            if(res.data.code === 200) {
                message.info("移除成功~")
                this.getData()
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }

    onBuy=()=> {
        this.setState({
            buyVisible:true
        })
    }
    onBuyCancel=()=> {
        this.setState({
            buyVisible:false
        })
    }
    toBuy=()=> {
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        buyMyCartAllGame(userId).then((res)=>{
            if(res.data.code === 200) {
                message.info("购买成功~")
                this.getData()
                this.setState({
                    buyVisible:false
                })
                this.props.history.push(`/user/myGame`)
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }

    render(){
        const handledGoodsData = this.state.goods.map( (item,index)=>{
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
                        <Col span={10} style={{ lineHeight:'5vh' }}>
                            <Row style={{ cursor:'pointer' }} onClick={ ()=>this.navigateToGame(item.gameId) }>{item.gameName}</Row>
                            <Row>发行于:&nbsp;{item.publishTime}</Row>
                        </Col>
                        <Col span={4} style={{ lineHeight:'5vh' }}>
                            <Row style={{ color:'#56707f',fontSize:'small',textDecoration:'line-through' }}>¥{item.price}</Row>
                            <Row>¥{Math.ceil(item.price*(1-item.discount)*100)/100}</Row>
                        </Col>
                        <Col span={2} style={{ lineHeight:'10vh' }}>
                            <div 
                                style={{ color:'#56707f',fontSize:'small',textDecoration:'underline',cursor:'pointer' }}
                                onClick={ ()=>this.removeGame(item.gameId) }
                            >移除</div>
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
                        <Col className='titleLeft' span={6}>我的购物车</Col>
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
                            <Row className='bottom' >
                                <Row style={{ fontSize:'3vh',color:'#c7d5e0',marginBottom:'4vh'}}>
                                    <div style={{ marginRight:'35vw' }}>预计总额</div>
                                    {
                                        handledGoodsData.length>0?
                                        <div>¥{Math.ceil(this.state.totalAmount*100)/100}</div>
                                        :<div>¥0</div>
                                    }
                                </Row>
                                {
                                    handledGoodsData.length>0?
                                    <Row >
                                        <div 
                                            style={{ color:'#56707f',fontSize:'small',textDecoration:'underline',cursor:'pointer',marginRight:'33vw',lineHeight:'5vh' }}
                                            onClick={ ()=>this.removeAllGame() }
                                        >移除所有物品</div>
                                        <div 
                                            className='toBuy'
                                            onClick={ ()=>this.onBuy() }
                                        >去购买</div>
                                    </Row>
                                    :<Row>
                                        <div
                                            className='toBuy'
                                            onClick={ ()=>this.navigateToShopping() }
                                        >去购物</div>
                                    </Row>
                                }
                            </Row>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row style={{ minHeight:'10vh' }}></Row>
                </div>
                <div className='footer'>
                    <Footer />
                </div>
                <Modal
                    title={"购买游戏"}
                    visible={this.state.buyVisible}
                    onCancel={ ()=>this.onBuyCancel() }
                    footer={[
                        <Button
                            type="primary"
                            key='confirm'
                            style={{ float:"right" }}
                            htmlType="submit"
                            onClick={this.toBuy}
                        >
                            确定
                        </Button>,
                        <div key='clear' style={{ clear:"both" }}></div>
                    ]}
                    width={350}
                >
                    <div style={{ textAlign:"center" }}>
                        总计¥{Math.ceil(this.state.totalAmount*100)/100}&nbsp;,&nbsp;确定购买这些游戏吗?
                    </div>
                </Modal>
            </div>
        )
    }
}

export default MyCart;