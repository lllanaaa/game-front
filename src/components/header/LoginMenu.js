import React,{ Component } from 'react';
import {Menu,Dropdown, Avatar} from 'antd'
import { ShoppingCartOutlined, SettingOutlined, LogoutOutlined,LaptopOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { withRouter } from 'react-router-dom'
import UserDefault from '../../source/user_pic/user.png'

class LoginMenu extends Component{

    constructor(props) {
        super(props);
    }

    //跳转我的购物车
    myCart=()=>{
        this.props.history.push('/user/myCart')
    }

    //跳转我的游戏库
    myGame=()=>{
        this.props.history.push('/user/myGame')
    }

    //跳转个人设置
    personSetting=()=>{
        this.props.history.push('/user/setting')
    }

    //退出登录
    exit=(boo)=>{
        localStorage.removeItem("token")
        localStorage.removeItem("loginObj")

        this.props.history.push("/");
    }
   
    
    render(){
        const menu = (
            <Menu>
                <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.myCart() }>
                    <span><ShoppingCartOutlined /></span>
                    <span>我的购物车</span>
                </Menu.Item>
                <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.myGame() }>
                    <span><LaptopOutlined /></span>
                    <span>我的游戏库</span>
                </Menu.Item>
                <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.personSetting() }>
                    <span><SettingOutlined /></span>
                    <span>个人设置</span>
                </Menu.Item>
                <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.exit(true) }>
                    <span><LogoutOutlined /></span>
                    <span>退出</span>
                </Menu.Item>
            </Menu>
        )

        return (
            <div style={{ color:"#fff" }} className='login-menu'>
                <Dropdown overlay={menu}>
                    <Avatar size="large"  src={UserDefault}/>
                </Dropdown>
            </div>
        )
    }
}

export default withRouter(LoginMenu);