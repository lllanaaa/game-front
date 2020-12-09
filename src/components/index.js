import React,{ Component } from 'react';
import Header from '../components/header/index'
import Banner from '../components/banner/index'
import Content from '../components/content/index'
import Footer from '../components/footer/index'
import './header/index.scss'
import bg1 from '../source/background/bg1.jpg';

class Index extends Component {

    render(){
        return (
            <div className='home' style={{  }}>
                <div className='header' style={{ backgroundColor: "#171A21"}}>
                    <Header />
                </div>
                <div className='banner' style={{ backgroundImage: `url(${bg1})`,marginTop:'11vh'}}>
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
