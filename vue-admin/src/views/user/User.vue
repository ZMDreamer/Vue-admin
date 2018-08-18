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
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" @keydown.native.enter="init">
            <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
          </el-input>
          <el-button type="success" class="addUser" plain @click="addUserForm=true">添加用户</el-button>
        </div>

      </el-col>
    </el-row>

    <!-- 表格类容 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50" v-loading="loading">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeUserStatus(scope.row)">
            </el-switch>
          </template>

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain icon="el-icon-edit" @click="editUser(scope.row)"></el-button>
            <el-button type="danger" plain icon="el-icon-delete" @click="deleteUser(scope.row)"></el-button>
            <el-button type="danger" plain icon="el-icon-check" @click="grantUser(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页模块 -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5, 10, 15, 20]"
        :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>
    <!-- 添加用户弹框模块 -->
    <el-dialog title="添加用户" :visible.sync="addUserForm">
      <el-form :model="addForm" ref="addForm" :label-width="formLabelWidth" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserForm = false">取 消</el-button>
        <el-button type="primary" @click="addFormData('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户信息模块 -->
    <el-dialog title="编辑用户" :visible.sync="editUserForm">
      <el-form :model="editForm" ref="editForm" :label-width="formLabelWidth" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" :disabled=true></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserForm = false">取 消</el-button>
        <el-button type="primary" @click="editFormData('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色分配模块 -->
    <el-dialog title="用户权限修改" :visible.sync="grantUserForm">
      <el-form :model="grantForm" ref="grantForm" :label-width="grantState" :rules="rules">
        <el-form-item label="用户名:" prop="username">
          <span>{{grantForm.username}}</span>
        </el-form-item>
        <el-form-item label="权限列表:">
          <el-select v-model="userId" placeholder="权限列表">
            <el-option v-for="(item,index) in roleLists" :key="index" :value="item.id" :label="item.roleName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantUserForm = false">取 消</el-button>
        <el-button type="primary" @click="grantFormData('grantForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  //引入获取用户列表信息的api请求
  import {
    queryUserData,
    changeUserState,
    addUser,
    editUserData,
    deleteUserData,
    getRoles,
    dispatchRole
  } from '@/api'
  export default {
    //组件实例化完成, 属性已绑定,dom未完成
    created() {
      this.init()
    },
    data() {
      return {
        input5: '',
        pagesize: 5,
        pagenum: 1,
        totalNum: 0,
        tableData: [],
        formLabelWidth: '80px',
        editUserForm: false,
        loading:true,
        editForm: {
          username: '',
          email: '',
          mobile: ''
        },
        addUserForm: false,
        addForm: {
          username: '',
          email: '',
          mobile: '',
          password: ''
        },
        grantUserForm: false,
        grantState: '120px',
        userId: '',
        grantForm: {},
        roleLists: null,
        rules: {
          username: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }],
          password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }],
          mobile: [{
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          }],
          email: [{
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          }, {
            type: 'email',
            message: '请输入正确邮箱格式',
            trigger: 'blur'
          }]
        }

      }
    },
    methods: {
      handleSizeChange(val) {
        this.pagesize = val
        this.init()
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.init()
      },
      //获取用户列表数据
      init() {
        queryUserData({
          params: {
            query: this.input5,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        }).then(res => {
          if (res.meta.status === 200) {
            this.tableData = res.data.users
            this.totalNum = res.data.total
          }
        })
      },
      //修改用户状态
      changeUserStatus(data) {
        //调用api接口函数
        changeUserState({
          uid: data.id,
          type: data.mg_state
        }).then(res => {
          //利用element-ui提示
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.meta.msg,
              type: 'warning'
            })
          }

        })

      },
      //添加用户
      addFormData(formData) {
        this.$refs[formData].validate(valid => {
          if (valid) {
            addUser(this.addForm).then(res => {
              if (res.meta.status === 201) {
                this.$message({
                  message: res.meta.msg,
                  type: 'success'
                })
                this.addUserForm = false
                this.init()
              } else {
                this.$message({
                  message: res.meta.msg,
                  type: 'error'
                })
              }
            })
          }
        })
      },
      //编辑用户信息
      editUser(data) {
        this.editUserForm = true
        this.editForm = data
      },
      //点击编辑提交按钮
      editFormData(formData) {
        this.$refs[formData].validate(valid => {
          if (valid) {
            editUserData({
              id: this.editForm.id,
              mobile: this.editForm.mobile,
              email: this.editForm.email
            }).then(res => {
              if (res.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.meta.msg
                })
                this.editUserForm = false
                this.init()

              } else {
                this.$message({
                  type: 'error',
                  message: res.meta.msg
                })
              }
            })
          }
        })


      },
      //点击删除该条用户数据
      deleteUser(formData) {
        this.$confirm('此操作将永久删除改用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteUserData({
            id: formData.id
          }).then(res => {
            if (res.meta.status == 200) {
              this.init()
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      //权限分配
      grantUser(data) {
        this.grantUserForm = true
        this.grantForm = data
        //获取角色列表
        getRoles().then(res => {
          if (res.meta.status == 200) {
            this.roleLists = res.data
          }
        })

      },
      //分配用户角色
      grantFormData(grantForm) {
        //验证角色输入非空
        if (this.userId === '') {
          this.$message({
            type: 'error',
            message: '请选择用户角色'
          })
        } else {
          dispatchRole({
            id: this.grantForm.id,
            rid: this.userId
          }).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.grantUserForm = false
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
            }
          })
        }

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
