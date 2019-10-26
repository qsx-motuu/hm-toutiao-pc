import Vue from 'vue'
import App from './App.vue'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 引入axios
import axios from '@/api'
// 挂载axios
Vue.prototype.$axios = axios
// 使用ElementUI
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  // 挂载实例
  router,
  render: h => h(App)
}).$mount('#app')
