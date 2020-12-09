import  React, { Component, createElement, useState } from 'react';
import { Row, Col, Button, Spin, Rate } from 'antd'
import { Modal, Space } from 'antd';
import 'antd/dist/antd.css';
import Header from "../header";
import Footer from "../footer";
import {getGameDetail, addUserList, getSongRecommend, addComment} from '../../api';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
import { Comment, Avatar, Form, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import './index.css'
import videoDefault from "../../source/video/只狼.mp4"

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props =>
            <Comment {...props} />
        }
    />
);

const Editor = ({ onChange, onSubmit, submitting, value, rate, handleRateChange }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Rate allowHalf defaultValue={2.5} onChange={handleRateChange} value={rate}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit}>
                Add Comment
            </Button>
        </Form.Item>
    </>
);

function success() {
    Modal.success({
        content: '加入愿望单成功',
    });
}


class Game extends Component {

    constructor(props){
        super(props);
        this.state={
            gameId: 0,
            gameName: "",
            publishTime: "",
            publisher: "",
            picUrl: "",
            labels: [],
            price: 0,
            description: null,
            discount: 0.2,
            reviewNum: 10,
            reviews: [],
            score: 0,
            mvUrl: "",

            comments: [],
            submitting: false,
            value: '',
            rate: 2.5
        }
    }

    componentDidMount() {

        const gameId = parseInt(this.props.location.search.match(/\d+/gi).toString());

        getGameDetail(gameId).then( (res)=>{
            if(res.data.code === 200) {
                this.setState({
                    gameId: res.data.data.gameId,
                    gameName: res.data.data.gameName,
                    publishTime: res.data.data.publishTime,
                    publisher: res.data.data.publisher,
                    picUrl: res.data.data.picUrl,
                    labels: res.data.data.labels,
                    price: res.data.data.price,
                    description: res.data.data.description,
                    discount: res.data.data.discount,
                    reviewNum: res.data.data.reviewNum,
                    comments:  res.data.data.reviews,
                    score: res.data.data.rate,
                    mvUrl: res.data.data.mvUrl,
                });
                console.log(this.state)
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
                success()
            }else{
                console.log("请求失败")
            }
        }).catch( (error)=>{
        });

    };

    handleRateChange = (value) => {

        this.setState({
            rate: value
        })

    };

    handleSubmit = () => {

        const userId = JSON.parse(localStorage.getItem('loginObj')).userId;
        const userName = JSON.parse(localStorage.getItem('loginObj')).userName;

        if (!this.state.value || !this.state.rate) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            addComment(this.state.gameId, userId, this.state.value, moment().format('YYYY-MM-DD HH:mm:ss')).then( (res)=>{
                if(res.data.code === 200) {
                    console.log("请求成功")
                }else{
                    console.log("请求失败")
                }
            }).catch( (error)=>{
            });

            this.setState({
                submitting: false,
                value: '',
                rate: 2.5,
                comments: [
                    {
                        author: userName,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    rateDescription = () => {

        if(this.state.score < 1.5) {
            return "特别差评"
        } else if(this.state.score >= 1.5 && this.state.score < 2.5) {
            return "多半差评"
        } else if (this.state.score >= 2.5 && this.state.score < 3.5) {
            return '褒贬不一'
        } else if(this.state.score >= 3.5 && this.state.score < 4) {
            return '多半好评'
        } else {
            return '特别好评'
        }

    };


    render() {

        const showReviews =  this.state.reviews.length > 0
            ?
            this.state.reviews.map( (item,index,arr)=>{
                return (
                    <div>
                        <Comment
                            author={<a>{item.userName}</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt=""
                                />
                            }
                            content={
                                <p>
                                    {item.content}
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{item.time}</span>
                                </Tooltip>
                            }
                        />
                    </div>

                )
            })
            :
            null;



        const { submitting, value, comments, rate } = this.state;

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

                <div style={{marginTop: "150px"}}>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14}>
                            <Row>
                                <Col span={14}>
                                    <div style={{backgroundColor: "lightBlue"}}>
                                        <Player
                                            autoPlay={true}
                                        >
                                            <source src={videoDefault} />
                                        </Player>
                                    </div>
                                </Col>
                                <Col span={9} offset={1}>
                                    <div style={{marginLeft:"10px"}}>
                                        <Row>
                                            <div className='song-logo-img'>
                                                <img src={this.state.picUrl} alt="" style={{width: "350px"}}/>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='description' style={{marginTop: "10px", width: "550px"}}>
                                                {this.state.description}
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='song-content-singer' style={{marginTop:"10px"}}>
                                                <span style={{ fontSize:"12px" }}>评测内容:</span>
                                                <span style={{ marginLeft:"5px", fontSize:"12px", color:"#2273C2" }}>
                                        {
                                            this.rateDescription()
                                        }
                                    </span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='song-content-singer' style={{marginTop:"10px"}}>
                                                <span style={{ fontSize:"12px" }}>发行商:</span>
                                                <span style={{ marginLeft:"5px", fontSize:"12px", color:"#2273C2" }}>{this.state.publisher}</span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='song-content-belongAlbum' style={{marginTop:"10px"}}>
                                                <span style={{ fontSize:"12px" }}>发行时间:</span>
                                                <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{this.state.publishTime}</span>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='song-content-label' style={{marginTop:"10px"}}>
                                                <span style={{ fontSize:"12px" }}>标签:</span>
                                                {this.state.labels.map( (item) => {
                                                    return(
                                                        <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{item}</span>
                                                    )
                                                })}
                                            </div>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>
                        </Col>
                        <Col span={5}></Col>
                    </Row>

                </div>

                <div>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={7}>
                            <Row>
                                <div className='song-content-belongAlbum' style={{marginTop:"10px"}}>
                                    <span style={{ fontSize:"12px" }}>价格:</span>
                                    <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{this.state.price}</span>
                                    <span style={{ fontSize:"12px", marginLeft:"20px" }}>折扣:</span>
                                    <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{parseInt(this.state.discount * this.state.price)}</span>
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
                        <Col span={7}>

                        </Col>
                        <Col span={5}></Col>
                    </Row>

                </div>

                <div>

                    <Row>
                        <Col span={5}></Col>
                        <Col span={9} style={{marginTop: "40px"}}>
                            <Row>
                                关于此内容
                            </Row>
                            <Row style={{marginTop: "10px"}}>
                                <div>
                                    《火柴人联盟2》为《火柴人联盟》的正统续作，同为横版动作游戏，但又和一代作品截然不同：
                                </div>
                                <div>
                                    一、更帅的战斗系统：
                                    1.新增了跳跃，空中连击，战斗自由度更高。
                                    2.新增了台阶，和地形变化，场景将不再单调，后期还会有丰富的机关系统。
                                    3.更帅的动作设计，更好的操作手感，更华丽的连招。
                                </div>
                                <div>
                                    二、更多独具特色的英雄：
                                    1.每个英雄的操作体验截然不同,更加具有自己的特色，不同组合感受更为不同。
                                    2.每个月会新增一个英雄，最后目标是100个全新英雄！！
                                </div>
                                <div>
                                    三、更多丰富的功能和玩法
                                    试炼之地（主线管卡）、魔窟（可成长BOSS）、竞技场（和众多玩家PK）、符文之塔（无限刷符文）、矿洞（可离线收集各种资源）等各种全新系统等你探索。
                                </div>
                            </Row>

                            <Row style={{marginTop: "40px"}}>
                                系统需求
                            </Row>
                            <Row style={{marginTop: "10px"}}>
                                <Col span={12}>
                                    <div>最低配置</div>
                                    <div>需要 64 位处理器和操作系统</div>
                                    <div>操作系统: Windows® 7 / Windows® 8.1 / Windows® 10 64-bit (latest Service Pack)</div>
                                    <div>处理器: Intel® Core™ i3 3250 3.5 GHz or Intel Pentium G4560 3.5 GHz / AMD FX-4350 4.2 GHz</div>
                                    <div>内存: 6 GB RAM</div>
                                    <div>显卡: NVIDIA® GeForce® GTX 660 2GB or GTX 1050 2GB / AMD Radeon HD 7850 2GB</div>
                                    <div>网络: 宽带互联网连接</div>
                                    <div>存储空间: 需要 105 GB 可用空间</div>
                                </Col>
                                <Col span={12}>
                                    <div>推荐配置</div>
                                    <div>需要 64 位处理器和操作系统</div>
                                    <div>操作系统: System Windows® 7 / Windows® 8.1 / Windows® 10 64-bit (latest Service Pack)</div>
                                    <div>处理器: Processor Intel® Core™ i5 2400 3.4 GHz or i5 7400 3.5 GHz / AMD Ryzen R5 1600X 3.6 GHz</div>
                                    <div>内存: 8 GB RAM</div>
                                    <div>显卡: Video NVIDIA® GeForce® GTX 970 4GB or GTX 1060 6GB / AMD R9 390 8GB Memory 8 GB RAM</div>
                                    <div>网络: 宽带互联网连接</div>
                                    <div>存储空间: 需要 105 GB 可用空间</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={2}>

                        </Col>
                        <Col span={5}>
                            <div>单人</div>
                            <div>线上玩家对线</div>
                            <div>在线合作</div>
                            <div>DLC</div>
                            <div>steamX成就</div>
                            <div>完全支持控制器</div>
                            <div>应用内购买</div>
                        </Col>
                    </Row>

                </div>


                <div style={{marginTop: "100px"}}>
                    {/*评论标题显示*/}
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14}>
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
                        <Col span={5}></Col>
                    </Row>

                    <Row>
                        <Col span={5}></Col>
                        <Col span={14}>
                            {comments.length > 0 && <CommentList comments={comments} />}
                            <Comment
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt=""
                                    />
                                }
                                content={
                                    <Editor
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}
                                        handleRateChange={this.handleRateChange}
                                        submitting={submitting}
                                        value={value}
                                        rate={rate}
                                    />
                                }
                            />
                        </Col>
                        <Col span={5}></Col>
                    </Row>

                    <Row>
                        <Col span={5}></Col>
                        <Col span={14}>
                            {showReviews}
                        </Col>
                        <Col span={5}></Col>
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
