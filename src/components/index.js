import React,{ Component } from 'react';
import Header from '../components/header/index'
import Banner from '../components/banner/index'
import Content from '../components/content/index'
import Footer from '../components/footer/index'

import bg1 from '../source/background/bg1.jpg';

class Index extends Component {

    render(){
        return (
            <div className='home' style={{  }}>
                <div className='header'>
                    <Header />
                </div>
                <div className='banner' style={{ marginTop:"20vh", backgroundImage: `url(${bg1})`}}>
                    <Banner />
                </div>
                <div className='content' style={{ marginTop:"20px", marginBottom:"20px" }}>
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
