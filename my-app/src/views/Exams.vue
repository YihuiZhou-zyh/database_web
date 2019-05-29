<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="自动组卷" name="first">
        <div>
            <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            </el-steps>
            <!-- <div class="ddiv" id='div1'>
                选择学校
             <el-select v-model="schoolsValue" placeholder="请选择学校名称">
                <el-option
                v-for="item in schools"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div> -->
             <div class="ddiv" label-width='100px' id='div2'>
                选择科目
             <el-select v-model="subjectsValue" placeholder="请选择科目">
                <el-option
                v-for="item in subjects"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div class="ddiv" id='div3'>
                选择年级
             <el-select v-model="classValue" placeholder="请选择年级">
                <el-option
                v-for="item in clas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
            <div class="ddiv" id=div4 v-show="false">
                选择一级知识点
                <el-select v-model="fisrtKonwn" placeholder="请选择一级知识点">
                <el-option
                v-for="item in fisrtKownlege"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
                 <div>
                <el-button  @click="choose2()">选择二级知识点</el-button>
                </div>
                <div id='secondDiv' v-show="false">
                    <el-transfer
                        filterable
                        :filter-method="filterMethod"
                        filter-placeholder="请输入知识点"
                        v-model="secondValue"
                        @change="handleChange"
                        :data="data">
                    </el-transfer>
                    <div>
                        <el-button type="primary" @click="stackIn()">导入</el-button>
                        <el-button type="info" plain @click="chooseElse()">重新选择一级知识点</el-button>
                    </div>
                </div>
            </div>
            <div id='div5' v-show="false">
                <div >你已选择的知识点：</div>
                <el-tag
                v-for="tag in tags"
                :key="tag.name"
                closable
                :type="tag.type">
                {{tag.name}}
                </el-tag>
                <div>
                    请选择选择题数量: <el-input-number v-model="numChoose"></el-input-number>
                </div>
                 <div>
                    请选择填空题数量: <el-input-number v-model="numBlank"></el-input-number>
                </div>
                 <div>
                    请选择解答题数量: <el-input-number v-model="numAn"></el-input-number>
                </div>
                <div>
                    请选择难度系数: <el-select v-model="difficult" placeholder="请选择难度系数">
                        <el-option
                        v-for="item in diffic"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div>
                <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <h4>你将选择下面的题型进行组卷？</h4>
                <span>选择题数量：  {{numChoose}}</span> <br>
                <span>填空题数量：  {{numBlank}}</span> <br>
                <span>解答题数量：  {{numAn}}</span> <br>
                <span>难度系数：  {{difficult}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitData()">确 定</el-button>
                </span>
                </el-dialog>
                </div>
            </div>
            <div id="div6" v-show="false">
                <div id='div7'>
                <h3>试卷预览</h3>
                <div id="chooseDiv"></div>
                <div id='blankDiv'></div>
                <div id='answerDiv'></div>
                </div>
                <el-button style="margin-top: 12px;" @click="print">输出word文档</el-button>

            </div>
            <el-button :plain="true" @click="lack()" v-show="false" v-model="lackValue" id='lackId'></el-button>
            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        </div>
    </el-tab-pane>
    <el-tab-pane label="手动组卷" name="second">
        暂停服务
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { all } from 'q';
import axios from 'axios'
  export default {
    data() {
        const generateData = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data: generateData(),
        secondValue: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        activeName: 'first',
        active: 0,
        schools: [
            {
          value: '上海中学',
          label: '上海中学'
        }, {
          value: '复旦附中',
          label: '复旦附中'
        }, {
          value: '交大附中',
          label: '交大附中'
        }],
        subjects: [
            {value: '数学',
             label: '数学'
        },{
            value: '英语',
            label: '英语'
        }],
        clas: [
            {
                value: '1',
                label: '一年级'
            },
            {
                value: '2',
                label: '二年级'
            },
            {
                value: '3',
                label: '三年级'
            },
            {
                value: '4',
                label: '四年级'
            },
            {
                value: '5',
                label: '五年级'
            },
            {
                value: '6',
                label: '六年级'
            },
            {
                value: '7',
                label: '七年级'
            },
            {
                value: '8',
                label: '八年级'
            },
            {
                value: '9',
                label: '九年级'
            },
            {
                value: '10',
                label: '高一'
            },
            {
                value: '11',
                label: '高二'
            },
            {
                value: '13',
                label: '高三'
            },

        ],
        //schoolsValue: '',
        subjectsValue: '',
        classValue: '',
        lackValue: '',
        fisrtKonwn: '',
        fisrtKownlege: [
            {
                value: '计算几何',
                label: '计算几何',
            },
            {
                value: '图论',
                label: '图论'
            },
        ],
        kownList: [],
        listNum: [],
        cNum: 0,
        tags: [],
        numChoose: 1,//选择题数量
        numBlank: 1, //填空题数量
        numAn: 1, //解答题数量
        difficult: 0.4, //选择的难度系数
        diffic: [  //难度系数
            {
                value: 0.4,
                label: 0.4
            },
            {
                value: 0.6,
                label: 0.6
            },
            {
                value: 0.8,
                label: 0.8
            }
        ],
        centerDialogVisible: false,
        choose: [],
        blank: [],
        answer: [],
      };
    },
    mounted(){
       window.alert('Kaishile')
       this.getSubjects()
       
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      check(){
          return this.subjectsValue!=''&&this.classValue!='';
      },
      next() {
          if(this.active==0){
              if(this.check()==true){
                  //window.alert(this.active)
                  this.active++;
                  //getFirstKown(this.subjectsValue);获取一级知识点
                  //document.getElementById('div1').style.display='none';
                  document.getElementById('div2').style.display='none';
                  document.getElementById('div3').style.display='none';
                  document.getElementById('div4').style.display='inline'
              }
              else{
                  window.alert('请选择学校，科目，年级')
              }
          }
          else if(this.active==1){
              //window.alert(this.active)
              //获取二级知识点
              //getSecondKown(this.fisrtKonwn);
              if(this.kownList!=null){
                  this.kownList.forEach((kown,index) =>{
                      this.tags.push({
                          name: kown.label,
                          key: index,
                          type: 'success'
                      })
                  })
                  document.getElementById('div4').style.display='none'
                  document.getElementById('div5').style.display='inline';
                  this.active++;
              }
              else{
                  window.alert('请选择二级知识点')
              }

              //window.alert(2)
          }
          else if(this.active==2){
              //window.alert(3)
                //window.alert(this.active)
              //this.active = 0;
              this.centerDialogVisible=true;
              this.active++;
          }
          else if(this.active==3){
              //window.alert(this.active)
              this.active=0;
              //document.getElementById('div4').style.display='none'
              location.reload()
               
          }
      },
      lack(){
          this.$message({
          message: '请选择年级，科目',
          type: 'warning'
        });
      },
      choose2(){
          if(this.fisrtKonwn!=''){
              document.getElementById('secondDiv').style.display='inline';

          }
          else{
              window.alert('请先选择一级知识点')
          }
          
      },
      stackIn(){
          this.listNum.forEach((svalue,index) =>{
              //window.alert(svalue)
              //window.alert(this.data[svalue].label)
              if(this.kownList.indexOf(this.data[svalue])==-1){
                  this.kownList.push(this.data[svalue])
              }
          });
          this.kownList.forEach((svalue,index) =>{
              window.alert(svalue.label)
          })
      },
      handleChange(value, direction, movedKeys){
        console.log(value, direction, movedKeys);
        movedKeys.forEach((value,key) =>{
            this.listNum.push(value)
            this.cNum++;
        })
      },
      chooseElse(){
          document.getElementById('secondDiv').style.display='none';
          for(var i=0;i<this.cNum;i++){
              this.listNum.pop()
              this.secondValue.pop()
          }
          this.cNum=0;
          for(var i=0;i<7;i++){
            this.data.pop();
          }
           const cities = ['语文', '数学', '英语', '政治', '科学', '算法', '导论'];
           const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
           cities.forEach((city, index) => {
           this.data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
      },
      submitData(){
          this.centerDialogVisible=false;
          document.getElementById('div5').style.display='none';
          document.getElementById('div6').style.display='inline';
         // this.seePaper();
          axios({
                url: '/api/generatePaper',
                data: {
                  secondKown: this.tags,
                  numChoose: this.numChoose,
                  numBlank: this.numBlank,
                  numAn: this.numAn,
                  difficult: this.difficult,
                  user_id: this.$store.state.user_id
                },
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'post',
              }).then((response) => {
                let res = response.data;
                if (res.status === "success") {
                   //后端回传
                   this.choose=res.choose,
                   this.blank=res.blank,
                   this.answer=res.answer
                   this.seePaper();
                }
                else{
                    window.alert('生成试卷失败');
                }
            }
            )
          //返回给后端.....
      },
      getSubjects(){
          let post_data={
              user_id: this.$store.state.user_id,
          }
          axios.post('/api/paperInput/getSubject',post_data).then((response) => {
                let res = response.data;
                if (res.status === "success") {
                   //后端回传
                   window.alert(1);
                   res.forEach((value,index) => {
                       this.subjects.push({
                           value: value.name,
                           label: value.name,
                           id: value.id
                       })
                   })
                }
                else{
                    window.alert('前后端交互出现故障');
                }}
                )
        //    axios({
        //         url: '/api/paperInput/getSubject',
        //         params: {
        //            userId: this.$store.state.user_id,
        //         },
        //         headers: {
        //           'Content-Type': 'application/json;charset=UTF-8'
        //         },
        //         method: 'post',
        //       }).then((response) => {
        //         let res = response.data;
        //         if (res.status === "success") {
        //            //后端回传
        //            window.alert(1);
        //            res.forEach((value,index) => {
        //                this.subjects.push({
        //                    value: value.name,
        //                    label: value.name,
        //                    id: value.id
        //                })
        //            })
        //         }
        //         else{
        //             window.alert('前后端交互出现故障');
        //         }}
        //     )
      },
      getFirstKown(subjectId){
           axios({
                url: '/api/PaperInput/getFirstKnowledge',
                data: {
                   user_id: this.$store.state.user_id,
                   subjectId: subjectId,
                },
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'post',
              }).then((response) => {
                let res = response.data;
                if (res.status === "success") {
                   //后端回传
                   res.forEach((value,index) => {
                       this.fisrtKownlege.push({
                           value: value.name,
                           label: value.name,
                           id: value.id
                       })
                   })
                }
                else{
                    window.alert('前后端交互出现故障');
                }}
            )
      },
      getSecondKown(fisrtK){
          axios({
                url: '/api/PaperInput/getSecondKnowledge',
                data: {
                   user_id: this.$store.state.user_id,
                   firstKnowledgeId: fisrtK,
                },
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                method: 'post',
              }).then((response) => {
                let res = response.data;
                if (res.status === "success") {
                   //后端回传
                   res.forEach((value,index) => {
                       this.data.push({
                           label: value.name,
                           id: value.id,
                           pinyin: value.name,
                           key: index
                       })
                   })
                }
                else{
                    window.alert('前后端交互出现故障');
                }}
            )
      },
      seePaper(){
          document.getElementById('div5').style.display='none';
        document.getElementById('div6').style.display='inline';
        this.choose.forEach((value,index) =>{
            document.getElementById('chooseDiv').innerHTML(value)
        })
        this.blank.forEach((value,index) =>{
            document.getElementById('blankDiv').innerHTML(value)
        })
        this.answer.forEach((value,index) =>{
            document.getElementById('answerDiv').innerHTML(value)
        })
           // window.alert(1);
      },
      print(){
           let html = document.getElementById('div7').innerHTML;
            //window.alert(html)
            //html = html.html()
            // 构造blob文件流
            let html_ = new Blob([html],{ "type" : "text/html;charset=utf-8" })
            let formdata = new FormData();
            formdata.append('file', html_, `sdf.html`);//sdf.html是设置文件名
            axios({
                method: 'post',
                url: '/api/PaperPrint',
                data:formdata,
                responseType:'blob',//这里如果不设置，下载会打不开文件
            })
            .then(res=>{
                console.log('download res',res);
                //通过后台返回 的word文件流设置文件名并下载
                var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
                var downloadElement = document.createElement('a');
                var href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download ='s.doc'; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象
            })
      }
    }
  };
</script>
<style scoped>
.ddiv{
    margin: 10px,
}
</style>
