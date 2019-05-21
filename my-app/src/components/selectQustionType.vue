<template lang="pug">
        v-container.fluid.grid-list-md
            v-layout.row
                v-flex.d-flex.md5
                    v-card.dark(color='white')
                        v-card-title 一级知识点
                        v-container.fluid
                            v-checkbox(v-model='firstSelected', v-for="item of firstKnowledge", :value='item.id',
                            :label='item.name', :key="item.id", height='0.5rem')
                v-flex.d-flex.md5.offset-md1
                    v-card.dark(color='grey lighten-2')
                        v-card-title 二级知识点
                        v-container.fluid
                            v-checkbox(v-model='secondSelected', v-for='item of secondKnowledge', :value='item.id',
                            :label='item.name', :key="item.id",height='0')
            v-layout.row
                v-flex.d-flex.xs2
                    p.typelist 题型
                v-flex.py-2.row.wrap
                    v-btn-toggle(v-model='text')
                        v-btn(flat='' v-for='item of questionType' :value='item.id')
                            | {{item.name}}
            v-layout.row
                v-flex.d-flex.xs2
                    p.typelist 难度系数
                v-flex.d-flex.py-2.xs5
                    el-slider(v-model='value', :step='1' :max=5 :min=1 show-stops='')
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
                secondKnowledge: [],
                value:1,
                questionType: []
            }

        },
        methods:{
            //获取第一级知识点
            getFirstKnowlegeInfo(){
                var self=this;
                axios.get('/api/PaperInput/getFirstKnowledge.json')
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
                axios.get('/api/PaperInput/getType.json')
                    .then(function (res) {
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

                    axios.get('/api/PaperInput/getSecondKnowledge.json')
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
                self.secondKnowledge=secondKnowledge;

            }
        },
        watch: {
            firstSelected: function (newList, oldList) {
                this.getSecondKnowlegeInfo()
            }
        },
        mounted (){
            this.getFirstKnowlegeInfo();
            this.getTypeInfo()
        }
    }
</script>

<style scoped lang="stylus">
.v-input--selection-controls
    margin:0
p.typelist
    margin:  0
    text-align center
    padding 0.8rem 0
    color grey
    right: 0
</style>