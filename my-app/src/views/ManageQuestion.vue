<template>
<div>
  <div class='Float'>
      <el-button  type="primary" @click="addSchool()">新增学校</el-button>

<el-dialog title="新增学校" :visible.sync="dialogFormVisible">
  <el-form :model="formSchool">
    <el-form-item label="学校名称" :label-width="formLabelWidth">
      <el-input v-model="formSchool.name" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitAddSchool()">确 定</el-button>
  </div>
</el-dialog>
  </div>

  <div class='Float'>
      <el-button  type="primary" @click="dialogFormVisible2=true">新增一级知识点</el-button>

<el-dialog title="" :visible.sync="dialogFormVisible2">
  <el-form :model="formFirstKown">
    <el-form-item label="一级知识点" :label-width="formLabelWidth">
      <el-input v-model="formFirstKown.name" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="科目" :label-width="formLabelWidth">
      <el-select v-model="formFirstKown.subject" placeholder="科目">
        <el-option label="数学" value="1"></el-option>
        <el-option label="英语" value="2"></el-option>
        <el-option label="语文" value="3"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitAddFirstKown()">确 定</el-button>
  </div>
</el-dialog>
  </div>

  <div class='Float'>
      <el-button  type="primary" @click="dialogFormVisible2=true">新增二级知识点</el-button>

<el-dialog title="" :visible.sync="dialogFormVisible2">
  <el-form :model="formFirstKown">
    <el-form-item label="二级知识点" :label-width="formLabelWidth">
      <el-input v-model="formFirstKown.name" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="科目" :label-width="formLabelWidth">
      <el-select v-model="formFirstKown.subject" placeholder="科目">
        <el-option label="数学" value="1"></el-option>
        <el-option label="英语" value="2"></el-option>
        <el-option label="语文" value="3"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="submitAddFirstKown()">确 定</el-button>
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
      label="题目"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>ID: {{ scope.row.id }}</p>
          <p>题目: {{ scope.row.content }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.content.substring(0,10) }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="科目"
      width="180">
      <template slot-scope="scope">
        <i ></i>
        <span style="margin-left: 10px">{{scope.row.subject}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
    <el-button  slot="reference" @click="setManage(scope.row.id)">编辑</el-button>
    <el-button 
    type="danger"
    slot="reference" @click="deleteQuestion(scope.row.id)">删除</el-button>

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
          subject: '11111111',
          content: '1'
        }, {
         id: '2',
         subject: '11111111',
          content: '2'
        }, {
          id: '3',
          subject: '11111111',
          content: '2'
        }, {
         id: '4',
          subject: '11111111',
          content: '3'
        }],
        status1: '',
        errormsg1: '',
        visible2: false,
        visible3: false,
        //tableData: []
        formSchool: {
          name: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
        dialogFormVisible2: false,
        formFirstKown: {
          name: '',
          subject: '',
        }
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
            url:'/api/questionManage/getAllList',
            headers: {Authorization: this.$store.state.token},
            method:'post',
            data: {
              user_id: this.$store.state.user_id
            }
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
        this.$confirm('目前不提供编辑操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
        });
      },
      deleteQuestion(id){
        this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url:'/api/userManage/deleteQuestion',
            headers: {Authorization: this.$store.state.token},
            method:'post',
            data: {
              user_id: this.$store.state.user_id,
              questionId: id,
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
      submitAddSchool(){
        if(this.formSchool.name==''){
          window.alert('请填写完整')
        }
        else{
          axios({
                url: '/api/SuperManager/addSchool',
                data: {
                  school: this.formSchool.name,
                  degree: '一流',
                  user_id: this.$store.state.user_id
                },
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'post',
              }).then((response) => {
                let res = response.data;
                if (res.status === "success") {
                   window.alert('添加学校成功')
                }
                else{
                  window.alert('失败');
                }
            }
            );
             this.dialogFormVisible = false;
        }
       

      },
      addSchool(){
        this.dialogFormVisible = true
      },
      submitAddFirstKown(){
        if(this.formFirstKown.name==''||this.formFirstKown.subject==''){
          window.alert('请完整填写')
        }
        else{
          axios({
                url: '/api/SuperManager/addFirstKown',
                data: {
                  firstKown: this.formFirstKown.name,
                  user_id: this.$store.state.user_id,
                  subject: this.formFirstKown.subject
                },
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'post',
              }).then((response) => {
                let res = response.data;
                if (res.status === "success") {
                   window.alert('添加一级知识点成功')
                }
                else{
                  window.alert('失败');
                }
            }
            );
             this.dialogFormVisible2 = false;
        }
      },
    }
  }
</script>
<style>
.Float{
    float: left;
  }
</style>
