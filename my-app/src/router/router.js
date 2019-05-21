import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>import('../views/Login')
    },
    {
      path: '/home',
      component:()=>import("../views/Home"),
      children:[
        {
          path: 'user-profile',
          name:"用户信息",
          component: ()=>import('../views/UserProfile')
        },
        {
          path: 'manage-question',
          name:"试题管理",
          component:()=>import('../views/ManageQuestion')
        },

        {
          path: 'add-question',
          name:"录入试题",
          component:()=>import('../views/AddQuestion.vue')
        },

        {
          path: 'manage-user',
          name:'用户管理',
          component:()=>import('../views/ManageUser')
        },
        {
          path: 'exams',
          name: "生成试卷",
          component:()=>import('../views/Exams')
        }
      ]
    },


  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
