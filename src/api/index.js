// 导入
import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
// 基准地址
// 对axios进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 对axios的请求头配置
// axios请求拦截器
axios.interceptors.request.use((config) => {
  // 请求之前
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (error) => {
  // 请求错误
  return Promise.reject(error)
})
// axios响应拦截器
axios.interceptors.response.use((res) => {
  // 请求之前
  return res
}, (error) => {
  // 请求错误
  if (error.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(error)
})
// 导出
export default axios
