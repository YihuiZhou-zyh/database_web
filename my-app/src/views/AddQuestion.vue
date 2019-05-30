<template lang="pug">
v-container
    v-container.fluid.grid-list-xl
        v-layout.wrap.align-center
            v-flex.xs8.sm4.d-flex
                v-select(v-model="selectedSubject" :items="subject" item-text="content" item-value="id" :rules="[v => !!v || '请选择科目']" label="科目" outline required)
            v-flex.xs8.sm4.d-flex
                v-select(v-model="selectedSchool" :items="school" item-text="name" item-value="id" :rules="[v => !!v || '请选择学校']" label="学校" outline required)
            v-flex.xs8.sm4.d-flex
                v-select(v-model="selectedGrade" :items="grades" item-text="label" item-value="value" :rules="[v => !!v || '请选择年级']" label="年级" outline required)

        v-layout.row
            v-flex.d-flex.md5
                v-card.dark(color='white')
                    v-card-title 一级知识点
                    v-container.fluid
                        v-checkbox(v-model='firstSelected', v-for="item of firstKnowledge", :value='item.id',
                        :label='item.content', :key="item.id", height='0.5rem')
            v-flex.d-flex.md5.offset-md1
                v-card.dark(color='grey lighten-2')
                    v-card-title 二级知识点
                    v-container.fluid
                        v-checkbox(v-model='secondSelected', v-for='item of secondKnowledge', :value='item.id',
                        :label='item.content', :key="item.id",height='0')
        v-layout.row
            v-flex.d-flex.xs2
                p.typelist 题型
            v-flex.py-2.row.wrap
                v-btn-toggle(v-model='selectedType')
                    v-btn(flat='' v-for='item of questionType' :value='item.id')
                        | {{item.content}}
        v-layout.row
            v-flex.d-flex.xs2
                p.typelist 难度系数
            v-flex.d-flex.py-2.xs5
                el-slider(v-model='value', :step='1' :max=5 :min=1 show-stops)
    el-tabs(type='border-card')
        el-tab-pane(label='题目内容')
            mavon-editor(v-model="question" @change="changeQuestion")
        el-tab-pane(label='分析')
            mavon-editor(v-model="analysis" @change="changeAnalysis")
        el-tab-pane(label='答案')
            mavon-editor(v-model="answer" @change="changeAnswer")
    v-btn(color='black', class="white--text", @click='submitForm')
        | 继续添加题目
    v-btn.flat(@click="submitForm") 完成提交
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "addQuestion",
        data () {
            return{
                selectedType:"",
                selectedSchool:"",
                selectedGrade:"",
                selectedSubject:"",
                firstSelected: [],
                question:'',
                questionHtml:"",
                analysis:"略",
                analysisHtml:"",
                answer:"",
                answerHtml:"",
                school: [],
                subject:[],
                firstKnowledge: [],
                secondSelected:[],
                secondKnowledge: [],
                value:1,
                questionType: [],
                grades:[
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
                },]
            }
        },
        methods:
            {
                ...mapMutations(["setSubject", "setSchool"]),


                submitForm() {
                    let id = null;

                    var promise = new Promise((resolve,reject)=>{
                        let url1 = '/api/PaperInput/contentInput';
                        let  data = {
                                userId: this.$store.state.user_id,
                                school_id: this.selectedSchool, //学校id
                                grade: this.selectedGrade,//年级
                                subject_id: this.selectedSubject,//科目id
                                type_id: this.selectedType,//题型id
                                first_knowledge_id: this.firstSelected[0],
                                second_knowldge_id: this.secondSelected[0],//二级知识点id
                                hard_level: this.value,//难度系数
                                markdown_content: this.question,
                                html_content: this.questionHtml
                            }
                        this.post(url1,data)
                            .then((res)=>{
                                resolve(res);
                                if(res.status === 'success'){
                                    id = res.data.problem_id
                                }
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                    });
                    promise.then((res)=>{
                        let url2 = '/api/PaperInput/answerInput'
                        let data2 = {
                            problem_id: id,
                                userId: this.$store.state.user_id,
                                markdown_content: this.answer,
                                html_content: this.answerHtml
                        }
                        this.post(ur2,data2)
                            .then((res)=>{
                                //只有当url1请求到数据后才会调用url2，否则等待
                                resolve(res);
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                        let url3 = '/api/PaperInput/analysisInput'
                        let data3 = {
                            problem_id: id,
                            userId: this.$store.state.user_id,
                            markdown_content: this.answer,
                            html_content: this.answerHtml
                        }
                        this.post(url3,data3)
                            .then((res)=>{
                                //只有当url1请求到数据后才会调用url2，否则等待
                                resolve(res);
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                    })





                    //
                    // axios({
                    //         method: "post",
                    //         url: '/api/PaperInput/contentInput',
                    //         data: {
                    //             userId: this.$store.state.user_id,
                    //             school_id: this.selectedSchool, //学校id
                    //             grade: this.selectedGrade,//年级
                    //             subject_id: this.selectedSubject,//科目id
                    //             type_id: this.selectedType,//题型id
                    //             first_knowledge_id: this.firstSelected[0],
                    //             second_knowldge_id: this.secondSelected[0],//二级知识点id
                    //             hard_level: this.value,//难度系数
                    //             markdown_content: this.question,
                    //             html_content: this.questionHtml
                    //         },
                    //         headers: {
                    //             'Authorization': this.$store.state.TOKEN,
                    //         }
                    //     }
                    // )
                    //     .then(function (res) {
                    //         res = res.data;
                    //         if (res.status === 'success') {
                    //             id = res.data.problem_id
                    //             this.$message({
                    //                 message: '上传题目成功',
                    //                 type: 'success'
                    //             });
                    //
                    //             //answerInput
                    //
                    //             axios({
                    //                     method: "post",
                    //                     url: '/api/PaperInput/answerInput',
                    //                     data: {
                    //                         problem_id: id,
                    //                         userId: this.$store.state.user_id,
                    //                         markdown_content: this.answer,
                    //                         html_content: this.answerHtml
                    //                     },
                    //                     headers: {
                    //                         'Authorization': this.$store.state.TOKEN,
                    //                     }
                    //                 }
                    //             ).then(function (res) {
                    //                     res = res.data;
                    //                     if (res.status === 'success') {
                    //                         id = res.data.problem_id
                    //                         this.$message({
                    //                             message: '上传答案成功',
                    //                             type: 'success'
                    //                         });
                    //                     }
                    //                 }
                    //             )
                    //                 .catch(function (error) {
                    //                     this.$message({
                    //                         message: error,
                    //                         type: 'error'
                    //                     });
                    //                 });
                    //             //    analysisInput
                    //             axios({
                    //                     method: "post",
                    //                     url: '/api/PaperInput/analysisInput',
                    //                     data: {
                    //                         problem_id: id,
                    //                         userId: this.$store.state.user_id,
                    //                         markdown_content: this.analysis,
                    //                         html_content: this.analysisHtml
                    //                     },
                    //                     headers: {
                    //                         'Authorization': this.$store.state.TOKEN,
                    //                     }
                    //                 }
                    //             ).then(function (res) {
                    //                     res = res.data;
                    //                     if (res.status === 'success') {
                    //                         id = res.data.problem_id
                    //                         this.$message({
                    //                             message: '上传解析成功',
                    //                             type: 'success'
                    //                         });
                    //                     }
                    //                 }
                    //             )
                    //                 .catch(function (error) {
                    //                     this.$message({
                    //                         message: error,
                    //                         type: 'error'
                    //                     });
                    //                 });
                    //
                    //
                    //         }
                    //     })
                    //     .catch(function (error) {
                    //         this.$message({
                    //             message: error,
                    //             type: 'error'
                    //         });
                    //     });
                },

                changeQuestion(value, render){
                    this.questionHtml = render;
                    this.question = value;
                },

                changeAnswer(value, render){
                    this.answerHtml = render;
                    this.answer = value;
                },
                changeAnalysis(value, render){
                    this.analysisHtml = render;
                    this.analysis = value;
                },
                //获取school
                getSchoolInfo(){
                    var self=this;
                    axios({
                            method:"get",
                            url:'/api/paperInput/getSchool',
                            params:{userId: this.$store.state.user_id},

                            headers: {
                                'Authorization': this.$store.state.TOKEN,
                            }
                        }
                    )
                        .then(function (res) {
                            res = res.data;
                            if (res.status === 'success'){
                                self.school = res.data
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                },
                //获取subjects
                getSubjectInfo(){
                    var self=this;

                    axios(
                        {
                            method:"get",
                            url:'/api/paperInput/getSubject',
                            params:{userId: this.$store.state.user_id},

                            headers: {
                                'Authorization': this.$store.state.TOKEN,
                            }
                        }
                    )
                        .then(function (res) {
                            res = res.data;
                            if (res.status === 'success'){
                                self.subject = res.data
                            }
                        })
                },
                //获取第一级知识点
                getFirstKnowlegeInfo(){
                    var self=this;
                    axios({

                        method:"get",
                        url:'/api/PaperInput/getFirstKnowledge',
                        params:{
                            userId: this.$store.state.user_id,
                            subjectId: this.selectedSubject
                        },

                        headers: {
                            'Authorization': this.$store.state.TOKEN,
                        }

                    })
                        .then(function (res) {
                            res = res.data;
                            if (res.status === 'success'){
                                self.firstKnowledge = res.data
                            }
                        })
                },
                //获取题目类型
                getTypeInfo(){
                    var self=this;
                    axios({

                        method: "get",
                        url: '/api/PaperInput/getType',
                        params: {userId: this.$store.state.user_id},

                        headers: {
                            'Authorization': this.$store.state.TOKEN,
                        }

                    }).then(function (res) {
                        res = res.data;
                        if (res.status === 'success'){
                            self.questionType = res.data
                        }
                    })
                },
                //获取二级知识点
                getSecondKnowlegeInfo(){
                    var self=this;
                    var i;
                    var secondKnowledge=[];
                    for (i in self.firstSelected) {

                        axios(
                            { method:"get",
                                url:'/api/PaperInput/getSecondKnowledge',
                                params:{userId: this.$store.state.user_id,
                                    firstKnowledgeId: i
                                },

                                headers: {
                                    'Authorization': this.$store.state.TOKEN,
                                }}
                        )
                            .then(function (res) {
                                res = res.data;
                                if (res.status === 'success') {
                                    secondKnowledge.push(...res.data)
                                }


                            })
                        // var post_data = {"firstKnowledgeId": id};
                        // axios.post('/api/PaperInput/getSecondKnowledge.json', post_data)
                        //     .then(function (res) {
                        //         if (res.status === 'success') {
                        //             self.secondKnowledge = res.data
                        //         }
                        //         console.log(res)
                        //     })
                    }
                    this.secondKnowledge=secondKnowledge;

                }
            },
        mounted: function () {
            this.getTypeInfo(),
                this.getSchoolInfo();
            this.getSubjectInfo();
        },
        watch: {

            selectedSubject: function(){
                this.firstSelected=[]
                this.secondSelected=[]
                this.getFirstKnowlegeInfo()
            },
            firstSelected: function (newList, oldList) {
                this.getSecondKnowlegeInfo()
            }
        }

    }

</script>

<style lang="stylus" scoped>
    .v-input--selection-controls
        margin:0
    p.typelist
        margin:  0
        text-align center
        padding 0.8rem 0
        color grey
        right: 0
</style>