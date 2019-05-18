<template lang="pug">
    v-stepper(v-model='e1',color="black")
        v-stepper-header
            v-stepper-step(:complete='e1 > 1',color="black", step='1') 选择学校以及科目
            v-divider
            v-stepper-step(:complete='e1 > 2', color="black",step='2') 编辑题目
            v-divider
            v-stepper-step(step='3',color="black") 完成

        v-stepper-items
            v-stepper-content(step='1')
                add-q-step1
                v-btn(color='black', @click='e1 = 2',class="white--text")
                    | 下一步
                v-btn(flat='') 取消
            v-stepper-content(step='2')
                select-qustion-type
                mark-down
                v-btn(color='black', @click='e1 = 3',class="white--text")
                    | 下一步
                v-btn(flat='', @click='e1 = 1') 返回上一步
            v-stepper-content(step='3')
                v-card.mb-5(color='grey lighten-1', height='200px')
                v-btn(color='black', @click='e1 = 2',class="white--text")
                    | 继续添加题目
                v-btn(flat='', @click='e1 = 2') Cancel

</template>

<script>
import MarkDown from '../components/editor'
import addQStep1 from '../components/addQStep1'
import SelectQustionType from "./selectQustionType";
    export default {
        name: "addQuestion",
        components:{
            SelectQustionType,
            addQStep1,
            MarkDown
        },
        data () {
            return {
                e1: 0,
                sizeForm: {
                    name: '',
                    region: '',
                    delivery: false,
                }
            }
        },
        methods: {
            onSubmit() {
                console.log("submit")
            }
        }
    }
</script>

<style scoped lang="stylus">


</style>