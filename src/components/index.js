import MyBread from '@/components/my_bread'
export default {
  install (Vue) {
    // vue 是一个构造函数
    Vue.component('my-bread', MyBread)
  }
}
