import React,{ Component } from 'react';
import Header from '../containers/header/index'
import Banner from '../containers/banner/index'

class Index extends Component {

    render(){
        return (
            <div className='home'>
                <div className='header'>
                    <Header />
                </div>
                <div className='banner' style={{ marginTop:"20vh" }}>
                    <Banner />
                </div>
                <div className='content'>
                    <Content />
                </div>
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Index;
