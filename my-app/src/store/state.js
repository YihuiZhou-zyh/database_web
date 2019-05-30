let defaultStep = '1';
let defaultDrawer = null;
let defaultIdentity = '0';
var indentity_to_name;
indentity_to_name = {
    '0':'非法用户',
    '1':'试题录入员',
    '2':'试题管理员',
    '3':'超级管理员'
};
var default_user_id = '6';
var default_user_name = "meow";
var default_TOKEN = "\n" +
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiZXhwIjoxNTU5NTMxMzY0LCJpYXQiOjE1NTkwOTkzNjR9.oylfOycc0S8dtlfsqNsiFxm9jezw3oV1upr1NsocEcVJ5VjpJIXvnI_aQcM7SGEIdlXzJE73jwBMo1u4IvXqeQ";
let default_school =null
let default_subject = null
// try {
//     if (localStorage.step){
//         defaultStep = localStorage.step
//     }
// }catch (e) {
//
// }

export default {
    step :defaultStep,
    drawer :defaultDrawer,
    identity:defaultIdentity,
    user_id:default_user_id,
    user_name:default_user_name,
    school: default_school,
    subject: default_subject,
    TOKEN:default_TOKEN,
    image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
    sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)'

}