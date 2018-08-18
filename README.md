# admin

> this is a admin project using vue.js
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 搭建项目环境
+  输入vue init webpack '项目名称',搭建好项目环境
+  项目初始化
      1. 引入styles来覆盖、重置一些样式、通用样式等
      2. 安装相关处理sass相关的loader
+ 完成登录页面
      1. 利用`localstorage`记录`token`的值以及`axios.interceptors.request`来完成发请求的拦截功能
      2. 登录成功跳转到主路由页面
      3. 利用`router.beforEach`完成router拦截功能
