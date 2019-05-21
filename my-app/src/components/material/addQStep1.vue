<template lang="pug">
    v-stepper-content(step='1')
        el-form.demo-ruleForm(:model='ruleForm', :rules='rules', ref='ruleForm', label-width='100px')
            el-form-item(label='学校', prop='school')
                el-select(v-model='ruleForm.school', placeholder='请选择学校名称')
                    el-option(v-for='item of school'
                    :value='item.id' :label="item.name" :key="item.id")
            el-form-item(label='科目', prop='subject')
                el-select(v-model='ruleForm.subject', placeholder='请选择科目')
                    el-option(v-for='item of subject'
                    :value='item.id' :label="item.name" :key="item.id")
            v-btn(color='black', @click='submitForm(\'ruleForm\')', class="white--text")
                | 下一步
            v-btn(flat='') 取消


</template>

<script>


    import {mapMutations} from "vuex";

    export default {
        name: "addQStep1",
        data() {
            return {
                school: [],
                subject:[],
                ruleForm: {
                    school: '',
                    subject:''
                },
                newStep: '2',
                rules: {
                    school: [
                        { required: true, message: '请选择学校名称', trigger: 'change' }
                    ],
                    subject: [
                        { required: true, message: '请选择科目', trigger: 'change' }
                    ],
                }
            };
        },

        methods: {
            ...mapMutations(['changeStep']),
            //获取school
            getSchoolInfo(){
                var self=this;
                axios.get('/api/PaperInput/getSchool.json')
                    .then(function (res) {
                        res = res.data;
                        if (res.status === 'success'){
                            self.school = res.data
                        }
                    })
            },
            //获取subjects
            getSubjectInfo(){
                var self=this;
                axios.get('/api/PaperInput/getSubject.json')
                    .then(function (res) {
                        res = res.data;
                        if (res.status === 'success'){
                            self.subject = res.data
                        }
                    })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        this.changeStep('2')
                        console.log(this.$store.state.step)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted(){
            this.getSchoolInfo();
            this.getSubjectInfo();
        }

    }
</script>

<style scoped>

</style>