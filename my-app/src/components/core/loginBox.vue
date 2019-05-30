<template lang="pug">
    div
        .center-container
            .panel
                header.header 登录
                v-tabs(v-model="active" color='transparent', light, slider-color='grey')
                    v-tab(ripple) 账户密码登录
                    v-tab-item
                        //v-card(flat)
                        .form-group
                            v-form.align-center(ref='form')
                                v-layout.column#lay
                                    v-flex
                                        v-layout.row
                                            v-flex
                                                v-text-field(v-model='phone', label='请输入手机号' :rules='[rules.required, rules.counter]' counter
                                                type='text')
                                    <!--v-text-field(v-model='phone' outline  :rules='rules', label='请输入手机号')-->
                                    v-flex
                                        v-layout.row
                                            v-flex
                                                v-text-field(v-model='password',
                                                :append-icon="show1 ? 'visibility' : 'visibility_off'",
                                                :rules='[rules.required, rules.min]',
                                                :type="show1 ? 'text' : 'password'",
                                                name='input-10-1', label='请输入密码', hint='至少8个字符', counter @click:append='show1 = !show1')
                                                h6.category.text-gray.font-weight-thin.mb-3.shadow.pa-1  忘记密码请用手机登录，会直接修改密码噢
                                v-btn.commit(type='primary', round='', @click.prevent='handleLogin') 提交
                    v-tab(ripple) 手机登录
                    v-tab-item
                        //v-card(flat)
                        .form-group
                            v-form.align-center(ref='form')
                                v-layout.column#lay
                                    v-flex
                                        v-layout.row
                                            v-flex
                                                v-text-field(v-model="phone" label='请输入手机号' type='text')
                                    <!--v-text-field(v-model='phone' outline  :rules='rules', label='请输入手机号')-->
                                    v-flex
                                        v-layout.row
                                            v-flex
                                                v-text-field(v-model='msg' :rules='rules', label='请输入验证码')
                                            v-flex.d-flex.py-2
                                                v-btn(@click.prevent="sendMessage") {{content}}
                                v-btn.commit(type='primary', round='', @click.prevent='handleLogin') 提交
</template>


<script>
    import axios from 'axios'
    export default {
        data: () => ({
            phone:'',
            match: 'meow',
            tabs:[
                '手机登录','帐号密码登录'
            ],
            active: null,
            max: 0,
            msg:'',
            password: '',
            show: false,
            total: '30',
            content: "发送验证码",
            canClick: true,
            show1: false,
            rules: {
                required: value => !!value || '不能为空',
                min: v => v.length >= 8 || '至少6个字符',
                counter: v => v.length <=11 || "手机号为11位"
            }
        }),

        computed: {
        },

        methods: {
            sendMessage () {
                //还有短信验证没有写
                this.countDown()
            },
            handleLogin () {
                let post_data = {
                    user_id: this.phone,
                    password: this.password
                };
                this.$refs['ruleForm']
                if(this.phone!='' && this.password!='')
                    {
                    this.post('/api/login', post_data)
                        .then((res)=>{
                            if(res.status==='success'){
                                // resolve(res);
                                this.$store.state.identity = res.data.identity;
                                this.$store.state.user_id = res.data.userId;
                                this.$store.state.user_name = res.data.userName;
                                this.$store.state.TOKEN = res.data.token;
                                //"identity":"3","userName":"zyh","userId":"6"
                                this.$router.push('./home')
                                this.$message({
                                    message: '成功登录',
                                    type: 'success'
                                });
                            }else{
                                //这里抛出的异常被下面的catch所捕获
                                this.$message({
                                    message: '账户或密码错误',
                                    type: 'fail'
                                });
                                reject(error);
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    // axios.post('/api/login',post_data)
                    //         .then(this.getHomeInfoSucc)
                    }
                else {
                    this.$message({
                        message: '你没有填帐号或者密码噢',
                        type: 'warning'
                    });
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
            min-height: 368px
            position: relative
            text-shadow: rgba(0, 0, 0, 0.4) 1px 1px 4px;
            box-shadow: rgb(0, 0, 0) 0px 0px 10px;
            overflow: hidden;
            padding: 20px;
            border-radius: 10px;

            .header
                text-align: center;
                font-size: 3rem;
                font-weight: 400;
                text-transform: uppercase;
                margin-bottom: 0.5rem;
            .form-group
                margin: 1rem
            #lay
                overflow :hidden

            .commit
                width:80%
                /*padding : 0.5rem 0rem 0.5rem 3rem */

</style>
