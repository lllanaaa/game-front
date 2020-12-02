import  React, { Component } from 'react';
import { Row, Col } from 'antd'
import banner1 from '../../source/game_pic/banner_pic/1.jpg'
import banner2 from '../../source/game_pic/banner_pic/2.jpg'
import banner3 from '../../source/game_pic/banner_pic/3.jpg'
import banner4 from '../../source/game_pic/banner_pic/4.jpg'
import banner5 from '../../source/game_pic/banner_pic/5.jpg'
import banner6 from '../../source/game_pic/banner_pic/6.jpg'
import Header from "../header";



class Game extends Component {

    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount() {
        // getSongBanner().then( (res)=>{
        //     //请求轮播图数据,通过getBannerFunc函数给回到
        //     if(res.data.code === 200) {
        //         console.log(res.data);
        //         this.state.bannerBgArr = [...res.data.songs];
        //     }else{
        //         console.log("请求失败")
        //     }
        // }).catch( (error)=>{
        // })

    }


    render() {

        return (
            <div>
                <div style={{ backgroundColor:"#242400",color:"#fff",position:"fixed",zIndex:10,top:"0",width:"100%" }}>
                    <Header />
                </div>

                <div className='song-content' style={ { marginTop:"20vh",minWidth:"1430px" } }>
                    <Row>
                        <Col span={10}>
                            <Row>
                                <Col span={24}>
                                    <div className='song-logo' style={{marginLeft: "100px"}}>
                                        <div className='song-logo-img'>
                                            <img  src={"http://cyq.center:8000/"+picUrl} alt="" />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:"150px", marginLeft:"130px"}}>
                                <div className="playText" onClick={()=>this.startPlaySong()} style={{marginRight:"15px"}}>
                                    播放
                                </div>
                                <div className='playText' onClick={this.addToPlayList} style={{marginRight:"15px"}}>
                                    添加
                                </div>
                                {
                                    this.csrf
                                        ?
                                        <div className='playText' onClick={this.showCollectModal}>
                                            收藏
                                        </div>
                                        :
                                        null
                                }
                            </Row>
                        </Col>
                        <Col span={12} style={{ backgroundColor:"#fff", borderTop:"none",paddingBottom:"90px" }}>
                            <Row>
                                {/* //内容左侧 */}
                                <div className='song-content-rightHeader'>
                                    <span className='song-content-rightHeader-name'>{songName}</span>
                                </div>
                                <div className='song-content-singer' style={{marginTop:"20px"}}>
                                    <span style={{ fontSize:"12px" }}>歌手:</span>
                                    {
                                        singer.singerName
                                            ?
                                            <span style={{ marginLeft:"5px", fontSize:"12px", color:"#2273C2" }}>{singer.singerName}</span>
                                            :
                                            null
                                    }

                                </div>
                                <div className='song-content-belongAlbum'>
                                    <span style={{ fontSize:"12px" }}>专辑:</span>
                                    <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{album.albumName}</span>
                                </div>
                                <div className='song-content-label'>
                                    <span style={{ fontSize:"12px" }}>标签:</span>
                                    {label.map( (item) => {
                                        return(
                                            <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{item.name}</span>
                                        )
                                    })}
                                </div>

                                {/*歌词*/}
                                {
                                    this.state.isExtend
                                        ?
                                        <Extend html={html} handleExtendLyric={(boo)=>this.handleExtendLyric(boo)} />
                                        :
                                        <NotExtend html={html} handleExtendLyric={(boo)=>this.handleExtendLyric(boo)}/>
                                }
                            </Row>
                        </Col>

                        <Col span={2}></Col>

                    </Row>

                    {
                        this.csrf
                            ?
                            <div>
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
                                                    共{commentTotal}条评
                                                </span>
                                                </div>
                                            </Col>
                                            <Col span={6}></Col>
                                        </Row>

                                    </Col>
                                    <Col span={2}></Col>
                                </Row>

                                {/*评论输入框*/}
                                <Row style={{marginTop:"30px"}}>
                                    <Col span={2}></Col>
                                    <Col span={20}>
                                        <Row>
                                            <Col span={2}>
                                                {/* <img src={defaultAvatar} width="30px" height="30px" alt=""/> */}
                                            </Col>
                                            <Col span={16} style={{ position:"relative" }}>
                                                <TextArea rows={4} onChange={this.onInputChange} value={comment}/>
                                                <span className='circle'>&nbsp;</span>
                                                <span className='circle-mask'>&nbsp;</span>
                                            </Col>
                                            <Col span={6}></Col>
                                        </Row>
                                    </Col>
                                    <Col span={2}></Col>
                                </Row>


                                <Row>
                                    <Col span={16}></Col>
                                    <Col span={8}>
                                        <div className="commentText" onClick={this.handleCommentClick}>评论</div>
                                    </Col>
                                </Row>


                                <Row style={{marginTop:"40px"}}>
                                    <Col span={2}></Col>
                                    <Col span={18}>
                                        {
                                            allComment.length > 0
                                                ?
                                                <div style={{ marginLeft:"40px" }}>
                                                    <div style={{paddingBottom:"20px"}}>
                                                        <span style={{ color:"#000",fontSize:"12px",fontWeight:"bold" }}>评论</span>
                                                        <span style={{ color:"#000",fontSize:"12px",fontWeight:"bold" }}>({commentTotal})</span>
                                                    </div>
                                                    {
                                                        renderComment
                                                    }
                                                </div>
                                                :
                                                null
                                        }
                                    </Col>
                                    <Col span={4}></Col>
                                </Row>

                            </div>
                            :
                            null

                    }

                </div>

                <div>
                    <Footer />
                </div>

            </div>
        )
    }

}

export default Game
