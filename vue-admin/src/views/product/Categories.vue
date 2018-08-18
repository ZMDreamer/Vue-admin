<template>
  <div class="category">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        商品管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="addGoods">添加商品</el-button>
  </div>
</template>
<script>
  export default {
    methods: {
      addGoods() {
        //编程式路由导航
        this.$router.push({
          name: 'AddGoods'
        })
      }
    }
  }

</script>
<style lang="scss" scoped>


</style>
