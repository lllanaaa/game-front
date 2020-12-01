import React,{Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Row,Col,Input } from 'antd';
import 'antd/dist/antd.css';
import LoginMenu from './loginMenu'
import NotLoginMenu from './notLoginMenu'
import docCookies from '../../../api/docCookies';

const Search  = Input.Search;

class TopPart extends Component {

    constructor(props){
        super(props);
        this.state = {
            logined: false
        }
    }

    componentDidMount(){

    }


    render(){
        let csrf = localStorage.getItem("token") || docCookies.getItem("__csrf");

        return (
            <div className='topPart-wrapper' style={{ minWidth:"1200px" }}>
                <Row gutter={30} >
                    <Col span={4}>
                        <div>
                            NetEnjoy Online Music
                        </div>
                    </Col>
                    <Col span={10}>
                        <Row className='topPart-selectList' style={{ textAlign:"center" }} >
                            <Col span={4}>
                                <NavLink activeClassName='active' to='/discover'>商城</NavLink>
                            </Col>
                            <Col span={4}>
                                <NavLink activeClassName='active' to='/myMusic?id=0'>分类</NavLink>
                            </Col>
                            <Col span={4}>
                                <NavLink activeClassName='active' to='/discover/toplist?type=1'>个人</NavLink>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={10}>
                        <Row gutter={10}>
                            <Col style={{ textAlign:"right" }} span={10}>
                            </Col>
                            <Col span={6}>
                                {
                                    csrf
                                        ?
                                        <LoginMenu loginData={this.props.loginData}  handleLogin={(boo)=>this.handleLogin(boo)}/>
                                        :
                                        <NotLoginMenu  handleLogin={(boo)=>this.handleLogin(boo)} />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(TopPart)
