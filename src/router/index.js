// 导入vue-router
import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入登录组件
import Login from '@/views/login'
// 使用
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  // 配置对象
  // 路由规则选项 routes 若干规则
  routes: [
    {
      path: '/login',
      component: Login
    }
  ]
})
// 导出
export default router
