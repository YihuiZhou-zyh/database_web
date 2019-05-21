<template lang="pug">
    v-stepper-content(step='2')
        select-qustion-type
        mark-down
        v-btn(color='black', class="white--text", @click='submitForm()')
            | 继续添加题目
        v-btn.flat( @click=" moveToPage('1')") 返回上一步
        v-btn.flat(@click=" moveToPage('3')") 完成提交
</template>

<script>
    import MarkDown from './editor'
    import SelectQustionType from "../selectQustionType";
    import {mapMutations} from 'vuex'
    export default {
        name: "addQStep2",
        components:{
            SelectQustionType,
            MarkDown,
        },
        methods:{
            ...mapMutations(['changeStep'])
            ,moveToPage(step){
                this.changeStep(step)
            },
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {

                    // if (valid) {
                this.changeStep('2')

                    // } else {
                    //     console.log('error submit!!');
                    //     return false;
                    // }
                // });
            },

        }
    }
</script>

<style scoped>

</style>