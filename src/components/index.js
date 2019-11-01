import MyBread from '@/components/my_bread'
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    // vue 是一个构造函数
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
  }
}
