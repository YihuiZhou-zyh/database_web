<template lang="pug">
            v-stepper(v-model='e1',color="black" )
                v-stepper-header
                    v-stepper-step(:complete='e1 > 1',color="black", step='1') 选择学校以及科目
                    v-divider
                    v-stepper-step(:complete='e1 > 2', color="black",step='2') 编辑题目
                    v-divider
                    v-stepper-step(step='3',color="black") 完成
                v-stepper-items
                    add-q-step1
                    add-q-step2
                    add-q-step3


</template>

<script>
import  addQStep1 from '../components/material/addQStep1'
import addQStep2 from '../components/material/addQStep2'
import {mapState} from 'vuex'
import addQStep3 from '../components/material/addQStep3'

    export default {
        name: "AddQuestion",
        components:{
            addQStep1,
            addQStep2,
            addQStep3
        },
        data () {
            return {
                sizeForm: {
                    name: '',
                    school: '',
                    delivery: false,
                }
            }
        },
        computed:{
            ...mapState(['step']),
          e1:{
              get:function () {
                  return this.step
              },
              set:function (res) {
                  return res
              }
          }
        },
        methods: {
        }
    }
</script>

<style scoped lang="stylus">


</style>