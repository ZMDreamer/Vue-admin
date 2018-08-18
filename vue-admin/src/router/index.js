import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Container from '@/views/main/Container'
import Users from "@/views/user/User"
import Roles from "@/views/rights/Roles"
import Rights from "@/views/rights/Rights"
import Categories from '@/views/product/Categories'
import CategoryParams from '@/views/product/CategoryParams'
import ProductList from '@/views/product/ProductList'
import AddGoods from '@/views/product/AddGoods'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: {
        path: '/Container'
      },
      children: [{
          name: 'Conatiner',
          component: Container,
          path: 'container'

        },
        {
          name: 'Users',
          component: Users,
          path: 'users'
        },
        {
          name: 'Roles',
          component: Roles,
          path: 'roles'
        },

        {
          name: 'Rights',
          component: Rights,
          path: 'rights'
        },
        {
          name: 'Categories',
          component: Categories,
          path: 'categories'
        },
        {
          name: 'CategoryParams',
          component: CategoryParams,
          path: 'params'
        },
        {
          name: 'ProductList',
          component: ProductList,
          path: 'goods'
        },
         {
           name: 'AddGoods',
           component: AddGoods,
           path: 'toadd'
         }

      ]
    }

  ]
})
