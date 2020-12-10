import React,{ Component } from 'react';
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import {Col,Row,message,Modal,Input,Button,Form,Radio,notification} from 'antd';
import '../../header/index.scss'
import './index.scss'
import {
    sendMailCode,
    checkMailCode,
    changeInfo,
    changeMail,
    changePassword,
    checkPassword,
    resetPasswordByMail
} from '../../../api'

class Setting extends Component{

    constructor(props) {
        super(props);
        this.state={
            userId: null,
            userName: '',
            gender: null,
            mail: '',

            infoVisible:false,
            mailVisible:false,
            mailVisibleNew:false,
            passwordVisible:false,
            resetVisible:false,

            getMessageCodeDisabled:false,//获取验证码按钮状态,可用和不可用
            getVerifyMailCodeDisabled:false,//忘记密码->获取验证码按钮状态,可用和不可用
            resetLoading:false,//忘记密码按钮状态,可以提交和不可提交
        }
        this.oldMailRef = React.createRef();
        this.newMailRef = React.createRef();
        this.mailVerifyRef = React.createRef();
        this.formRefInfo = React.createRef();
        this.formRefMail = React.createRef();
        this.formRefMailNew = React.createRef();
        this.formRefPassword = React.createRef();
        this.formRefReset = React.createRef();
    }

    componentDidMount() {
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        let userName = JSON.parse(localStorage.getItem("loginObj"))['userName']
        let gender = JSON.parse(localStorage.getItem("loginObj"))['gender']
        let mail = JSON.parse(localStorage.getItem("loginObj"))['mail']
        this.setState({
            userId:userId,
            userName:userName,
            gender: gender,
            mail:mail
        })
    }

    modalInfo=()=>{
        this.setState({
            infoVisible:true
        })
    }
    onInfoCancel=()=>{
        this.setState({
            infoVisible:false
        })
    }
    
    modalMail=()=>{
        this.setState({
            mailVisible:true
        })
    }
    onMailCancel=()=>{
        this.setState({
            mailVisible:false
        })
    }
    onMailNewCancel=()=>{
        this.setState({
            mailVisibleNew:false
        })
    }

    modalPassword=()=>{
        this.setState({
            passwordVisible:true
        })
    }
    onPasswordCancel=()=>{
        this.setState({
            passwordVisible:false
        })
    }
    
    onResetCancel=()=>{
        this.setState({
            resetVisible:false
        })
    }
    
    switchToReset=()=>{
        this.setState({
            passwordVisible:false,
            resetVisible:true
        })
    }

    switchToPassword=()=>{
        this.setState({
            passwordVisible:true,
            resetVisible:false
        })
    }

    switchToMailNew=()=>{
        this.setState({
            mailVisible:false,
            mailVisibleNew:true
        })
    }

    handleChangeInfoSubmit=()=>{
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        this.formRefInfo.current.validateFields().then( value=>
            changeInfo(userId,value.nickname,value.gender).then((res)=>{
                if(res.data.code === 200) {
                    console.log(res.data)
                    console.log(value)
                    this.formRefInfo.current.resetFields()
                    this.setState({
                        userName: value.nickname,
                        gender: value.gender,
                        infoVisible:false
                    })
                    localStorage.setItem("loginObj",JSON.stringify(res.data.loginObj[0]));
                    message.info("修改成功~")
                }else{
                    console.log("网络出问题")
                }
            }).catch( errorInfo => console.log(errorInfo))
        ).catch( errorInfo => console.log(errorInfo))
    };
    
    handleOldMailCode=()=>{
        let value = this.oldMailRef.current.props.value;
        sendMailCode(value).then((res)=>{
            console.log("获取邮箱验证码",res)
            if(res.data.code === 200) {
                this.setState({
                    getMessageCodeDisabled:true
                })
                message.info("获取成功");
            }else{
                message.info("验证码获取失败,请重新获取!")
            }
        }).catch( (err)=>{
            console.log(err)
        })
    };
    handleNewMailCode=()=>{
        let value = this.newMailRef.current.props.value;
        sendMailCode(value).then((res)=>{
            console.log("获取邮箱验证码",res)
            if(res.data.code === 200) {
                this.setState({
                    getMessageCodeDisabled:true
                })
                message.info("获取成功");
            }else{
                message.info("验证码获取失败,请重新获取!")
            }
        }).catch( (err)=>{
            console.log(err)
        })
    };
    
    handleChangeMailSubmit=()=>{
        let mail = this.oldMailRef.current.props.value;
        this.formRefMail.current.validateFields().then( value=>
            checkMailCode(mail,value.oldCode).then((res)=>{
                if(res.data.code === 200){
                    this.formRefMail.current.resetFields()
                    this.setState({
                        mailVisible:false,
                        mailVisibleNew:true
                    })
                    message.info("邮箱验证成功~")
                }else{
                    console.log("网络出问题")
                }
            }).catch( errorInfo => console.log(errorInfo))
        ).catch( errorInfo => console.log(errorInfo))
    };

    handleChangeMailNewSubmit=()=>{
        let mail = this.newMailRef.current.props.value;
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        this.formRefMailNew.current.validateFields().then( value=>
            checkMailCode(mail,value.newCode).then((res)=>{
                if(res.data.code === 200){
                    changeMail(userId,mail).then((res)=>{
                        if(res.data.code === 200){
                            this.formRefMailNew.current.resetFields()
                            this.setState({
                                mailVisibleNew:false
                            })
                            message.info("修改成功~请重新登录")
                            localStorage.removeItem("token")
                            localStorage.removeItem("loginObj")
                            this.props.history.push("/");
                        }else{
                            console.log("网络出问题")
                        }
                    }).catch( errorInfo => console.log(errorInfo))
                }else{
                    console.log("网络出问题")
                }
            }).catch( errorInfo => console.log(errorInfo))
        ).catch( errorInfo => console.log(errorInfo))
    };v

    handleChangePasswordSubmit=()=>{
        let userId = JSON.parse(localStorage.getItem("loginObj"))['userId']
        this.formRefPassword.current.validateFields().then( value=>
            checkPassword(userId,value.oldPassword).then((res)=>{
                if(res.data.code === 200){
                    changePassword(userId,value.newPassword).then((res)=>{
                        if(res.data.code === 200){
                            this.formRefPassword.current.resetFields()
                            this.setState({
                                passwordVisible:false
                            })
                            message.info("修改成功~请重新登录")
                            localStorage.removeItem("token")
                            localStorage.removeItem("loginObj")
                            this.props.history.push("/");
                        }else{
                            console.log("网络出问题")
                        }
                    }).catch( errorInfo => console.log(errorInfo))
                }else{
                    console.log("网络出问题")
                }
            }).catch( errorInfo => console.log(errorInfo))
        ).catch( errorInfo => console.log(errorInfo))
    }
    
    handleVerifyMailCode=()=>{
        let value = this.mailVerifyRef.current.props.value;
        sendMailCode(value).then((res)=>{
            console.log("获取忘记密码邮箱验证码",res)
            if(res.data.code === 200) {
                this.setState({
                    getMessageCodeDisabled:true
                })
                message.info("获取成功");
            }else{
                message.info("验证码获取失败,请重新获取!")
            }
        }).catch( (err)=>{
            console.log(err)
        })
    };
    
    handleResetSubmit=(ev)=>{
        this.formRefReset.current.validateFields().then( value => 
            checkMailCode(value.resetVerifyMail,value.resetVerifyCode).then((res)=>{
                if(res.data.code === 200){
                    resetPasswordByMail(value.resetVerifyMail,value.resetPassword).then((res)=>{
                        if(res.data.code === 200) {
                            this.formRefReset.current.resetFields()
                            message.info("修改密码成功~")
                            this.switchToLogin()
                        }else{
                            console.log('网络出问题')
                        }
                    }).catch( errorInfo => console.log(errorInfo))
                }else {
                    this.formRefReset.current.resetFields()
                    message.info("验证码错误!")
                }
            }).catch( errorInfo => console.log(errorInfo))
        ).catch( errorInfo => console.log(errorInfo))
    }

    render(){

        return (
            <div className='setting'>
                <div className='header'>
                    <Header />
                </div>
                <div className='settingContent' >
                    <Row>
                        <Col span={6}></Col>
                        <Col className='settingTitleWapper' span={12}>
                            <Row>
                                <Col className='settingTitle' span={12}>基本信息</Col>
                                <Col span={12}>
                                    <span className='settingChange' onClick={ ()=>this.modalInfo() }>修改</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col className='settingInfoWapper' span={12}>
                            <div>昵称&nbsp;:&nbsp;{this.state.userName}</div>
                            <div>性别&nbsp;:&nbsp;{this.state.gender===1?<span>男</span>:<span>女</span>}</div>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col className='settingTitleWapper' span={12}>
                            <Row>
                                <Col className='settingTitle' span={12}>绑定邮箱</Col>
                                <Col span={12}>
                                    <span className='settingChange' onClick={ ()=>this.modalMail()}>修改</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col className='settingMailWapper' span={12}>
                            <div>邮箱&nbsp;:&nbsp;{this.state.mail}</div>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col className='settingTitleWapper' span={12}>
                            <Row>
                                <Col className='settingTitle' span={12}>重置密码</Col>
                                <Col span={12}>
                                    <span className='settingChange' onClick={ ()=>this.modalPassword()}>修改</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}></Col>
                    </Row>
                </div>
                <div className='footer'>
                    <Footer />
                </div>

                <Modal
                    visible={this.state.infoVisible}
                    onCancel={ ()=>this.onInfoCancel() }
                    footer={[
                        <Button
                            type="primary"
                            key='confirm'
                            style={{ float:"right" }}
                            htmlType="submit"
                            onClick={()=>this.handleChangeInfoSubmit()}
                        >
                            确定
                        </Button>,
                        <div key='clear' style={{ clear:"both" }}></div>
                    ]}
                    width={500}
                >
                    <div style={{ textAlign:"center",paddingTop:"30px" }}>
                        <Form ref={this.formRefInfo}>
                            <Form.Item
                                label="昵称"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="nickname"
                                rules={[
                                    {required:true,message:"昵称不能为空"},
                                    {pattern:/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/g,message:"昵称不能含有非法字符"},
                                    {max:10,message: '昵称不能大于10个字符'}
                                ]}
                            >
                                <Input 
                                    autoComplete="off" 
                                    placeholder='0~10位,仅含中文/数字/大小写字母/下划线' 
                                    style={{ width:"100%" }}/>
                            </Form.Item>
                            <Form.Item
                                label="性别"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="gender"
                                rules={[
                                    {required:true,message:"性别不能为空"}
                                ]}
                            >
                                <Radio.Group style={{ width:"100%"}}>
                                    <Radio value={1} style={{ width:"30%",marginLeft:"10%" }}>男</Radio>
                                    <Radio value={0} style={{ width:"30%",marginLeft:"10%" }}>女</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <Modal
                    visible={this.state.mailVisible}
                    onCancel={ ()=>this.onMailCancel() }
                    footer={[
                        <Button
                            type="primary"
                            key='confirm'
                            style={{ float:"right" }}
                            htmlType="submit"
                            onClick={()=>this.handleChangeMailSubmit()}
                        >
                            确定
                        </Button>,
                        <div key='clear' style={{ clear:"both" }}></div>
                    ]}
                    width={400}
                >
                    <div style={{ textAlign:"center",paddingTop:"30px" }}>
                        <Form ref={this.formRefMail}>
                            <Form.Item
                                label="原邮箱"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="oldMail"
                                rules={[
                                    { required: true, message:'邮箱不能为空' },
                                    { pattern:/^\w+@((\w+\.){1,2})(com|net)/g,message:"邮箱账号格式不正确"}
                                ]}
                            >
                                <Input
                                    ref={ this.oldMailRef }
                                    placeholder="0~18位，仅含@.com/net"
                                    style={{ width:"100%" }}
                                    autoComplete="off" />
                            </Form.Item>
                            <Form.Item
                                label="验证码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="oldCode"
                                rules={[
                                    {required:true,message:"验证码不能为空"},
                                    {pattern:/^[0-9]+$/g,message:"验证码不能含有非法字符"},
                                    {len:6,message: '验证码为6个数字'}
                                ]}
                            >
                                <div style={{ width:"100%",display:"inline" }}>
                                    <Input placeholder='请输入验证码' style={{ width:"50%"}} autoComplete="off"/>
                                    <Button
                                        type="primary"
                                        onClick={ ()=>this.handleOldMailCode() }
                                        style={{ width:"40%",marginLeft:"10%" }}
                                    >获取验证码
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <Modal
                    visible={this.state.mailVisibleNew}
                    onCancel={ ()=>this.onMailNewCancel() }
                    footer={[
                        <Button
                            type="primary"
                            key='confirm'
                            style={{ float:"right" }}
                            htmlType="submit"
                            onClick={()=>this.handleChangeMailNewSubmit()}
                        >
                            确定
                        </Button>,
                        <div key='clear' style={{ clear:"both" }}></div>
                    ]}
                    width={400}
                >
                    <div style={{ textAlign:"center",paddingTop:"30px" }}>
                        <Form ref={this.formRefMailNew}>
                            <Form.Item
                                label="新邮箱"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="newMail"
                                rules={[
                                    { required: true, message:'邮箱不能为空' },
                                    { pattern:/^\w+@((\w+\.){1,2})(com|net)/g,message:"邮箱账号格式不正确"}
                                ]}
                            >
                                <Input
                                    ref={ this.newMailRef }
                                    placeholder="0~18位，仅含@.com/net"
                                    style={{ width:"100%" }}
                                    autoComplete="off" />
                            </Form.Item>
                            <Form.Item
                                label="验证码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="newCode"
                                rules={[
                                    {required:true,message:"验证码不能为空"},
                                    {pattern:/^[0-9]+$/g,message:"验证码不能含有非法字符"},
                                    {len:6,message: '验证码为6个数字'}
                                ]}
                            >
                                <div style={{ width:"100%",display:"inline" }}>
                                    <Input placeholder='请输入验证码' style={{ width:"50%"}} autoComplete="off"/>
                                    <Button
                                        type="primary"
                                        onClick={ ()=>this.handleNewMailCode() }
                                        style={{ width:"40%",marginLeft:"10%" }}
                                    >获取验证码
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <Modal
                    visible={this.state.passwordVisible}
                    onCancel={ ()=>this.onPasswordCancel() }
                    footer={[
                        <Button
                            type="primary"
                            key='forgetPassword'
                            style={{ float:"left" }}
                            onClick={ ()=>this.switchToReset() }
                        >忘记密码?
                        </Button>,
                        <Button
                            type="primary"
                            key='confirm'
                            style={{ float:"right" }}
                            htmlType="submit"
                            onClick={()=>this.handleChangePasswordSubmit()}
                        >
                            确定
                        </Button>,
                        <div key='clear' style={{ clear:"both" }}></div>
                    ]}
                >
                    <div style={{ textAlign:"center",paddingTop:"30px" }}>
                        <Form ref={this.formRefPassword}>
                            <Form.Item
                                label="原密码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="oldPassword"
                                rules={[
                                    {required:true,message:"密码不能为空"},
                                    {pattern:/^[a-zA-Z0-9~!@#$%^&*()_+`={}|:";'<>?,.]+$/g,message:"密码不能含有非法字符"},
                                    {min:6,message: '密码不能小于6个字符'},
                                    {max:18,message: '密码不能大于18个字符'}
                                ]}
                            >
                                <Input.Password 
                                    placeholder='6~18位,仅含数字/大小写字母/特殊字符' 
                                    style={{ width:"100%" }}/>
                            </Form.Item>
                            <Form.Item
                                label="新密码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="newPassword"
                                rules={[
                                    {required:true,message:"密码不能为空"},
                                    {pattern:/^[a-zA-Z0-9~!@#$%^&*()_+`={}|:";'<>?,.]+$/g,message:"密码不能含有非法字符"},
                                    {min:6,message: '密码不能小于6个字符'},
                                    {max:18,message: '密码不能大于18个字符'}
                                ]}
                            >
                                <Input.Password 
                                    placeholder='6~18位,仅含数字/大小写字母/特殊字符' 
                                    style={{ width:"100%" }}/>
                            </Form.Item>
                            <Form.Item
                                label="确认密码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="confirmPassword"
                                rules={[
                                    {
                                      required: true,message:"密码不能为空"
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('密码不一致');
                                      },
                                    }),
                                ]}
                                validateTrigger="onBlur"
                            >
                                <Input.Password 
                                    placeholder='再次输入密码' 
                                    style={{ width:"100%" }}/>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <Modal
                    visible={this.state.resetVisible}
                    onCancel={ ()=>this.onResetCancel() }
                    footer={[
                        <Button
                            type="primary"
                            key='register'
                            style={{ float:"left" }}
                            onClick={ ()=>this.switchToPassword() }
                        >返回
                        </Button>,
                        <div key='clear' style={{ clear:"both" }}></div>
                    ]}
                    style={{ marginTop:"-50px",marginBottom:"50px" }}
                >
                    <div style={{ textAlign:"center",paddingTop:"30px" }}>
                        <Form ref={this.formRefReset} onFinish={ (ev)=>this.handleResetSubmit(ev) }>
                            <Form.Item
                                label="邮箱"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="resetVerifyMail"
                                rules={[
                                    { required: true, message:'邮箱账号不能为空' },
                                    { pattern:/^\w+@((\w+\.){1,2})(com|net)/g,message:"邮箱账号格式不正确"}
                                ]}
                            >
                                <Input
                                    ref={ this.mailVerifyRef }
                                    placeholder="请输入邮箱账号"
                                    style={{ width:"100%" }}
                                    autoComplete="off" />
                            </Form.Item>
                            <Form.Item
                                label="验证码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="resetVerifyCode"
                                rules={[
                                    {required:true,message:"验证码不能为空"},
                                    {pattern:/^[0-9]+$/g,message:"验证码不能含有非法字符"},
                                    {len:6,message: '验证码为6个数字'}
                                ]}
                            >
                                <div style={{ width:"100%",display:"inline" }}>
                                    <Input placeholder='请输入验证码' style={{ width:"50%"}} autoComplete="off"/>
                                    <Button
                                        type="primary"
                                        onClick={ ()=>this.handleVerifyMailCode() }
                                        style={{ width:"40%",marginLeft:"10%" }}
                                    >获取验证码
                                    </Button>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="设置密码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="resetPassword"
                                rules={[
                                    {required:true,message:"密码不能为空"},
                                    {pattern:/^[a-zA-Z0-9~!@#$%^&*()_+`={}|:";'<>?,.]+$/g,message:"密码不能含有非法字符"},
                                    {min:6,message: '密码不能小于6个字符'},
                                    {max:18,message: '密码不能大于18个字符'}
                                ]}
                            >
                                <Input.Password 
                                    placeholder='6~18位,仅含数字/大小写字母/英文特殊字符' 
                                    style={{ width:"100%" }}/>
                            </Form.Item>
                            <Form.Item
                                label="确认密码"
                                labelCol={{span:5}}
                                wrapperCol={{span:16}}
                                name="confirmResetPassword"
                                rules={[
                                    {
                                      required: true,message:"密码不能为空"
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(rule, value) {
                                        if (!value || getFieldValue('resetPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('密码不一致');
                                      },
                                    }),
                                ]}
                                validateTrigger="onBlur"
                            >
                                <Input.Password 
                                    placeholder='再次输入密码' 
                                    style={{ width:"100%" }}/>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type='primary'
                                    loading={this.state.resetLoading}
                                    htmlType="submit"
                                    style={{ width:"70%",marginTop:"20px" }}
                                >确认
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Setting;