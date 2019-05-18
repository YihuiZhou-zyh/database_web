<template lang="pug">
    div
        el-form(ref='form', :model='sizeForm', label-width='80px', size='mini')
            el-form-item(label='学校')
                el-select(v-model='sizeForm.region', placeholder='请选择学校姓名')
                    el-option(label='区域一', value='shanghai')
                    el-option(label='区域二', value='beijing')
            el-form-item(label='科目')
                el-select(v-model='sizeForm.subject', placeholder='请选择科目')
                    el-option(label='区域一', value='shanghai')
                    el-option(label='区域二', value='beijing')
</template>

<script>
    export default {
        name: "addQStep1",
        data() {
            return {
                sizeForm: {
                    name: '',
                    region: '',
                    delivery: false,
                    subject:''
                },
                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                    email: ''
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }

    }
</script>

<style scoped>

</style>