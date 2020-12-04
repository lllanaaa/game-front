import React,{ Component,Fragment } from 'react';
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import {Col,Row,Dropdown} from 'antd';
import './index.scss'

class MyCart extends Component{

    constructor(props) {
        super(props);
        this.state={
            goods:[{good:'2'},{good:'1'}],
            // goods:[],
            mvTotal:0,
        }
    }

    render(){
        const handledGoodsData = this.state.goods.map( (item,index)=>{
            return (
                <Fragment  key={index}>
                    <Row className='goods'>
                        <Col span={8}>tupian</Col>
                        <Col span={12}>
                            
                        </Col>
                        <Col span={4}>jiage</Col>
                    </Row>
                </Fragment>
                // <Fragment key={index} >
                //     <Col
                //         span={5}
                //         style={{ position:"relative",marginLeft:"1.0416%",marginRight:"1.0416%" }}
                //     >
                //         <div className="recommendMV-MV" style={{ transition:"all 0.5s", }}>
                //             <img
                //                 style={{ borderRadius:"5px",width:"100%",height:"26vh",cursor:"pointer",zIndex:"1000",position:"relative",backgroundColor:"#ffffff" }}
                //                 alt=""
                //                 src={'http://cyq.center:8000/'+item.mvPicUrl}
                //                 title={item.mvName}
                //                 onClick={ ()=>this.navigateToMV(item.mvId) }
                //             />
                //         </div>
                //         <div className="recommendMV-content">
                //             <div
                //                 onClick={ ()=>this.navigateToMV(item.mvId) }
                //                 style={{ marginTop:"2vh",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"2.6vh",cursor:"pointer" }}>
                //                 {item.mvName}
                //             </div>
                //         </div>
                //         <div className="recommendMV-content">
                //             <div
                //                 onClick={ ()=>this.navigateToSinger(item.singerId) }
                //                 style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"2.5vh",cursor:"pointer" }}>
                //                 {item.mvSinger}
                //             </div>
                //         </div>
                //         <div
                //             style={{ color:"rgba(0,0,0,0.5)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"2.5vh",cursor:"pointer" }}>
                //             <HeartOutlined style={{ marginRight:"1vh",color:"#02c0cf" }}/>
                //             {
                //                 item.mvStar===0?"最新上架":item.mvStar
                //             }
                //         </div>
                //     </Col>
                // </Fragment>
            )
        } )

        return (
            <div className='myCart' style={{  }}>
                <div className='header'>
                    <Header />
                </div>
                <div className='content' >
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
                            <Row className='bottom'>
                                <Row style={{ fontSize:'17px',color:'#fff'}}>
                                    <div style={{ marginLeft:'2vw', marginRight:'35vw' }}>预计总额</div>
                                    <div>$1</div>
                                </Row>
                                <Row>

                                </Row>
                            </Row>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default MyCart;