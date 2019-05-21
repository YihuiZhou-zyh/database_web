<template lang="pug">
    v-app
        side-bar
        top-bar
        appView
</template>

<script>
    import TopBar from '../components/core/topBar'
    import SideBar from "../components/core/sideBar"
    import AddQuestion from './AddQuestion'
    import appView from "../components/core/view";
  export default {
        name:"Home",
    components: {
        SideBar,
      //   SuperAdd,
      AddQuestion,
      // SideBar
      TopBar,
        appView

    },
  }
</script>
<style lang="stylus">
</style>