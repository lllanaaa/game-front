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



