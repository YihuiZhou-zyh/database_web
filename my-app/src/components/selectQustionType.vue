<template lang="pug">
    div
        v-container.fluid.grid-list-md
            v-layout.row.wrap
                v-flex.d-flex.xs12.sm6.md6
                    v-card.dark(color='white')
                        v-card-title 一级知识点
                        v-container.fluid
                            v-checkbox(v-model='firstSelected', v-for="item of firstKnowledge",:value='item.id',
                            :label='item.name', v-bind:key="item.id",height='0')
                v-flex.d-flex.xs12.sm6.md6.child-flex
                    v-card.dark(color='grey lighten-2')
                        v-card-title 二级知识点
                        v-container.fluid
                            v-checkbox(v-model='secondSelected', v-for="item of secondKnowledge",:value='item.id',
                            :label='item.name', v-bind:key="item.id",height='0')
            v-layout.row.wrap
                v-flex.d-flex.xs12.sm1.md1
                    div.typelist 题型
                v-flex.xs12.sm6.py-2
                    v-btn-toggle(v-model='text')
                        v-btn(flat='', value='left')
                            | 单选
                        v-btn(flat='', value='center')
                            | 实验题
                        v-btn(flat='', value='right')
                            | 计算题
                        v-btn(flat='', value='justify')
                            | 作文
                        v-btn(flat='', value='4')
                            | 应用题
                        v-btn(flat='', value='5')
                            | meow


</template>


<script>
    import axios from "axios";

    export default {
        name: "selectQustionType",
        props:{
          text: Object
        },
        data () {
            return {
                firstSelected: [],
                firstKnowledge: [],
                secondSelected:[],
                secondKnowledge: []
            }

        },
        methods:{
            getFirstKnowlegeInfo(){
                var self=this;
                axios.get('/api/PaperInput/getFirstKnowledge.json')
                    .then(function (res) {
                        res = res.data
                        if (res.status==='success'){
                            self.firstKnowledge = res.data
                        }
                        console.log(res.data)
                    })
            },
            getSecondKnowlegeInfo(){
                var self=this;
                var i;
                var secondKnowledge=new Set()
                for (i in self.firstSelected) {
                    console.log(self.firstSelected[i])

                    axios.get('/api/PaperInput/getSecondKnowledge.json')
                        .then(function (res) {
                            res = res.data
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
                self.secondKnowledge=secondKnowledge
                console.log(secondKnowledge)

            }
        },
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            firstSelected: function (newList, oldList) {
                this.getSecondKnowlegeInfo()
            }
        },
        mounted (){
            this.getFirstKnowlegeInfo()
        }
    }
</script>

<style scoped lang="stylus">
.v-input--selection-controls
    margin:0
div.typelist
    margin: 0.3rem
    text-align center
    padding 0.8rem 0
    color grey
</style>