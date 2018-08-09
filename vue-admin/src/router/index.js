import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Container from '@/views/main/Container'
import User from "@/views/user/User"
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect:{path:'/Container'},
      children:[
        {
          name: 'Conatiner',
          component: Container,
          path:'Container'

        },
        {
          name: 'User',
          component: User,
          path: 'user'
        }

      ]
    }

  ]
})
