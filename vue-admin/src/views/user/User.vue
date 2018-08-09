<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <!-- 类容部分头部 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">活动管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <div class="search-input">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" class="addUser" plain>添加用户</el-button>
        </div>

      </el-col>
    </el-row>

    <!-- 表格类容 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="create_time" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮件">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch v-model="value">
            </el-switch>
          </template>

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain icon="el-icon-edit"></el-button>
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
            <el-button type="danger" plain icon="el-icon-check"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分类模块 -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]"
        :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  //引入获取用户列表信息的api请求
  import {
    queryUserData
  } from '@/api'
  export default {
    //组件实例化完成, 属性已绑定,dom未完成
    created() {
      this.init()
    },
    data() {
      return {
        input5: '',
        value: true,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        tableData: []
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //获取用户列表数据
      init() {
        queryUserData({
          params: {
            query: '',
            pagenum: '1',
            pagesize: '4'
          }
        }).then(res => {
          if (res.meta.status === 200) {
            res.data.users.map((value, index) => {
              return value.create_time = new Date(value.create_time).toLocaleString()
            })
            this.tableData = res.data.users

          }
        })
      }
    },
  }

</script>
<style lang="scss" scoped>
  /* 搜索页以及分页的css */

  .user {
    .search-input {
      width: 300px;
      margin-bottom: 10px;
      position: relative;
      .addUser {
        position: absolute;
        right: -50%;
        top: 0;
      }
    }


    .page {
      margin-top: 10px;
      padding: 5px 0;
      background-color: #D3DCE6;
    }
  }

</style>
