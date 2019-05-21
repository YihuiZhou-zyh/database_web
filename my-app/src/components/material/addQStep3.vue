<template lang="pug">
    v-stepper-content(step='3')
        v-btn(color='black', @click="moveTolastPage", class="white--text")
            | 继续添加题目
        v-btn(flat='', @click='open') 完成
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "addQStep3",
        methods:{
            ...mapMutations(['changeStep'])
            ,
            contiAdd(){
              this.changeStep("2")
            },

            moveTolastPage(){
                this.changeStep("2")
            },
            open() {
                this.$confirm('确认提交？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                })
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                    })
                    .catch(action => {
                        this.$message({
                            type: 'info',
                            message: action === 'cancel'
                                ? '您已取消'
                                : '停留在当前页面'
                        })
                    });
            }
        }
    }
</script>

<style scoped>

</style>