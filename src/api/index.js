import axios from 'axios';

export const baseURL = "localhost:8000";

//获取轮播图
export const getSongBanner = () =>{
    const url = `${baseURL}/shoppingMall/banner`;
    return axios.get( url,{ withCredentials: true } )
};



