<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu 
          :router="true"
          :unique-opened="true"
          :collapse="isCollapse"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu :index="firstLayerList.path" v-for="firstLayerList in leftMenuLists" :key="firstLayerList.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{firstLayerList.authName}}</span>
            </template>
            <el-menu-item :index='secondLayerList.path' v-for="secondLayerList in firstLayerList.children" :key="secondLayerList.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{secondLayerList.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i class=" myicon myicon-menu toggle-btn " @click="isCollapse=!isCollapse"></i>
          <div class="system-title">电商后台管理系统</div>
          <div class="welcome">
            <span>欢迎您, {{$store.getters.username}}!</span>
            <el-button type="text" class="logout" @click="logoutEvent">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import {
    getLeftMenus
  } from '@/api'
  export default {
    data() {
      return {
        isCollapse: false,
        leftMenuLists: []
      }
    },
    created() {
      getLeftMenus().then(res => {
        this.leftMenuLists = res.data
      })
    },
    methods: {
      handleOpen(key, keyPath) {},
      handleClose(key, keyPath) {},
      //点击退出登录
      logoutEvent() {
        //清除登录时记录的token值
        localStorage.removeItem('token')
        //跳转到登录页面
        this.$router.push({
          name: 'login'
        })
      }
    }
  };

</script>
<style lang="scss" scoped>
  .home {
    height: 100%;
    background-color: #eee;
    .el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
      border: none;
    }
    .el-container {
      height: 100%;

    }
    .el-aside {
      height: 100%;
      background-color: #545c64;
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #009688;
    }
    .logo {
      height: 60px;
      background: url(../assets/logo.png);
      background-size: cover;
      background-color: white;
    }
    .toggle-btn {
      padding: 0 10px;
      margin-left: -20px;
      font-size: 36px;
      line-height: 60px;
      color: white;
      cursor: pointer;
      &:hover {
        background-color: #00635a;
      }
    }
    .system-title {
      font-size: 28px;
      color: white;
    }
    .welcome {
      color: white;
    }
    .logout {
      color: #fff;
      margin-left: 10px;

    }
  }

</style>
