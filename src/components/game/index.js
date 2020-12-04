import  React, { Component } from 'react';
import { Row, Col, Button, Spin } from 'antd'
import 'antd/dist/antd.css';
import Header from "../header";
import Footer from "../footer";
import { getGameDetail, addUserList } from '../../api';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';


import pic from '../../source/game_pic/content_pic/1.jpg'

class Game extends Component {

    constructor(props){
        super(props);
        this.state={
            gameId: 1,
            gameName: "只狼",
            publishTime: "2020/12/02",
            publisher: "FromSoftware",
            picUrl: '../../source/game_pic/content_pic/1.jpg',
            labels: ["类魂游戏","困难","单人"],
            price: 219,
            description: "进入由打造了《黑暗之魂》系列的知名开发商FromSoftware倾力制作的全新冒险，用智慧和力量斩开复仇之路。 决死复仇，夺回荣誉，智杀强敌。",
            discount: 0.2,
            reviewNum: 10,
            reviews: [{id: 1, gameId: 1, content: "评论1", userId: 1, userName: "玩家1", userPicUrl: "", time: ""}, {id: 2, gameId: 1, content: "评论2", userId: 2, userName: "玩家2", userPicUrl: "", time: ""}],
            reviewContent: "好评如潮",
            mvUrl: "",
        }
    }

    componentDidMount() {

        const gameId = parseInt(this.props.location.search.match(/\d+/gi).toString());

        getGameDetail(gameId).then( (res)=>{
            if(res.data.code === 200) {
                this.setState({
                    gameId: res.data.data,
                    gameName: res.data.data,
                    publishTime: res.data.data,
                    publisher: res.data.data,
                    picUrl: res.data.data,
                    labels: res.data.data,
                    price: res.data.data,
                    description: res.data.data,
                    discount: res.data.data,
                    reviewNum: res.data.data,
                    reviews:  res.data.data,
                    reviewContent: res.data.data,
                    mvUrl: res.data.data,
                })
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

    }

    onClickAdd = () => {

        const gameId = parseInt(this.props.location.search.match(/\d+/gi).toString());
        const userId = JSON.parse(localStorage.getItem('loginObj')).userId

        addUserList(userId, gameId).then( (res)=>{
            if(res.data.code === 200) {
                console.log("请求成功")
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

    };


    render() {

        const showReviews =  this.state.reviews.length > 0
            ?
            this.state.reviews.map( (item,index,arr)=>{
                //对返回的数据中的/n进行替换，替换成<br/>标签
                const str = item.content.replace(/\n/g,'<br />');
                //去除最后一条评论的borderbottom
                const showBorder = index === arr.length-1 ? false : true;
                return (
                    <div className='newComment' style={{marginBottom:"25px"}}>
                        <span className='avatar' style={{backgroundImage:`url(${item.userPicUrl})`}}></span>
                        <span className='userComment'>
                            <span style={{ color:"#1679C5",fontSize:"12px" }}>{item.userName}</span>
                            <span style={{ fontSize:"12px" }} dangerouslySetInnerHTML={{__html: str}}></span>
                        </span>
                        <span className='commentTime'>{item.time}</span>
                    </div>
                )
            })
            :
            null;

        return (
            <div>
                <div style={{ backgroundColor:"#242400",color:"#fff",position:"fixed",zIndex:10,top:"0",width:"100%" }}>
                    <Header />
                </div>

                <div>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={12}>
                            <div className='song-content-rightHeader' style={{marginTop: 30}}>
                                <span className='song-content-rightHeader-name'>{this.state.gameName}</span>
                            </div>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                </div>

                <div style={{marginTop: "100px"}}>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={12}>
                            <div style={{height: 420, width:700}}>
                                <Player>
                                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                                </Player>
                            </div>

                        </Col>
                        <Col span={6}>
                            <Row>
                                <div className='song-logo-img'>
                                    <img src={pic} alt="" style={{width: "300px"}}/>
                                </div>
                            </Row>
                            <Row>
                                <div className='description'>
                                    描述内容
                                </div>
                            </Row>
                            <Row>
                                <div className='song-content-singer' style={{marginTop:"50px"}}>
                                    <span style={{ fontSize:"12px" }}>评测内容:</span>
                                    <span style={{ marginLeft:"5px", fontSize:"12px", color:"#2273C2" }}>{this.state.reviewContent}</span>
                                </div>
                            </Row>
                            <Row>
                                <div className='song-content-singer' style={{marginTop:"50px"}}>
                                    <span style={{ fontSize:"12px" }}>发行商:</span>
                                    <span style={{ marginLeft:"5px", fontSize:"12px", color:"#2273C2" }}>{this.state.publisher}</span>
                                </div>
                            </Row>
                            <Row>
                                <div className='song-content-belongAlbum'>
                                    <span style={{ fontSize:"12px" }}>发行时间:</span>
                                    <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{this.state.publishTime}</span>
                                </div>
                            </Row>
                            <Row>
                                <div className='song-content-label'>
                                    <span style={{ fontSize:"12px" }}>标签:</span>
                                    {this.state.labels.map( (item) => {
                                        return(
                                            <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{item}</span>
                                        )
                                    })}
                                </div>
                            </Row>
                            <Row>
                                {localStorage.getItem('loginObj')?
                                    <div className='add'>
                                        <Button onClick={this.onClickAdd}>添加至您的愿望单</Button>
                                    </div>
                                    :
                                    <Spin/>
                                }

                            </Row>

                        </Col>
                        <Col span={4}></Col>
                    </Row>

                </div>

                <div style={{marginTop: "100px"}}>
                    {/*评论标题显示*/}
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Row>
                                <Col span={2}></Col>
                                <Col span={16}>
                                    <div>
                                                <span
                                                    style={{ color:"#4C4C4C",fontSize:"20px",marginRight:"20px" }}
                                                >
                                                    评论
                                                </span>
                                        <span
                                            style={{ color:"#6F6F6F",fontSize:"14px" }}

                                        >
                                                    共{this.state.reviewNum}条评
                                                </span>
                                    </div>
                                </Col>
                                <Col span={6}></Col>
                            </Row>

                        </Col>
                        <Col span={2}></Col>
                    </Row>

                    <Row style={{marginTop:"40px"}}>
                        <Col span={2}></Col>
                        <Col span={18}>
                            {
                                this.state.reviews.length > 0
                                    ?
                                    <div style={{ marginLeft:"40px" }}>
                                        {
                                            showReviews
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </Col>
                        <Col span={4}></Col>
                    </Row>

                </div>

                <div>
                    <Footer />
                </div>

            </div>
        )
    }

}

export default Game
