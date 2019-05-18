<template lang="pug">
    v-toolbar( dark=true, tabs='')
        v-toolbar-side-icon
        v-toolbar-title Page title
        v-spacer
        v-btn(icon='')
            v-icon search
            question-search
        v-btn(icon='')
            v-icon more_vert
        v-btn.depressed.small 退出
        <!--template(v-slot:extension='')-->
            <!--v-tabs(v-model='model', centered='',dark=true, slider-color='yellow')-->
                <!--v-tab(v-for='i in 3', :key='i', :href='`#tab-${i}`')-->
                    <!--| Item {{ i }}-->

</template>

<script>
    import questionSearch from './qustionSearch'
export default {

  name: 'topBar',
    components:{
      questionSearch
    },
  props: {
    identity: String
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
