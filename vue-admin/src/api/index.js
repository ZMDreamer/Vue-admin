import axios from "axios"
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

//axios登录验证拦截功能
axios.interceptors.request.use(function (config) {
    // 获取本地存储的token值
    let token = localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = token
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });



//登录验证
export const checkLogin = params =>{
    return axios.post('login',params).then(res=>res.data);
}