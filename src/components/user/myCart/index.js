import React,{ Component } from 'react';
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'

class MyCart extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        return (
            <div className='myCart' style={{  }}>
                <div className='header'>
                    <Header />
                </div>
                <div>购物车</div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default MyCart;