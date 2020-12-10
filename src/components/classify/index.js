import React,{ Component,Fragment } from 'react';
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import {Col,Row} from 'antd';
import '../header/index.scss'
import './index.scss'
import { FireOutlined, CrownOutlined, SmileOutlined,MehOutlined,ClockCircleOutlined } from '@ant-design/icons';
import {
    searchGame,
    getHot,
    getGood,
    getWill
} from '../../api/index'

class Classify extends Component{

    constructor(props) {
        super(props);
        this.state={
            classifyList: [],
            classifySelect: 0,
            hotTitle: true,
            goodTitle: false,
            willTitle: false
        }
    }

    componentDidMount() {
        this.getData()
    }
    navigateToGame=(gameId)=> {
        this.props.history.push(`/game?id=${gameId}`);
    }

    getData=()=> {
        getHot().then((res)=>{
            if(res.data.code === 200){
                console.log(res.data.hot)
                this.setState({
                    classifyList: res.data.hot,
                    classifySelect: 0
                })
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }

    selectHot=()=> {
        this.setState({
            hotTitle:true,
            goodTitle:false,
            willTitle:false
        })
        getHot().then((res)=>{
            if(res.data.code === 200){
                this.setState({
                    classifyList: res.data.hot,
                    classifySelect: 0
                })
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })

    }
    selectGood=()=> {
        this.setState({
            hotTitle:false,
            goodTitle:true,
            willTitle:false
        })
        getGood().then((res)=>{
            if(res.data.code === 200){
                console.log(res.data)
                this.setState({
                    classifyList: res.data.good,
                    classifySelect: 1
                })
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }
    selectWill=()=> {
        this.setState({
            hotTitle:false,
            goodTitle:false,
            willTitle:true
        })
        getWill().then((res)=>{
            if(res.data.code === 200){
                this.setState({
                    classifyList: res.data.will,
                    classifySelect: 2
                })
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }

    render(){

        const handleClassifyData = this.state.classifyList.map( (item,index)=>{
            return (
                <Fragment  key={item.gameId}>
                    <Row 
                        className='classifyGames' 
                        onClick={ ()=>this.navigateToGame(item.gameId) }
                    >
                        <Col span={8}>
                            <img 
                                style={{ width:'90%',height:'15vh',backgroundColor:'#fff' }}
                                alt=""
                                src={item.picUrl}
                            />
                        </Col>
                        <Col span={10} style={{ lineHeight:'5vh' }}>
                            <Row className='name'>{item.gameName}</Row>
                            <Row>
                            {
                                this.state.classifySelect === 2?
                                <div style={{ color:'#56707f' }}><ClockCircleOutlined style={{ marginRight:'0.5vw'}}/>{item.publishTime}</div>
                                :<span>{
                                    this.state.classifySelect === 1?
                                    <span>
                                        {
                                            item.rate > 4.5?
                                            <div style={{ color:'rgba(255,239,213,0.5)' }}><CrownOutlined style={{ marginRight:'0.5vw'}}/>好评如潮</div>
                                            :<span>
                                                {
                                                    item.rate >= 4?
                                                    <div style={{ color:'rgba(127,255,212,0.4)' }}><SmileOutlined style={{ marginRight:'0.5vw'}}/>特别好评</div>
                                                    :<div style={{ color:'rgba(175,238,238,0.5)' }}><MehOutlined style={{ marginRight:'0.5vw'}}/>多半好评</div>
                                                }
                                            </span>
                                        }
                                    </span>
                                    :<div style={{ color:'#b12b3c9c' }}><FireOutlined style={{ marginRight:'0.5vw'}}/>{item.sale}</div>
                                }</span>
                            }
                            </Row>
                            <Row>
                                {
                                    item.labels.length > 0?
                                    <span>
                                        {
                                            item.labels.map( (item,index)=>{
                                                return (
                                                    <Fragment key={index}>
                                                        <span  className='label'>
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
                        <Col span={6}>
                            {
                                this.state.classifySelect === 2?null
                                :<Row>
                                    <Col span={12} style={{ lineHeight:'5vh',textAlign:'center' }}>
                                        {
                                            item.discount !== 0?
                                            <div style={{ marginTop:'5vh',height:'5vh',width:'4vw',backgroundColor:'rgb(76,104,34)',fontSize:'14px',color:'#8bc53f' }}>-{item.discount*100}%</div>
                                            :null
                                        }
                                    </Col>
                                    <Col span={12}>
                                        {
                                            item.discount !== 0?
                                            <div>
                                                <Row className='price'>¥{item.price}</Row>
                                                <Row className='discountPrice'>¥{Math.ceil(item.price*(1-item.discount)*100)/100}</Row>
                                            </div>
                                            :<Row className='nodiscountPrice'>¥{item.price}</Row>
                                        }
                                        
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                </Fragment>
            )
        } )

        return (
            <div className='classifyPage'>
                <div className='header'>
                    <Header />
                </div>
                <div className='classifyContent' >
                    <Row>
                        <Col span={6}></Col>
                        <Col span={12}>
                            <Row  className='selectTitle'>
                            {
                                this.state.hotTitle === true?<Col className='selectTitleAfter' span={8}>热销商品</Col>
                                :<Col className='selectTitleBefore' span={8} onClick={()=>this.selectHot()}>热销商品</Col>
                            }
                            {
                                this.state.goodTitle === true?<Col className='selectTitleAfter' span={8}>最受好评</Col>
                                :<Col className='selectTitleBefore' span={8} onClick={()=>this.selectGood()}>最受好评</Col>
                            }
                            {
                                this.state.willTitle === true?<Col className='selectTitleAfter' span={8}>即将发行</Col>
                                :<Col className='selectTitleBefore' span={8} onClick={()=>this.selectWill()}>即将发行</Col>
                            }
                            </Row>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col span={12}>
                            {
                                handleClassifyData.length>0?
                                <Row>
                                    {
                                        handleClassifyData
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

export default Classify;