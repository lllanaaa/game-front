import React, { Component } from 'react'
import { Link  } from 'react-router-dom'
import { Progress, Button } from 'antd'


class Notfound extends Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.history.goBack()
    };

    render() {
        return (
            <div style={{ textAlign:"center" }}>
                <div className="developing notfound">
                    <Progress
                        type="circle"
                        percent={100}
                        format={() => '404'}
                        width={200}
                        status="active"
                    />
                    <div>
                        <p><Link to="/">跳转至首页</Link></p>
                        <Button type="primary" onClick={ ()=>this.handleClick() }>返回上一页</Button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Notfound