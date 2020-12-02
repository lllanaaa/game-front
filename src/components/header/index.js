import React,{ Component } from 'react';
import TopPart from './topPart';

class Header extends Component{

    render(){
        return (
            <div className='header-wrapper'>
                <TopPart loginData={this.props.loginData} loginDataFunc={this.props.loginDataFunc} />
            </div>
        )
    }
}

export default Header;