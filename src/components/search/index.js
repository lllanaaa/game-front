import React,{ Component,Fragment } from 'react';
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import {Col,Row} from 'antd';
import '../header/index.scss'
import {
    searchGame
} from '../../api/index'

class Setting extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.location.content)
    }

    render(){

        return (
            <div className='searchPage'>
                <div className='header'>
                    <Header />
                </div>
                <div className='content' >
                    <Row></Row>
                    {/* <Row>
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
                                            // onClick={ ()=>this.removeAllGame() }
                                        >移除所有物品</div>
                                        <div 
                                            className='toBuy'
                                            // onClick={ ()=>this.navigateToBuy() }
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
                    </Row> */}
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Setting;