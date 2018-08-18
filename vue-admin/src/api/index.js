import axios from "axios"
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

//axios登录验证拦截功能
axios.interceptors.request.use (function (config) {
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



// 登录验证
export const checkLogin = params =>{
    return axios.post('login',params).then(res=>res.data)
}
// 获取用户列表页的数据
export const queryUserData = params=>{
    return axios.get('/users',params).then(res=>res.data)
}
//修改用户状态
export const changeUserState=params=>{
    return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data)
}
// 添加用户
export const addUser=params=>{
    return axios.post('users',params).then(res=>res.data)
}
// 编辑用户状态
export const editUserData=params=>{
    return axios.put(`users/${params.id}`,params).then(res=>res.data)
}
// 删除用户信息
export const deleteUserData=params=>{
    return axios.delete(`users/${params.id}`,params).then(res=>res.data)
}
// 获取角色列表
export const getRoles=params=>{
    return axios.get('roles').then(res=>res.data)
}
// 分配角色列表
export const dispatchRole=params=>{
    return axios.put(`users/${params.id}/role`,params).then(res=>res.data)
}
// 删除角色列表
export const deleteAssignRight = params=>{
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`,params).then(res=>res.data)
}
// 获取树状权限列表
export const getRightList = (params)=>{
    return axios.get(`rights/${params.type}`).then(res=>res.data)
}
// 角色授权
export const setRoleRights = (roleId,rids)=>{
    return axios.post(`roles/${roleId}/rights`,rids).then(res=>res.data)
}
// 根据登录角色的权利(token)值来获取不同的权利列表,左侧权限列表
export const getLeftMenus = () => {
    return axios.get('menus').then(res => res.data)
}
//获取商品数据列表
export const getGoodsList = params => {
    return axios.get('categories',{params:params}).then(res => res.data)
}
//添加商品分类
export const addGoodCategory = params =>{
    return axios.post('categories',{cat_pid:params.cat_pid,cat_name:params.cat_name,cat_level:params.cat_level}).then(res=>res.data)
}