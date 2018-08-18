// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import Vuex from 'vuex'
Vue.use(ElementUI);
Vue.config.productionTip = false
//路由拦截
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  let token = localStorage.getItem('token')
  if (token) {
    next()

  } else {
    if (to.path !== '/login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})
//引入Vuex来进行全局的数据共享
Vue.use(Vuex)
//创建实例
const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    changeUsername(state, name) {
      state.username = name
      localStorage.setItem('username', name)

    }
  },
  //getters有点类似计算属性computed
  getters: {
    username: state => localStorage.getItem('username')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
