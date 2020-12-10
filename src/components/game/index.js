import  React, { Component, Fragment, useState } from 'react';
import { Row, Col, Button, Spin, Rate, message } from 'antd'
import { Modal, Space } from 'antd';
import 'antd/dist/antd.css';
import Header from "../header";
import Footer from "../footer";
import {getGameDetail, addUserList, getSongRecommend, addComment} from '../../api';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
import { Comment, Avatar, Form, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import '../header/index.scss'
import './index.scss'
import videoDefault from "../../source/video/只狼.mp4"
import UserDefault from '../../source/user_pic/user.png'

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
        content: '加入购物车成功',
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
        const userId = JSON.parse(localStorage.getItem('loginObj'))['userId']

        addUserList(gameId, userId).then( (res)=>{
            if(res.data.code === 200) {
                console.log("请求成功")
                success()
            }else{
                console.log("请求失败")
                message.info("商品已在购物车或已购买~")
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

        const userId = JSON.parse(localStorage.getItem('loginObj'))['userId'];
        const userName = JSON.parse(localStorage.getItem('loginObj'))['userName'];

        if (!this.state.value || !this.state.rate) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            addComment(this.state.gameId, userId, this.state.value, moment().format('YYYY-MM-DD HH:mm:ss'),this.state.rate).then( (res)=>{
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
                        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
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
        if(this.state.score > 4.5) {
            return '好评如潮'
        }else if(this.state.score >=4){
            return '特别好评'
        }else if(this.state.score >=3){
            return '多半好评'
        }else if(this.state.score >=2.5){
            return '褒贬不一'
        }else if(this.state.score >=2){
            return '多半差评'
        }else if(this.state.score >=1){
            return '特别差评'
        }else{
            return '极不推荐'
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
                                    src={UserDefault}
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
                <div className='header'>
                    <Header />
                </div>
                <div className='gameContent'>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={18}>
                            <h1 className='gameTitle'>{this.state.gameName}</h1>
                            <Row className='gameContentWrapper'>
                                <Col span={15}>{/* 视频、价格、添加至购物车 */}
                                    <Row>
                                        <Player
                                            autoPlay={true}
                                        >
                                            <source src={videoDefault} />
                                        </Player>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Row className='gamePriceWrapper'>
                                                {
                                                    this.state.discount === 0?
                                                    <span className='gamePrice'>
                                                        <div className='nodiscountGamePrice'>¥{this.state.price}</div>
                                                    </span>
                                                    :<Row>
                                                        <span className='gameDiscount'>-{this.state.discount*100}%</span>
                                                        <span className='gamePrice'>
                                                            <div className='originGamePrice'>¥{this.state.price}</div>
                                                            <div className='nowGamePrice'>¥{Math.ceil(this.state.price*(1-this.state.discount)*100)/100}</div>
                                                        </span>
                                                    </Row>
                                                }
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row className='gameAddWrapper'>
                                                {   
                                                    localStorage.getItem('loginObj')?
                                                    <div className='add' onClick={this.onClickAdd}>添加至您的购物车</div>
                                                    :null
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={9} style={{ paddingLeft:'1.5vw' }}>{/* 游戏简介 */}
                                    <Row>
                                        <img src={this.state.picUrl} alt="" style={{width:'100%',height:'25vh'}}/>
                                    </Row>
                                    <Row>
                                        <div className='gameDescription'>{this.state.description}</div>
                                    </Row>
                                    <Row>
                                        <span className='gameContentLeft'>评测内容&nbsp;:&nbsp;</span>
                                        <span className='gameContentRight'>{this.rateDescription()}</span>
                                    </Row>
                                    <Row>
                                        <span className='gameContentLeft'>发行商&nbsp;:&nbsp;</span>
                                        <span className='gameContentRight'>{this.state.publisher}</span>
                                    </Row>
                                    <Row>
                                        <span className='gameContentLeft'>发行时间&nbsp;:&nbsp;</span>
                                        <span className='gameContentRight'>{this.state.publishTime}</span>
                                    </Row>
                                    <Row>
                                        {
                                            this.state.labels.map( (item,index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <span style={{ marginTop:'3vh',backgroundColor:'rgb(67,126,160)',padding:'0.5vh 0.5vw',borderRadius:'2px',marginRight:'0.5vw',color:' rgb(198,212,233)' }}>
                                                            {item}
                                                        </span>
                                                    </Fragment>
                                                )
                                            })}
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ marginTop:'8vh' }}>
                                <Col span={15}>
                                    <Row>
                                        <Row style={{ width:'100%',color:'rgba(255,255,255,0.9)',fontSize:'18px' }}>关于此内容</Row>
                                        <div className='line'></div>
                                    </Row>
                                    <Row style={{ color:'#acb2b8' }}>
                                        <div style={{ margin:'1.5vh 0' }}>
                                            《火柴人联盟2》为《火柴人联盟》的正统续作，同为横版动作游戏，但又和一代作品截然不同：
                                        </div>
                                        <div style={{ margin:'1.5vh 0',width:'100%' }}>
                                            一、更帅的战斗系统：
                                        </div>
                                        <div style={{ margin:'1.5vh 0 0.5vh 0',width:'100%' }}>
                                            1.新增了跳跃，空中连击，战斗自由度更高。
                                        </div>
                                        <div style={{ margin:'0.5vh 0',width:'100%' }}>
                                            2.新增了台阶，和地形变化，场景将不再单调，后期还会有丰富的机关系统。
                                        </div>
                                        <div style={{ margin:'0.5vh 0 1.5vh 0',width:'100%' }}>
                                            3.更帅的动作设计，更好的操作手感，更华丽的连招。
                                        </div>
                                        <div style={{ margin:'1.5vh 0',width:'100%' }}>
                                            二、更多独具特色的英雄：
                                        </div>
                                        <div style={{ margin:'1.5vh 0 0.5vh 0',width:'100%' }}>
                                            1.每个英雄的操作体验截然不同,更加具有自己的特色，不同组合感受更为不同。
                                        </div>
                                        <div style={{ margin:'0.5vh 0 1.5vh 0',width:'100%' }}>
                                            2.每个月会新增一个英雄，最后目标是100个全新英雄！！
                                        </div>
                                        <div style={{ margin:'1.5vh 0',width:'100%' }}>
                                            三、更多丰富的功能和玩法
                                        </div>
                                        <div style={{ margin:'1.5vh 0 8vh 0',width:'100%' }}>
                                            试炼之地（主线管卡）、魔窟（可成长BOSS）、竞技场（和众多玩家PK）、符文之塔（无限刷符文）、矿洞（可离线收集各种资源）等各种全新系统等你探索。
                                        </div>
                                    </Row>
                                    <Row>
                                        <Row style={{ width:'100%',color:'rgba(255,255,255,0.9)',fontSize:'18px' }}>系统需求</Row>
                                        <div className='line'></div>
                                    </Row>
                                    <Row>
                                        <Col span={11} className='systemWrapper'>
                                            <Row style={{ fontSize:'8px',color:'#acb2b8' }}>最低配置</Row>
                                            <Row className='systemRight'>需要 64 位处理器和操作系统</Row>
                                            <Row>
                                                <span className='systemLeft'>操作系统 : </span>
                                                <span className='systemRight'>Windows® 7 / Windows® 8.1 / Windows® 10 64-bit (latest Service Pack)</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>处理器 : </span>
                                                <span className='systemRight'>Intel® Core™ i3 3250 3.5 GHz or Intel Pentium G4560 3.5 GHz / AMD FX-4350 4.2 GHz</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>内存 : </span>
                                                <span className='systemRight'>6 GB RAM</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>显卡 : </span>
                                                <span className='systemRight'>NVIDIA® GeForce® GTX 660 2GB or GTX 1050 2GB / AMD Radeon HD 7850 2GB</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>网络 : </span>
                                                <span className='systemRight'>宽带互联网连接</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>存储空间 : </span>
                                                <span className='systemRight'>需要 105 GB 可用空间</span>
                                            </Row>
                                        </Col>
                                        <Col span={2}></Col>
                                        <Col span={11} className='systemWrapper'>
                                            <Row style={{ fontSize:'8px',color:'#acb2b8' }}>推荐配置</Row>
                                            <Row className='systemRight'>需要 64 位处理器和操作系统</Row>
                                            <Row>
                                                <span className='systemLeft'>操作系统 : </span>
                                                <span className='systemRight'>System Windows® 7 / Windows® 8.1 / Windows® 10 64-bit (latest Service Pack)</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>处理器 : </span>
                                                <span className='systemRight'>Processor Intel® Core™ i5 2400 3.4 GHz or i5 7400 3.5 GHz / AMD Ryzen R5 1600X 3.6 GHz</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>内存 : </span>
                                                <span className='systemRight'>8 GB RAM</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>显卡 : </span>
                                                <span className='systemRight'>Video NVIDIA® GeForce® GTX 970 4GB or GTX 1060 6GB / AMD R9 390 8GB Memory 8 GB RAM</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>网络 : </span>
                                                <span className='systemRight'>宽带互联网连接</span>
                                            </Row>
                                            <Row>
                                                <span className='systemLeft'>存储空间 : </span>
                                                <span className='systemRight'>需要 105 GB 可用空间</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={9}>
                                    <Row className='otherWrapper'>
                                        <div className='otherContent'>单人</div>
                                        <div className='otherContent'>线上玩家对线</div>
                                        <div className='otherContent'>在线合作</div>
                                        <div className='otherContent'>DLC</div>
                                        <div className='otherContent'>steamX成就</div>
                                        <div className='otherContent'>完全支持控制器</div>
                                        <div className='otherContent'>应用内购买</div>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ marginTop:'8vh' }}>
                                <Row style={{ width:'100%',color:'rgba(255,255,255,0.9)',fontSize:'18px',height:'5vh' }}>
                                    <span style={{ lineHeight:'5vh' }}>评论</span>
                                    <span style={{ color:'rgba(255,255,255,0.5)',fontSize:'14px',marginLeft:'3vw',lineHeight:'5vh' }}>共{this.state.reviewNum}条</span>
                                </Row>
                                <div className='line'></div>
                                <Row style={{ backgroundColor:'rgba(198,212,233,0.6)',paddingLeft:'2vw',width:'100%',marginTop:'3vh' }}>
                                    {
                                        comments.length > 0 && <CommentList comments={comments} />
                                    }
                                </Row>
                                <Row style={{ width:'100%',marginBottom:'10vh' }}>
                                    <Comment
                                        style={{ padding:'3vh 2vw 0 2vw',width:'100%',backgroundImage:'linear-gradient(rgba(198,212,233,0.6),rgb(67,126,160,0.3))'}}
                                        avatar={
                                            <Avatar
                                                src={UserDefault}
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
                                    {showReviews}
                                </Row>
                            </Row>
                        </Col>
                        <Col span={3}></Col>
                    </Row>
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        )
    }

}


export default Game
