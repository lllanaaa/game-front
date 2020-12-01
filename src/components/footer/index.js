import React, { Component } from 'react';
import {Col,Row} from 'antd';

class Footer extends Component {

    render() {
        return (
            <div className='footer' style={{ minWidth:"1050px" }}>
                <Row gutter={10}>
                    <Col span={8}></Col>
                    <Col span={16}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={14}>
                                <Row style={{ marginBottom:"10px" }}>
                                    <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer" }}>版权信息</Col>
                                    <Col span={1} style={{ color:"#999" }}>|</Col>
                                    <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer"  }}>关于我们</Col>
                                    <Col span={1} style={{ color:"#999" }}>|</Col>
                                    <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer"  }}>意见反馈</Col>
                                    <Col span={1} style={{ color:"#999" }}>|</Col>
                                    <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer"  }}>隐私政策</Col>
                                </Row>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        )
    }
}


export default Footer


