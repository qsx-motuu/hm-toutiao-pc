// 导入vue-router
import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入登录组件
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Setting from '@/views/setting'
import NotFound from '@/views/404'

// 使用
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  // 配置对象
  // 路由规则选项 routes 若干规则
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: Welcome
    },
    {
      path: '/article',
      component: Article
    },
    {
      path: '/image',
      component: Image
    },
    {
      path: '/publish',
      component: Publish
    },
    {
      path: '/comment',
      component: Comment
    },
    {
      path: '/fans',
      component: Fans
    },
    {
      path: '/setting',
      component: Setting
    }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
// 导出
export default router
