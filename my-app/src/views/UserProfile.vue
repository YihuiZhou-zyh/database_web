<template lang="pug">
    v-container(fill-height='', fluid grid-list-xl)
        v-layout.col-align-c(justify-center)
            v-flex(xs12  md8)
                v-card
                    v-form
                        v-container(py-0='')
                            v-layout.column
                                v-flex(xs12='', md4='')
                                    h6.category.text-gray.font-weight-thin.mb-3  你好，{{identity_name}}
                                    v-text-field(:label='"你的身份是 " + identity_name', disabled='')

                                v-flex.xs12.md8
                                <!--v-flex(xs12='', md4='')-->
                                    <!--v-text-field.purple-input(label='Email Address')-->
                                v-flex(xs12='', md4='')
                                    v-text-field.purple-input(label='手机号')
                                v-flex(xs12='', text-xs-right='')
                                    v-btn.mx-0.font-weight-light(color='success')
                                        | Update Profile
            v-flex(xs12='', md4='')
                    v-avatar.mx-auto.d-block(slot='offset', size='130')
                        img(src='api/cute.jpg')
                    v-card-text.text-xs-center
                        h6.category.text-gray.font-weight-thin.mb-3 created by zyh
                        h4.card-title.font-weight-light Meow
                        p.card-description.font-weight-light
                            | Don't be scared of the truth because we need to restart the human foundation in truth

</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "UserProfile",
        components:{
        },
        data(){
            return{
                identity_to_name:{
                    '0':'非法用户',
                    '1':'试题录入员',
                    '2':'试题管理员',
                    '3':'超级管理员'
                }
            }
        },
        computed:{
            ...mapMutations(['getIdentityName']),
            identity_name:{
                get() {
                    return this.identity_to_name[this.$store.state.identity]
                },
                set(val){
                    val = val--
                    return this.getIdentityName
                }
            }
        }
    }
</script>

<style scoped>

</style>