<template lang="pug">
    div
        login-box
</template>
<script>
    // import axios from 'axios'
    import LoginBox from '../components/loginBox'
    export default {
        name: 'Login',
        components: {
            LoginBox
        },
        // methods: {
        //     getHomeInfo () {
        //         axios.get('/api/loginsucc.json')
        //             .then(this.getHomeInfoSucc)
        //     },
        //     getHomeInfoSucc (res) {
        //         if (res.status === 'success') { this. }
        //     }
        // },
        // mounted () {
        //     this.getHomeInfo()
        // }
    }
</script>

<style lang="stylus" scoped>
</style>
