<template lang="pug">
    v-navigation-drawer(dark app
                mobile-break-point="991" width="260" floating persistent v-model="inputValue" )
        v-img(src='api/cute.jpg' :gradient='sidebarOverlayGradiant',
        height='100%')
            v-layout.fill-height(tag='v-list', column)
                v-card-text.text-xs-center
                    h6.category.text-gray.font-weight-thin.mb-3
                    h4.card-title.font-weight-light
                    p.card-description.font-weight-light you know, for Gaokao
                v-divider
                v-list
                    v-list-tile.v-list-item(v-for='item in links', :key='item.index' :to='"/home/"+item.index' @click='')
                        v-list-tile-action
                            v-icon {{ item.icon }}
                        v-list-tile-content
                            v-list-tile-title {{ item.text }}

</template>

<script>
    import {mapMutations, mapState} from 'vuex'

  export default {
      name: 'sideBar',
      data() {
          return {
              windowSize: {
                  x: 0,
                  y: 0
              },
              links: [
                  {
                      index: 'user-profile',
                      icon: 'el-icon-user',
                      text: '账户信息'
                  },
                  {
                      index: 'exams',
                      icon: 'el-icon-document',
                      text: '试卷生成'
                  },
                  {
                      index: 'add-question',
                      icon: 'el-icon-edit',
                      text: '试题录入'
                  },
                  {
                      index: 'manage-question',
                      icon: 'el-icon-s-data',
                      text: '试题管理'
                  },
                  {
                      index: 'manage-user',
                      icon: 'el-icon-s-management',
                      text: '用户管理'
                  },

              ]
          }
      },
      computed: {
          ...mapState('app', ['image', 'color']),
          inputValue: {
              get() {
                  return this.$store.state.drawer
              },
              set(val) {
                  this.setDrawer(val)
              }
          },
          sidebarOverlayGradiant () {
              return `${this.$store.state.sidebarBackgroundColor}, ${this.$store.state.sidebarBackgroundColor}`
          }
      },
      methods:{
          ...mapMutations(['setDrawer'])
      }

  }
</script>

<style lang="stylus" scoped>

</style>



