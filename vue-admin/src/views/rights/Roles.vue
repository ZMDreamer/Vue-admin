<template>
  <div class="roles">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        权限管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格类容 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand" width="50" align=center v-loading="loading">
          <!-- 权限小列表 -->
          <template slot-scope="scope">
            <el-row v-for="firstTagList in scope.row.children" :key="firstTagList.id">
              <el-col :span="4">
                <el-tag closable @close="deleteRight(scope.row,firstTagList.id)">
                  {{firstTagList.authName}}
                </el-tag>
                <i class="el-icon-arrow-right"></i>

              </el-col>
              <el-col :span="20">
                <el-row v-for="secondTagList in firstTagList.children" :key="secondTagList.id">
                  <el-col :span="4">
                    <el-tag closable type="success" @close="deleteRight(scope.row,secondTagList.id)">
                      {{secondTagList.authName}}
                    </el-tag>
                    <i class="el-icon-arrow-right"></i>

                  </el-col>
                  <el-col :span="20">
                    <el-tag closable v-for="thirdTagList in secondTagList.children" :key="thirdTagList.id" @close="deleteRight(scope.row,thirdTagList.id)">
                      {{thirdTagList.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="scope.row.children.length==0">
              <el-col :span="24">该角色没有分配权限，请前往分配！</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180" align=center>
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180" align=center>
        </el-table-column>
        <el-table-column label="操作" align=center>
          <template slot-scope="scope">
            <el-button type="success" plain icon="el-icon-edit"></el-button>
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
            <el-button type="danger" plain icon="el-icon-check" @click="changeRight(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="授权角色:" :visible.sync="dialogFormVisible">
        <div class="tree">
          <el-tree :data="rightList" show-checkbox node-key="id" :default-expand-all=true :default-checked-keys="selectedList" :props="defaultProps"
            ref="tree">
          </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="setRights">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {
    getRoles,
    deleteAssignRight,
    getRightList,
    setRoleRights
  } from '@/api'
  export default {
    data() {
      return {
        tableData: [],
        loading: true,
        tagList: [],
        dialogFormVisible: false,
        rightList: [],
        selectedList: [],
        currentRow: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        }

      }
    },
    created() {
      this.initRoleList()
    },
    methods: {
      //初始化数据
      initRoleList() {
        getRoles().then(res => {
          if (res.meta.status === 200) {
            this.tableData = res.data
          }
        })
      },
      //删除角色指定的权利
      deleteRight(row, rightId) {
        let roleId = row.id
        deleteAssignRight({
          roleId: roleId,
          rightId: rightId
        }).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            row.children = res.data
          } else {
            this.$message({
              type: 'error',
              message: res.meta.msg
            })
          }
        })
      },
      // 修改角色权限
      changeRight(row) {
        this.currentRow = row
        this.dialogFormVisible = true
        getRightList({
          type: 'tree'
        }).then(res => {
          if (res.meta.status === 200) {
            this.rightList = res.data
          } else {
            this.$message({
              type: 'error',
              message: res.meta.msg
            })
          }
          // 设置默认选中的权限树
          this.selectedList.length = 0
          this.currentRow.children.forEach(firstLayer => {
            if (firstLayer.children.length !== 0 && firstLayer) {
              firstLayer.children.forEach(secondLayer => {
                if (secondLayer && secondLayer.children.length !== 0) {
                  secondLayer.children.forEach(thirdLayer => {
                    this.selectedList.push(thirdLayer.id)
                  })
                }
              })
            }

          })
        })
      },
      // 点击确定修改角色权限
      setRights() {
        let rids = this.$refs.tree.getCheckedKeys().join(',')
        let roleId = this.currentRow.id
        setRoleRights(roleId, {
          rids: rids
        }).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            this.dialogFormVisible = false
            this.initRoleList()
          }
        })
      }


    }
  }

</script>
<style lang="scss" scoped>
  .roles {
    .el-tag {
      margin-right: 5px;
      margin-bottom: 5px;
    }
    .tree {
      overflow: auto;
      height: 300px;
    }
  }

</style>
