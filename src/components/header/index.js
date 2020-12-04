import React,{ Component } from 'react';
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import LoginMenu from "./LoginMenu";
import NotLoginMenu from "./NotLoginMenu";
import { withRouter } from 'react-router-dom'

class Header extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        // let csrf = localStorage.getItem("token");
        let csrf = 1;

        return (
            <div className='topPart-wrapper' style={{ minWidth:"1200px" }}>
                <Row gutter={30} >
                    <Col span={4}>
                        <div>
                            steam
                        </div>
                    </Col>
                    <Col span={10}>
                        <Row className='topPart-selectList' style={{ textAlign:"center" }} >
                            <Col span={4}>
                                <NavLink activeClassName='active' to='/shoppingMall'>商城</NavLink>
                            </Col>
                            <Col span={4}>
                                <NavLink activeClassName='active' to='/sell'>热销</NavLink>
                            </Col>
                            <Col span={4}>
                                <NavLink activeClassName='active' to='/search'>搜索</NavLink>
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
                                        <LoginMenu/>
                                        :
                                        <NotLoginMenu/>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Header);