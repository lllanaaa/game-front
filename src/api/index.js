import axios from 'axios';

export const baseURL = "http://47.115.166.190:8080";
// export const baseURL = "http://192.168.43.241:8080/"

//获取轮播图
export const getSongBanner = () =>{
    const url = `${baseURL}/shoppingMall/banner`;
    return axios.get( url)
};

export const getSongDiscount = () =>{
    const url = `${baseURL}/shoppingMall/discount`;
    return axios.get( url )
};

export const getSongRecommend = () =>{
    const url = `${baseURL}/shoppingMall/recommend`;
    return axios.get( url )
};

export const getSongLastest = () =>{
    const url = `${baseURL}/shoppingMall/lastest`;
    return axios.get( url )
};

export const getGameDetail = (id) => {
    const url = `${baseURL}/game?id=${id}`;
    return axios.get( url )
};

export const addUserList = (gameId, userId) => {
    const url = `${baseURL}/addList`;
    return axios.get(url, {
        params: {
            gameId,
            userId
        }
    })
};

export const addComment = (gameId, userId, content, time) => {
    const url = `${baseURL}/addComment`;
    return axios.get(url, {
        params: {
            gameId,
            userId,
            content,
            time
        }
    })
};


// 邮箱注册
export const register = (nickname,gender,registerPassword,registerMail) => {
    const url = `${baseURL}/register`;
    return axios.get(url,{
        params:{
            userName:nickname,
            gender:gender,
            registerPassword:registerPassword,
            registerMail:registerMail,
        }
    });
};

// 发送邮箱注册验证码
export const sendMailCode = (registerMail) =>{
    console.log(registerMail)
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
    },{ withCredentials:true });
};

// 登录
export const login = (loginMail,loginPassword) => {
    const url = `${baseURL}/login`;
    return axios.get(url,{
        params:{
            loginMail: loginMail,
            loginPassword: loginPassword,
        }
    },{ withCredentials:true });
};

// 忘记密码
export const resetPasswordByMail = (resetVerifyMail,resetPassword) =>{
    const url = `${baseURL}/resetPassword`;
    return axios.get(url,{
        params:{
            resetMail: resetVerifyMail,
            resetPassword:resetPassword,
        }
    });
};

//获取购物车游戏信息
export const getMyCartInfo = (userId) => {
    const url = `${baseURL}/myCart`;
    return axios.get(url,{
        params:{
            userId: userId
        }
    })
}

//删除购物车某个商品
export const deleteMyCartGame = (userId,gameId) => {
    const url = `${baseURL}/deleteGame`;
    return axios.get(url,{
        params:{
            userId: userId,
            gameId: gameId
        }
    })
}

//删除购物车所有商品
export const deleteMyCartAllGame = (userId) => {
    const url = `${baseURL}/deleteAllGame`;
    return axios.get(url,{
        params:{
            userId: userId
        }
    })
}

//购买购物车所有商品
export const buyMyCartAllGame = (userId) => {
    const url = `${baseURL}/buyGame`;
    return axios.get(url,{
        params:{
            userId: userId
        }
    })
}

//模糊查询搜索商品
export const searchGame = (content) => {
    const url = `${baseURL}/search`;
    return axios.get(url,{
        params:{
            content: content
        }
    })
}

//修改基本信息
export const changeInfo = (userId,userName,gender) => {
    const url = `${baseURL}/settingInfo`;
    return axios.get(url,{
        params:{
            userId:userId,
            userName:userName,
            gender:gender
        }
    })
}

//修改邮箱
export const changeMail = (userId,mail) => {
    const url = `${baseURL}/settingMail`;
    return axios.get(url,{
        params:{
            userId:userId,
            mail:mail
        }
    })
}

//修改密码
export const changePassword = (userId,newPassword) => {
    const url = `${baseURL}/settingPassword`;
    return axios.get(url,{
        params:{
            userId:userId,
            newPassword:newPassword
        }
    })
}

//验证原密码
export const checkPassword = (userId,oldPassword) => {
    const url = `${baseURL}/settingOldPassword`;
    return axios.get(url,{
        params:{
            userId:userId,
            oldPassword:oldPassword
        }
    })
}

//获取热销商品
export const getHot = () => {
    const url = `${baseURL}/classifyHot`;
    return axios.get(url)
}

//获取好评商品
export const getGood = () => {
    const url = `${baseURL}/classifyGood`;
    return axios.get(url)
}

//获取即将发行商品
export const getWill = () => {
    const url = `${baseURL}/classifyWill`;
    return axios.get(url)
}

//获取游戏库游戏信息
export const getMyGameInfo = (userId) => {
    const url = `${baseURL}/myGame`;
    return axios.get(url,{
        params:{
            userId: userId
        }
    })
}