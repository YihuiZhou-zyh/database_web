<template lang="pug">
    div
        .bg
        .center-container
            .panel
                header.header 登录
                label(for='username') 用户名:
                el-input.form-group(v-model='account', placeholder='请输入帐号')
                label(for='password') 密码:
                el-input.form-group(placeholder='请输入密码', v-model='pass', show-password='')
                .flash
                    .alert.alert-danger
                        div
                            | Invalid password
                .form-group
                    el-button.commit(type='primary', round='', @click='handleLogin') 提交
</template>


<script>
    import axios from 'axios'
    export default {
        name: '"LoginBox"',
        data () {
            return {
                account: '',
                pass: '',
                identity: ''
            }
        },
        methods: {
            handleLogin () {
                axios.get('/api/loginSucc.json')
                    .then(this.getHomeInfoSucc);
                this.$router.push('./home')
            },
            getHomeInfoSucc (res) {
                console.log(res);
                if (res.status === 'success') {
                    this.identity = res.identity;
                    this.$router.push('./home')
                }
            }
        }
    }
</script>

<style lang='stylus' scoped>
    .bg
        position: fixed;
        left: 0;
        background-image: url(/src/assets/abstract_blue_lights.jpg)
        background-size: cover;
        filter: blur(6px);
        right: 0;
        top: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 100%;
    .center-container
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        .panel
            width: 350px;
            position: relative
            text-shadow: rgba(0, 0, 0, 0.4) 1px 1px 4px;
            box-shadow: rgb(0, 0, 0) 0px 0px 10px;
            overflow: hidden;
            padding: 20px;
            border-radius: 10px;
            .flash
                box-sizing: border-box;
            .header
                text-align: center;
                font-size: 1rem;
                font-weight: 400;
                text-transform: uppercase;
                margin-bottom: 0.5rem;
            .form-group
                margin: 3px 0 10px;
            .commit
                width:100%
</style>
