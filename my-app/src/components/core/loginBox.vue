<template lang="pug">
    div
        .center-container
            .panel
                header.header 登录
                .form-group
                v-form.align-center(ref='form')
                    v-layout.column
                        v-flex
                            v-layout.row
                                v-flex
                                    v-text-field(v-model='message', label='请输入手机号',
                                type='text')
                                v-spacer
                                v-flex
                                    v-btn(@click="sendMessage") {{content}}
                        <!--v-text-field(v-model='phone' outline  :rules='rules', label='请输入手机号')-->
                        v-flex
                            v-layout.row
                                v-flex
                                    v-text-field(v-model='msg' :rules='rules', label='请输入验证码' width="7rem")
                                v-flex.md6
                        v-btn.commit(type='primary', round='', @click='handleLogin') 提交
</template>


<script>
    export default {
        data: () => ({
            allowSpaces: false,
            match: 'meow',
            max: 0,
            msg:'',
            password: 'Password',
            show: false,
            message: 'Hey!',
            total: '30',
            content: "发送验证码",
            canClick: true
        }),

        computed: {
            rules () {
                const rules = []

                if (!this.allowSpaces) {
                    const rule =
                        v => (v || '').indexOf(' ') < 0 ||
                            'No spaces are allowed'

                    rules.push(rule)
                }

                if (this.match) {
                    const rule =
                        v => (!!v && v) === this.match ||
                            '输入有误'

                    rules.push(rule)
                }

                return rules
            }
        },

        watch: {
            match: 'validateField',
            max: 'validateField',
            model: 'validateField'
        },

        methods: {
            sendMessage () {
                //还有短信验证没有写
                this.countDown()
            },
            handleLogin () {
                if(!this.account)
                    axios.get('/api/PaperInput/loginSucc.json')
                        .then(this.getHomeInfoSucc);
            },
            getHomeInfoSucc (res) {
                res = res.data
                if (res.status === 'success') {
                    this.identity = res.identity;
                    this.$router.push('./home')
                }
            },

            countDown () {
                if (!this.canClick) return  //改动的是这两行代码
                this.canClick = false
                this.content = this.total + 's后重新发送'
                let clock = window.setInterval(() => {
                    this.total--
                    this.content = this.total + 's后重新发送'
                    if (this.total < 0) {
                        window.clearInterval(clock)
                        this.content = '重新发送验证码'
                        this.total = 10
                        this.canClick = true  //这里重新开启
                    }
                },1000)
            }
        }

    }



    //
    // import axios from 'axios'
    // export default {
    //     name: '"LoginBox"',
    //     data () {
    //         return {
    //             account:'',
    //             pass: '',
    //             identity: ''
    //         }
    //     },
    //
    //     methods: {

    //     }
    // }
</script>

<style lang='stylus' scoped>
    .center-container
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        background-image: url(/src/../public/api/cute.jpg)
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
                font-size: 3rem;
                font-weight: 400;
                text-transform: uppercase;
                margin-bottom: 0.5rem;
            .form-group
                margin: 2.5rem 0 10px

            .commit
                width:80%
</style>
