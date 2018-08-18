<template>
  <div class="right">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        权限管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格类容 -->
    <div class="table">
      <el-table :data="rightLists" border style="width: 100%">
        <el-table-column type="index" width="50" align=center v-loading=true>
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" align=center>
        </el-table-column>
        <el-table-column prop="path" label="路径" align=center>
        </el-table-column>
        <el-table-column label="层级" align=center>
          <template slot-scope="scope">
            <span>{{scope.row.level|formatLevels}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {
    getRightList
  } from '@/api'
  export default {
    data () {
      return {
        rightLists: [],
      }
    },
    created() {
      this.initRightList ()
    },
    filters: {
      formatLevels (level) {
        if (level === '0') {
          return "一级"
        } else if (level === '1') {
          return '二级'
        } else if (level === '2') {
          return '三级'
        }
      }
    },
    methods: {
      initRightList () {
        getRightList ({
          type: 'list'
        }).then(res => {
          this.rightLists = res.data
        })
      }
    }
  }

</script>
<style lang = "scss" scoped>


</style>

