<template lang="pug">
  v-toolbar#core-toolbar(flat prominent floating style='background: #eee;')
    .v-toolbar-title
      v-toolbar-title.tertiary--text.font-weight-light
        v-btn.default.v-btn--simple(v-if='responsive',
        dark icon @click.stop='onClickBtn')
          v-icon mdi-view-list
        |         {{ title }}
    v-spacer
      v-toolbar-items
        v-flex(align-center='', layout='', py-2='')
          v-text-field.mr-4.mt-2.purple-input(v-if='responsiveInput' label='Search...' hide-details color='purple')
            router-link.toolbar-items(v-ripple to='/')
              v-icon(color='tertiary') mdi-view-dashboard
            v-menu(bottom left content-class='dropdown-menu' offset-y transition='slide-y-transition')
              router-link.toolbar-items(v-ripple='', slot='activator', to='/notifications')
                v-badge(color='error', overlap='')
                  template(slot='badge')
                    | {{ notifications.length }}
                  v-icon(color='tertiary') mdi-bell
              v-card
                v-list(dense)
                  v-list-tile(v-for='notification in notifications', :key='notification', @click='onClick')
                    v-list-tile-title(v-text='notification')
            router-link.toolbar-items(v-ripple='', to='/user-profile')
              v-icon(color='tertiary') mdi-account

</template>

<script>

import {
  mapMutations
} from 'vuex'

export default {
  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    title: null,
    responsive: false,
    responsiveInput: false
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },

  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
