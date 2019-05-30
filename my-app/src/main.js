import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuetify from 'vuetify'
// index.js or main.js
import 'vuetify/dist/vuetify.min.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {post} from './utils/api'
//将方法挂载到Vue原型上
// Vue.prototype.get = get;
Vue.prototype.post = post;
// use
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(Vuetify, {
  theme: {
    primary: 'black',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
