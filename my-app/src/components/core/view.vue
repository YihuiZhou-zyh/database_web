<template lang="pug">
    v-content
        v-fade-transition(mode="out-in")
            router-view
</template>

<script>
    export default {
        name: "appView"
    }
</script>

<style scoped>
</style>