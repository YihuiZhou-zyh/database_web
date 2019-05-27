<template lang="pug">
        v-toolbar#core-toolbar(app flat prominent style='background: #eee;' ,
        v-resize="onResize")
            v-layout.row
                v-flex.d-flex.py-2
                    .v-toolbar-title.row
                        v-toolbar-title.tertiary--text.font-weight-light
                            <!--v-btn.default.v-btn&#45;&#45;simple(v-if='responsive', dark icon @click.stop='onClickBtn')-->
                            v-btn(v-once ='responsive' icon @click.stop='onClickBtn')
                                v-icon.small view_list
                            |         {{ title }}

                v-spacer
                v-flex(align-center='', layout='', py-2='')
                    v-spacer
                    v-btn(v-ripple icon color='tertiary' to='/home/user-profile')
                        v-icon person

</template>

<script>

import {mapMutations} from "vuex";

export default {
  name: 'topBar',
  props: {
    identity: String,

  },
    computed:{
        title: {
            get(){
                return this.$route.name
            },
            set(){

            }
        }
    },

    data () {
        return {
            responsive: true,
            selectTab:[],

            windowSize: {
                x: 0,
                y: 0
            }

        }
    },
    methods:{
        ...mapMutations(['setDrawer']),
        onClickBtn () {
            this.setDrawer(!this.$store.state.drawer)
        },
        onResize () {
            this.windowSize = {
                x: window.innerWidth,
                y: window.innerHeight

            };

            this.responsive = this.windowSize.x < 991;
        }
    },
    watch: {
        '$route' (val) {
            this.title = val.name
        }
    },
    mounted() {
        this.onResize()
    },


}
</script>

<style scoped lang="stylus">
    #core-toolbar a
        text-decoration: none
</style>
