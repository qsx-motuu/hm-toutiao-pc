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
import local from '@/utils/local'

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
// 添加路由的导航守卫 (前置导航守卫)
router.beforeEach((to, from, next) => {
  // 每次跳转路由钱触发
  /**
   * to: 跳转的目标。路由对象
   * from：从哪里跳转过来。路由对象
   * next：下一步方法 next（）放行 next("/login") 拦截
   */
  const user = local.getUser()
  // 判断当前是否有token。以用来判断当前的登录状态
  if (user && user.token) {
    console.log(user)
    // 登录成功 获取token
    next()
  } else {
    // 失败，没有token
    if (to.path === '/login') {
      // console.log(11)
      next()
    } else {
      // 拦截，跳转到登录页面
      next('/login')
    }
  }
})
// 导出
export default router
