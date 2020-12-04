import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal,Input,Button,Form,Radio,message } from 'antd'
import 'antd/dist/antd.css'
import {
    register,
    sendMailCode,
    checkMailCode,
    login,
    resetPasswordByMail
} from '../../api';

class NotLoginMenu extends Component {

    constructor(props){
        super(props);
        this.mailRegisterRef = React.createRef();//注册的邮箱
        this.mailVerifyRef = React.createRef();//忘记密码->验证的邮箱
        this.state={
            mailVisible:false,//登录是否显示弹窗
            registerVisible:false,//注册是否显示弹窗
            resetVisible:false,//忘记密码是否显示弹窗

            loading:false,//登录按钮的状态,可以提交和不可提交
            mailLoading:false,//邮箱登录按钮状态,可以提交和不可提交
            getMessageCodeDisabled:false,//获取验证码按钮状态,可用和不可用
            getVerifyMailCodeDisabled:false,//忘记密码->获取验证码按钮状态,可用和不可用
            resetLoading:false,//忘记密码按钮状态,可以提交和不可提交
        }
        this.formRef = React.createRef();
    }

    //点击邮箱登录触发的函数,弹出modal
    mailLogin=()=>{
        this.setState({
            mailVisible:true
        })
    }
    //取消邮箱登录的弹窗
    onMailLoginCancel=()=>{
        this.setState({
            mailVisible:false
        })
    }
    //取消注册的弹窗
    onRegisterCancel=()=>{
        this.setState({
            registerVisible:false
        })
    }
    //取消忘记密码的弹窗
    onResetCancel=()=>{
        this.setState({
            resetVisible:false
        })
    }
    //切换至注册
    switchToRegister=()=>{
        this.setState({
            mailVisible:false,//邮箱登录是否显示弹窗
            registerVisible:true,//注册是否显示弹窗
            resetVisible:false//忘记密码是否显示弹窗
        })
    }
    //切换至登录
    switchToLogin=()=>{
        this.setState({
            mailVisible:true,//邮箱登录是否显示弹窗
            registerVisible:false,//注册是否显示弹窗
            resetVisible:false//忘记密码是否显示弹窗
        })
    }
    //切换至忘记密码
    switchToReset=()=>{
        this.setState({
            mailVisible:false,//邮箱登录是否显示弹窗
            registerVisible:false,//注册是否显示弹窗
            resetVisible:true//忘记密码是否显示弹窗
        })
    }

    //邮箱登录提交触发的函数
    handleMailSubmit=(ev)=>{
        console.log("我来登录了")
        this.formRef.current.validateFields().then( value => 
            console.log(value) 
        ).catch( errorInfo => console.log(errorInfo))
        // this.formRef.current.validateFields(["mailAccount","mailPassword"], (err,values)=>{
        //     if(err){
        //         ev.preventDefault();
        //     }else {
        //         ev.preventDefault();
        //         console.log("yes")
        //         login(values.mailAccount,values.mailPassword).then( (res)=>{
        //             console.log("登录",res)
        //             if(res.data.code === 200) {
        //                 localStorage.setItem("loginObj",JSON.stringify(res.data));
        //                 localStorage.setItem("token",JSON.stringify(res.data.token))
        //                 this.setState({
        //                     mailVisible:false,
        //                     mailLoading:false
        //                 })
        //                 this.forceUpdate();
        //                 this.props.handleLogin(true)
        //                 message.info("登录成功~")
        //                 window.location.reload(true);
        //             }else if(res.data.code === 401) {
        //                 this.props.form.resetFields()
        //                 message.info("密码不对,请重新登录！")
        //             }else if(res.data.code === 403) {
        //                 this.props.form.resetFields()
        //                 message.info("账号不存在,请注册！")
        //                 this.switchToRegister()
        //             } else{
        //                 message.info("登录失败！请重新登录！")
        //                 message.error(res.data.msg)
        //             }
        //         } ).catch((err)=>{
        //             message.info("账号不存在,请注册！")
        //         })
        //     }
        // } )
    };
    //获取注册邮箱验证码
    handleRegisterMailCode=()=>{
        console.log("我来获取注册验证码了")
        let value = this.mailRegisterRef.current.props.value;//获取注册邮箱的值
        console.log("注册邮箱",value)
        if(!value){
            //如果邮箱为空
            this.formRef.current.validateFields(["registerMail"])
        }else {
            sendMailCode(value).then((res)=>{
                console.log("获取注册邮箱验证码",res)
                if(res.data.code === 200) {
                    this.setState({
                        getMessageCodeDisabled:true
                    })
                    message.info("获取成功");
                }else{
                    message.info("验证码错误,请重新获取!")
                }
            }).catch( (err)=>{
                message.info("网络堵车,请重新获取验证码嗷~")
            })
        }
    };
    //注册提交触发的函数
    handleRegisterSubmit=(ev)=>{
        console.log("我来注册了")
        this.formRef.current.validateFields().then( value => 
            console.log(value) 
        ).catch( errorInfo => console.log(errorInfo))
        // this.props.form.validateFields(
        //     ["nickname","gender","registerPassword","registerMail","registerVerifyCode"],
        //     (err,values)=>{
        //         if(err){
        //             ev.preventDefault();
        //         }else {
        //             ev.preventDefault();
        //             //验证注册邮箱验证码
        //             checkMailCode(values.registerMail,values.registerVerifyCode).then( (res)=>{
        //                 console.log("验证注册验证码",res)
        //                 if(res.data.code === 200){
        //                     this.props.form.resetFields()
        //                     //注册
        //                     register(values.nickname,values.gender,values.registerPassword,values.registerMail).then( (res)=>{
        //                         console.log("注册",res)
        //                         if(res.data.code === 200) {
        //                             message.info("注册成功!")
        //                             this.props.form.resetFields()
        //                             this.switchToLogin()
        //                         }else {
        //                             message.info("注册失败,账号已存在!")
        //                             this.props.form.resetFields()
        //                             this.switchToReset()
        //                         }
        //                     }).catch( (err)=>{
        //                         message.info("网络堵车,请重新注册嗷~")
        //                         console.log( message )
        //                     } )
        //                 }else if(res.data.code === 403){
        //                     this.props.form.resetFields()
        //                     message.info("验证码错误!")
        //                 }
        //             }).catch( (err)=>{
        //                 message.info("网络堵车,请重新获取验证码嗷~")
        //                 console.log( message )
        //             } )
        //         }
        //     })
    };
    //忘记密码，获取邮箱验证码
    handleVerifyMailCode=()=>{
        console.log("我来获取忘记密码验证码了")
        let value = this.mailVerifyRef.current.props.value;//获取注册邮箱的值
        if(!value){
            this.formRef.current.validateFields(["resetVerifyMail"])
        }else {
            sendMailCode(value).then((res)=>{
                console.log("获取忘记密码邮箱验证码",res)
                if(res.data.code === 200) {
                    this.setState({
                        getMessageCodeDisabled:true
                    })
                    message.info("获取成功");
                }else{
                    message.info("验证码错误,请重新获取!")
                }
            }).catch( (err)=>{
                message.info("网络堵车,请重新获取验证码嗷~")
            })
        }
    };
    //忘记密码提交触发的函数
    handleResetSubmit=(ev)=>{
        console.log("我来忘记密码修改密码了")
        this.formRef.current.validateFields().then( value => 
            console.log(value) 
        ).catch( errorInfo => console.log(errorInfo))
        // this.props.form.validateFields(
        //     ["resetVerifyMail","resetVerifyCode","resetPassword"],
        //     (err,values)=>{
        //         if(err){
        //             ev.preventDefault();
        //         }else {
        //             ev.preventDefault();
        //             //验证邮箱验证码
        //             checkMailCode(values.resetVerifyMail,values.resetVerifyCode).then( (res)=>{
        //                 console.log("验证忘记密码验证码",res)
        //                 if(res.data.code === 200){
        //                     this.props.form.resetFields()
        //                     //修改密码
        //                     resetPasswordByMail(values.resetVerifyMail,values.resetPassword).then( (res)=>{
        //                         console.log("验证忘记密码修改密码",res)
        //                         if(res.data.code === 200) {
        //                             message.info("修改密码成功~")
        //                             this.props.form.resetFields()
        //                             this.switchToLogin()
        //                         }else {
        //                             message.info("邮箱不存在，修改密码失败!")
        //                             this.props.form.resetFields()
        //                             this.switchToRegister()
        //                         }
        //                     }).catch( (err)=>{
        //                         message.info("网络堵车,请重新修改密码嗷~")
        //                         console.log( message )
        //                     } )
        //                 }else if(res.data.code === 403){
        //                     this.props.form.resetFields()
        //                     message.info("验证码错误!")
        //                 }
        //             }).catch( (err)=>{
        //                 message.info("网络堵车,请重新获取验证码嗷~")
        //                 console.log( message )
        //             } )
        //         }
        //     })
    }

    render() {

        return (
            <div className='notLogin' style={{ position:"relative",color:"#000" }}>
                <div style={{ cursor:"pointer", }}>
                    <span
                        style={{ marginRight:"10px" }}
                        onClick={ ()=>this.mailLogin() }
                    >登录
                    </span>

                    {/* 邮箱登录的弹出框 */}
                    <Modal
                        visible={this.state.mailVisible}
                        onCancel={ ()=>this.onMailLoginCancel() }
                        footer={[
                            <Button
                                type="primary"
                                key='register'
                                style={{ float:"left" }}
                                onClick={ ()=>this.switchToRegister() }
                            >没有账号?免费注册
                            </Button>,
                            <Button
                                type="primary"
                                key='forgetPassword'
                                style={{ float:"right" }}
                                onClick={ ()=>this.switchToReset() }
                            >忘记密码?
                            </Button>,
                            <div key='clear' style={{ clear:"both" }}></div>
                        ]}
                        style={{ marginTop:"-50px",marginBottom:"50px" }}
                        width={350}
                    >
                        <div style={{ textAlign:"center",paddingTop:"30px" }}>
                            <Form ref={this.formRef} onFinish={ (ev)=>this.handleMailSubmit(ev) }>
                                <Form.Item
                                    name="mailAccount"
                                    rules={[
                                        { required: true, message:'邮箱账号不能为空' },
                                        { pattern:/^\w+@((\w+\.){1,2})(com|net)/g, message:"邮箱账号格式不正确" }
                                    ]}
                                >
                                    <Input 
                                        autoComplete="off" 
                                        placeholder="请输入邮箱账号"  
                                        style={{ width:"100%" }} />
                                </Form.Item>
                                <Form.Item
                                    name="mailPassword"
                                    rules={[
                                        { required: true, message:"密码不能为空" },
                                        { pattern:/^[a-zA-Z0-9~!@#$%^&*()_+`={}|:";'<>?,.]+$/g,message:"密码不能含有非法字符" }
                                    ]}
                                >
                                    <Input.Password 
                                        placeholder='请输入密码' />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        loading={this.state.mailLoading}
                                        htmlType="submit"
                                        style={{ width:"70%",marginTop:"20px" }}
                                    >登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>

                    {/* 注册的弹出框 */}
                    <Modal
                        visible={this.state.registerVisible}
                        onCancel={ ()=>this.onRegisterCancel()}
                        footer={[
                            <Button
                                type="primary"
                                key='login'
                                onClick={ ()=>this.switchToLogin()}
                                style={{ float:"left"}}
                            >已有账号?点击登录
                            </Button>,
                            <div key='clear' style={{ clear:"both" }}></div>
                        ]}
                        style={{ marginTop:"-50px",marginBottom:"50px" }}
                    >
                        <div style={{ textAlign:"center",paddingTop:"30px" }}>
                            <Form ref={this.formRef} onFinish={ (ev)=>this.handleRegisterSubmit(ev) } >
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
                                <Form.Item
                                    label="设置密码"
                                    labelCol={{span:5}}
                                    wrapperCol={{span:16}}
                                    name="registerPassword"
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
                                          required: true
                                        },
                                        ({ getFieldValue }) => ({
                                          validator(rule, value) {
                                            if (!value || getFieldValue('registerPassword') === value) {
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
                                <Form.Item
                                    label="邮箱"
                                    labelCol={{span:5}}
                                    wrapperCol={{span:16}}
                                    name="registerMail"
                                    rules={[
                                        { required: true, message:'邮箱不能为空' },
                                        { pattern:/^\w+@((\w+\.){1,2})(com|net)/g,message:"邮箱账号格式不正确"}
                                    ]}
                                >
                                    <Input
                                        ref={ this.mailRegisterRef }
                                        placeholder="0~18位，仅含@.com/net"
                                        style={{ width:"100%" }}
                                        autocomplete="off" />
                                </Form.Item>
                                <Form.Item
                                    label="验证码"
                                    labelCol={{span:5}}
                                    wrapperCol={{span:16}}
                                    name="registerVerifyCode"
                                    rules={[
                                        {required:true,message:"验证码不能为空"},
                                        {pattern:/^[0-9]+$/g,message:"验证码不能含有非法字符"},
                                        {len:6,message: '验证码为6个数字'}
                                    ]}
                                >
                                    <div style={{ width:"100%",display:"inline" }}>
                                        <Input placeholder='请输入验证码' style={{ width:"50%"}} autocomplete="off"/>
                                        <Button
                                            type="primary"
                                            onClick={ ()=>this.handleRegisterMailCode() }
                                            style={{ width:"40%",marginLeft:"10%" }}
                                        >获取验证码
                                        </Button>
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary'  htmlType="submit" style={{ width:"70%",marginTop:"20px"}} >注册
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>

                    {/* 忘记密码的弹出框 */}
                    <Modal
                        visible={this.state.resetVisible}
                        onCancel={ ()=>this.onResetCancel() }
                        footer={[
                            <Button
                                type="primary"
                                key='register'
                                style={{ float:"left" }}
                                onClick={ ()=>this.switchToLogin() }
                            >返回
                            </Button>,
                            <div key='clear' style={{ clear:"both" }}></div>
                        ]}
                        style={{ marginTop:"-50px",marginBottom:"50px" }}
                    >
                        <div style={{ textAlign:"center",paddingTop:"30px" }}>
                            <Form ref={this.formRef} onFinish={ (ev)=>this.handleResetSubmit(ev) }>
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
                                        autocomplete="off" />
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
                                        <Input placeholder='请输入验证码' style={{ width:"50%"}} autocomplete="off"/>
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
                                          required: true
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
            </div>
        )
    }
}


export default (withRouter(NotLoginMenu))