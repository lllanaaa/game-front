import React,{ Component,Fragment } from 'react';
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'
import {Col,Row} from 'antd';
import '../header/index.scss'
import './index.scss'
import {
    searchGame
} from '../../api/index'

class Setting extends Component{

    constructor(props) {
        super(props);
        this.state={
            searchList:[],
            totalSearch: 0,
        }
    }

    componentDidMount() {
        this.getData()
    }
    componentDidUpdate(prevProps,prevState) {
        if (prevProps.location.content !== this.props.location.content) {
            this.getData()
        }
    }
    navigateToGame=(gameId)=> {
        this.props.history.push(`/game?id=${gameId}`);
    }

    getData=()=> {
        let content = this.props.location.content;
        searchGame(content).then( (res)=>{
            if(res.data.code === 200) {
                this.setState({
                    searchList: res.data.searchList,
                    totalSearch: res.data.totalSearch,
                })
            }else {
                console.log("网络出问题")
            }
        }).catch(err=>{ console.log(err) })
    }

    render(){
        const handleSearchData = this.state.searchList.map( (item,index)=>{
            return (
                <Fragment  key={item.gameId}>
                    <Row 
                        className='searchGames' 
                        onClick={ ()=>this.navigateToGame(item.gameId) }
                    >
                        <Col span={5}>
                            <img 
                                style={{ width:'90%',height:'8vh',backgroundColor:'#fff' }}
                                alt=""
                                src={item.picUrl}
                            />
                        </Col>
                        <Col span={9} style={{ lineHeight:'8vh' }}>
                            <Row>{item.gameName}</Row>
                        </Col>
                        <Col span={4} style={{ lineHeight:'8vh',fontSize:'13px',color:'#4c6c8c' }}>
                            <Row>{item.publishTime}</Row>
                        </Col>
                        <Col span={3} style={{ lineHeight:'5vh',textAlign:'center' }}>
                            {
                                item.discount !== 0?
                                <div style={{ marginTop:'1.5vh',height:'5vh',width:'4vw',backgroundColor:'rgb(76,104,34)',fontSize:'14px',color:'#8bc53f' }}>-{item.discount*100}%</div>
                                :null
                            }
                        </Col>
                        <Col span={3} style={{ lineHeight:'8vh',color: '#c7d5e0' }}>
                            <Row>¥{Math.ceil(item.price*(1-item.discount)*100)/100}</Row>
                        </Col>
                    </Row>
                </Fragment>
            )
        } )

        return (
            <div className='searchPage'>
                <div className='header'>
                    <Header />
                </div>
                <div className='searchContent' >
                    <Row>
                        <Col span={6}></Col>
                        <Col className='searchTitle' span={12}>{this.state.totalSearch}个匹配的搜索结果</Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col span={12}>
                            {
                                handleSearchData.length>0?
                                <Row>
                                    {
                                        handleSearchData
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

export default Setting;