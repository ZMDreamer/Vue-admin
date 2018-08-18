<template>
  <div class="productList">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        商品管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="addCategory">添加分类</el-button>
    <!-- 自定义组件 -->
    <tree-grid :treeStructure="true" :columns="columns" :data-source="dataSource" @deleteCate="deleteCategory" @editCate="editCategory">
    </tree-grid>
    <!-- 分页模块 -->
    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5, 10, 15, 20]"
        :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="categoryForm">
      <el-form :model="categoryFormData" ref="categoryFormData" label-width=120px :rules="rules">
        <el-form-item label="分类名称:" prop='cat_name'>
          <el-input v-model="categoryFormData.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级名称:">
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" :props="defaultProps">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoryForm = false">取 消</el-button>
        <el-button type="primary" @click="submitCategoryForm('categoryFormData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import TreeGrid from '@/views/components/TreeGrid/TreeGrid.vue'
  import {
    getGoodsList,
    addGoodCategory
  } from '@/api'
  export default {
    components: {
      TreeGrid
    },
    created() {
      this.initGoodsList()
    },
    data() {
      return {
        pagesize: 5,
        pagenum: 1,
        totalNum: 0,
        dataSource: [],
        columns: [{
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        }, {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        }, {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }],
        options: [],
        selectedOptions: [],
        categoryForm: false,
        categoryFormData: {
          cat_name: '',
          cat_level: '',
          cat_pid: ''
        },
        defaultProps: {
          label: 'cat_name',
          value: 'cat_id'
        },
        rules: {
          cat_name: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }]

        }
      }
    },
    methods: {
      deleteCategory(cid) {
        console.log(cid)
      },
      editCategory(cid) {
        console.log(cid)
      },
      //获取初始数据
      initGoodsList() {
        getGoodsList({
          type: [1, 2, 3],
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }).then(res => {
          if (res.meta.status === 200) {
            this.dataSource = res.data.result

            this.totalNum = res.data.total
            // res.data.result.forEach(firstLayer => {
            //   if (firstLayer.cat_level === 0) {
            //     firstLayer.cat_deleted = '否'
            //     firstLayer.cat_level = '一级'
            //     firstLayer.children.forEach(secondLayer => {
            //       if (secondLayer.cat_level === 1) {
            //         secondLayer.cat_deleted = "否"
            //         secondLayer.cat_level = '二级'
            //         secondLayer.children.forEach(lastLayer => {
            //           if (lastLayer.cat_level === 2) {
            //             lastLayer.cat_deleted = '否'
            //             lastLayer.cat_level = '三级'
            //           }
            //         })
            //       }
            //     })
            //   }
            // })
          }
        })
      },
      //分页切换
      handleSizeChange(val) {
        this.pagesize = val
        this.initGoodsList()
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.initGoodsList()
      },
      //联动值改变时触发
      handleChange(value) {},
      //添加分类
      addCategory() {
        this.categoryForm = true
        getGoodsList({
          type: [2]
        }).then(res => {
          if (res.meta.status === 200) {
            this.options = res.data
          }
        })
      },

      //发送添加axios请求
      submitCategoryForm(form) {
        console.log(this.selectedOptions)

        this.$refs[form].validate(valid => {
          if (valid) {
            if (this.selectedOptions.length === 0) {
              this.categoryFormData.cat_pid = 0
              this.categoryFormData.cat_level = 0
            } else if (this.selectedOptions.length === 1) {
              this.categoryFormData.cat_level = 1
              this.categoryFormData.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]

            } else if (this.selectedOptions.length == 2) {
              this.categoryFormData.cat_level = 2
              this.categoryFormData.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]

            }
            addGoodCategory(this.categoryFormData).then(res => {
              if (res.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: res.meta.msg
                })
                this.initGoodsList()
                this.categoryForm = false
              } else {
                this.$message({
                  type: 'error',
                  message: res.meta.msg
                })
              }
            })

          } else {
            return false
          }
        })
      }


    }
  }

</script>
<style lang="scss" scoped>
  .productList {
    .page {
      margin-top: 10px;
      padding: 5px 0;
      background-color: #D3DCE6;
    }
  }

</style>
