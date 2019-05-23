<template>
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
</template>

<script>
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
            method:'get'
            }).then((response) => {
            let res = response.data;
            if(res.status === "success") {
              this.tableData = res.data;
            } else {
              this.status1 = res.status;
              this.errormsg1 = res.message;
              this.$Message.info('获取失败： ' + this.errormsg1);
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
            url:'/api/userManage/setUserType/'+id,
            headers: {Authorization: this.$store.state.token},
            method:'get'
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
            url:'/api/userManage/deleteUser/'+id,
            headers: {Authorization: this.$store.state.token},
            method:'get'
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
      }
    }
  }
</script>