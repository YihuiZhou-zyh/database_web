<template lang="pug">
    router-view
</template>

<script>

import sideBar from "./components/core/sideBar";
import topBar from "./components/core/topBar";
import AddQuestion from "./views/AddQuestion";
import appView from "./components/core/view";
import Login from "./views/Login";

export default {
  name: 'App',
    components:{
        Login,
      sideBar,
        topBar,
        AddQuestion,
        appView
    }
}
</script>
