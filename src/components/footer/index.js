import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <div style={{ width:'100%',paddingBottom:'2vh',paddingTop:'2vh',backgroundColor:'rgb(27,40,56)',lineHeight:'12px',textAlign:'center' }}>
                <span style={{ color:"#999",fontSize:"12px",marginRight:"1vw",cursor:"pointer" }}>版权信息</span>
                <span style={{ color:"#999",fontSize:"12px",marginRight:"1vw" }}>|</span>
                <span style={{ color:"#999",fontSize:"12px",marginRight:"1vw",cursor:"pointer" }}>关于我们</span>
                <span style={{ color:"#999",fontSize:"12px",marginRight:"1vw" }}>|</span>
                <span style={{ color:"#999",fontSize:"12px",marginRight:"1vw",cursor:"pointer" }}>意见反馈</span>
                <span style={{ color:"#999",fontSize:"12px",marginRight:"1vw" }}>|</span>
                <span style={{ color:"#999",fontSize:"12px",cursor:"pointer" }}>隐私政策</span>
            </div>
        )
    }
}

export default Footer


