<template>
<div>
  <div>
      <el-button  type="primary" @click="addNew()">新增用户</el-button>

<el-dialog title="新增用户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="账号" :label-width="formLabelWidth">
      <el-input v-model="form.userId" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户类型" :label-width="formLabelWidth">
      <el-select v-model="form.type" placeholder="用户类型">
        <el-option label="试题录入员" value="1"></el-option>
        <el-option label="试题管理员" value="2"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitAdd()">确 定</el-button>
  </div>
</el-dialog>

    </div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="电话号码"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>ID: {{ scope.row.id }}</p>
          <p>电话号码: {{ scope.row.phone }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.phone }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="用户类型"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-user-solid"></i>
        <span v-if="scope.row.type==1" style="margin-left: 10px">试题录入员</span>
        <span v-if="scope.row.type==2" style="margin-left: 10px">试题录管理员</span>
        <span v-if="scope.row.type==3" style="margin-left: 10px">超级管理员</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
    <el-button v-if="scope.row.type==1" slot="reference" @click="setManage(scope.row.id)">设置为试题管理员</el-button>
    <el-button 
    type="danger"
    slot="reference" @click="deleteUser(scope.row.id)">删除</el-button>

      </template>
    </el-table-column>
    
  </el-table>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        tableData: [{
          id: '1',
          phone: '11111111',
          type: '1'
        }, {
         id: '2',
          phone: '11111111',
          type: '2'
        }, {
          id: '3',
          phone: '11111111',
          type: '2'
        }, {
         id: '4',
          phone: '11111111',
          type: '3'
        }],
        status1: '',
        errormsg1: '',
        visible2: false,
        visible3: false,
        //tableData: []
        dialogFormVisible: false,
        form: {
          userId: '',
          password: '',
          type: '',
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleEdit(index, row) {
        //console.log(index, row);
      },
      handleDelete(index, row) {
        //console.log(index, row);
      },
      getdata(){
        axios({
            url:'/api/userManage/getUserList',
            headers: {Authorization: this.$store.state.token},
            method:'get',
            params: {
              userId: this.$store.state.user_id
            }
            }).then((response) => {
            let res = response.data;
            if(res.status == "success") {
              window.alert('suc')
              this.tableData = res.data;
              // id,phone,identity
            } else {
              window.alert('fail')
              this.$Message.info('获取失败： ');
            }
          })
      },
      setManage(id){
        this.$confirm('此操作设置该用户为试卷管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url:'/api/userManage/setUserType',
            headers: {Authorization: this.$store.state.token},
            method:'post',
            data: {
              user_id: this.$store.state.user_id,
              setUserId: id,
              type: 2
            }
            }).then((response) => {
            let res = response.data;
            if(res.status === "success") {
                this.$message({
                type: 'success',
                message: '设置成功!'
              });
            } else {
              this.$Message.info('设置失败： ' );
            }
          })
          this.$message({
                type: 'success',
                message: '设置成功!'
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      deleteUser(id){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url:'/api/userManage/deleteUser',
            headers: {Authorization: this.$store.state.token},
            method:'post',
            data: {
              user_id: this.$store.state.user_id,
              deleteUserId: id,
            }
            }).then((response) => {
            let res = response.data;
            if(res.status === "success") {
                this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$Message.info('获取失败： ' );
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
        });
      },
      addNew(){
        this.dialogFormVisible = true;
      },
      submitAdd(){
        if(this.form.userId==''||this.form.password==''||this.form.type==''){
          window.alert('请填写完整')
        }
        else{
          this.dialogFormVisible = false;
          axios({
            url: '/api/super/addUser',
            params: {
              user_phone: this.form.userId,
              password: this.form.password,
              identity: this.form.type,
              userId: this.$store.state.user_id
            },
            headers: {Authorization: this.$store.state.token},
            method:'post',
          }).then((response) =>{
            let res = response.data;
            if(res.status === "success") {
                this.$message({
                type: 'success',
                message: '添加成功!'
              });
            } else {
              this.$Message.info('添加失败： ' );
            }

          })
        }
      },
      
    },
    mounted(){
      // window.alert('user')
       this.getdata();
    }
  }
</script>