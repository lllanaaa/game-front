import React,{ Component } from 'react';
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import LoginMenu from "./LoginMenu";
import NotLoginMenu from "./NotLoginMenu";
import { withRouter } from 'react-router-dom'
import './index.scss';

class Header extends Component{

    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
    }

    navigateToShoppingMall=()=> {
        this.props.history.push(`/shoppingMall`)
    }
    navigateToClassify=()=> {
        this.props.history.push(`/classify`)
    }
    search=()=> {
        let value = this.searchRef.current.value;
        if(value.length>0){
            this.props.history.push({ pathname:`/search`, content: value })
        }else {
            this.props.history.push(`/`)
        }
    }

    render(){

        let csrf = localStorage.getItem("token");

        return (
            <div className='header-wrapper' style={{ width:"100%",backgroundColor:'rgb(23,26,33)',position:'fixed',zIndex:'1000' }}>
                <Row>
                    <Col span={8}>
                        <div className='title'>steamX</div>
                    </Col>
                    <Col span={4}>
                        <div className='header-selectList'>
                            <span className='select' onClick={ ()=>this.navigateToShoppingMall() }>商城
                            </span>
                            <span className='select' onClick={ ()=>this.navigateToClassify() }>分类
                            </span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='search'>    
                            <input 
                                className="searchInput" 
                                ref={ this.searchRef }
                                type="text" 
                                placeholder="搜索商城" 
                                size="22" 
                                autoComplete="off" />
                            <div className='searchButton' onClick={ ()=>this.search() }>搜索</div>
                        </div>
                    </Col>
                    <Col span={4}>
                        {
                            csrf?
                            <LoginMenu/>
                            :<NotLoginMenu/>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Header);