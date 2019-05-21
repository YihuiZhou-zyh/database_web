<template lang="pug">
    v-navigation-drawer#app-drawer(v-model='inputValue', app='', dark='', floating='', persistent='', mobile-break-point='991', width='260')
        v-img(:src='image', :gradient='sidebarOverlayGradiant', height='100%')
            v-layout.fill-height(tag='v-list', column='')
                v-list-tile(avatar='')
                    v-list-tile-avatar(color='white')
                        v-img(:src='logo', height='34', contain='')
                    v-list-tile-title.title
                        | Vuetify MD
                v-divider
                    v-list-tile(v-if='responsive')
                        v-text-field.purple-input.search-input(label='Search...', color='purple')
                    v-list-tile.v-list-item(v-for='(link, i) in links', :key='i', :to='link.to', :active-class='color', avatar='')
                        v-list-tile-action
                            v-icon {{ link.icon }}
                        v-list-tile-title(v-text='link.text')
                    v-list-tile.v-list-item.v-list__tile--buy(disabled='', active-class='primary', to='/upgrade')
                        v-list-tile-action
                            v-icon mdi-package-up
                        v-list-tile-title.font-weight-light
                            | Upgrade To PRO

</template>

<script>
    // Utilities
    import {
        mapMutations,
        mapState
    } from 'vuex'

    export default {
        data: () => ({
            logo: './img/vuetifylogo.png',
            links: [
                {
                    to: '/dashboard',
                    icon: 'mdi-appView-dashboard',
                    text: 'Dashboard'
                },
                {
                    to: '/user-profile',
                    icon: 'mdi-account',
                    text: 'User Profile'
                },
                {
                    to: '/table-list',
                    icon: 'mdi-clipboard-outline',
                    text: 'Table List'
                },
                {
                    to: '/typography',
                    icon: 'mdi-format-font',
                    text: 'Typography'
                },
                {
                    to: '/icons',
                    icon: 'mdi-chart-bubble',
                    text: 'Icons'
                },
                {
                    to: '/maps',
                    icon: 'mdi-map-marker',
                    text: 'Maps'
                },
                {
                    to: '/notifications',
                    icon: 'mdi-bell',
                    text: 'Notifications'
                }
            ],
            responsive: false
        }),
        computed: {
            ...mapState('app', ['image', 'color']),
            inputValue: {
                get () {
                    return this.$store.state.app.drawer
                },
                set (val) {
                    this.setDrawer(val)
                }
            },
            items () {
                return this.$t('Layout.View.items')
            },
            sidebarOverlayGradiant () {
                return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`
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
            onResponsiveInverted () {
                if (window.innerWidth < 991) {
                    this.responsive = true
                } else {
                    this.responsive = false
                }
            }
        }
    }
</script>

<style lang="scss">
    #app-drawer {
        .v-list__tile {
            border-radius: 4px;

            &--buy {
                margin-top: auto;
                margin-bottom: 17px;
            }
        }

        .v-image__image--contain {
            top: 9px;
            height: 60%;
        }

        .search-input {
            margin-bottom: 30px !important;
            padding-left: 15px;
            padding-right: 15px;
        }

        div.v-responsive.v-image > div.v-responsive__content {
            overflow-y: auto;
        }
    }
</style>