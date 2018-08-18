<template>
  <div class="addGoods">
    <!-- 头部导航面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        商品管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- tab栏组件 -->
    <div class="tabContent">
      <el-tabs v-model="activeName" @tab-click="handleClick" tab-position=left>
        <el-tab-pane label="基本信息" name="0">
          <el-form label-width="80px">
            <el-form-item label="活动名称">
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
        <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload 
          action="http://localhost:8888/api/private/v1/upload" 
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :headers="setRequestHeader()"
          list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        activeName: 0,
      }
    },
    methods: {
      handleClick(tab) {
        this.active = +tab.index
        this.activeName = tab.index
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //设置请求头里面的token通过验证
      setRequestHeader() {
        let token = localStorage.getItem('token')
        if (token) {
         return {
            Authorization: token
          }
        } else {
          this.$message({
            type: 'error',
            message: '身份验证失败请重新登录'
          })
        }
      },
      uploadSuccess (response,file,fileList) {
        if(response.meta.status === 200){
          this.$message({
            type:'success',
            message: response.meta.msg
          })
        }else{
          this.$message({
            type:'error',
            message: '上传失败'
          })
        }
      }

    }

  }

</script>
<style lang="scss" scoped>
  .addGoods {
    .tabContent {
      margin-top: 20px;
    }
  }

</style>
