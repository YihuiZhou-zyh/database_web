<template lang="pug">
    div
        el-tabs(type='border-card')
            el-tab-pane(label='题目内容')
                mavon-editor(v-model="value")
            el-tab-pane(label='分析')
                mavon-editor(v-model="value")
            el-tab-pane(label='答案')
                mavon-editor(v-model="value")

</template>

<script>
    export default {
        name: "editor"
    }
</script>

<style scoped>

</style>