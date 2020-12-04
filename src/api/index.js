import axios from 'axios';

export const baseURL = "localhost:8080";

//获取轮播图
export const getSongBanner = () =>{
    const url = `${baseURL}/shoppingMall/banner`;
    return axios.get( url,{ withCredentials: true } )
};

export const getSongDiscount = () =>{
    const url = `${baseURL}/shoppingMall/discount`;
    return axios.get( url,{ withCredentials: true } )
};

export const getSongRecommend = () =>{
    const url = `${baseURL}/shoppingMall/recommend`;
    return axios.get( url,{ withCredentials: true } )
};

export const getSongLastest = () =>{
    const url = `${baseURL}/shoppingMall/lastest`;
    return axios.get( url,{ withCredentials: true } )
};

export const getGameDetail = (id) => {
    const url = `${baseURL}/game?id=${id}`;
    return axios.get( url,{ withCredentials: true } )
};

export const addUserList = (gameId, userId) => {
    const url = `${baseURL}/addList`;
    return axios.get(url, {
        params: {
            gameId,
            userId
        }
    }, {withCredentials: true})
};


// 邮箱注册
export const register = (nickname,gender,registerPassword,registerMail) => {
    const url = `${baseURL}/register`;
    return axios.get(url,{
        params:{
            nickname:nickname,
            gender:gender,
            registerPassword:registerPassword,
            registerMail:registerMail,
        }
    }, { withCredentials:true });
};

// 发送邮箱注册验证码
export const sendMailCode = (registerMail) =>{
    const url =`${baseURL}/register/sendCode`;
    return axios.get(url,{
        params:{
            registerMail:registerMail,
        }
    },{ withCredentials:true });
};

// 验证邮箱注册验证码
export  const checkMailCode = (registerMail,registerVerifyCode) =>{
    const url = `${baseURL}/register/checkCode`;
    return axios.get(url,{
        params:{
            registerVerifyCode:registerVerifyCode,
            registerMail:registerMail,
        }
    }, { withCredentials:true });
};

// 登录
export const login = (loginMail,loginPassword) => {
    console.log(loginMail)
    const url = `${baseURL}/login`;
    return axios.get(url,{
        params:{
            loginMail: loginMail,
            loginPassword: loginPassword,
        }
    }, { withCredentials:true });
};

// 忘记密码
export const resetPasswordByMail = (resetVerifyMail,resetPassword) =>{
    const url = `${baseURL}/resetPassword`;
    return axios.get(url,{
        params:{
            resetVerifyMail: resetVerifyMail,
            resetPassword:resetPassword,
        }
    }, { withCredentials:true });
};


