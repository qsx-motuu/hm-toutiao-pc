// 提供 存储用户信息的API

// 定义全局常量 KEY
const KEY = 'hm_toutiao_pc'
// 定义对象
const local = {
  // 存储
  setUser (user) {
    // 将user对象转换成JSON字符串
    const jsonStr = JSON.stringify(user)
    // 添加在本地存储中
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取
  getUser () {
    // 读取本地存储中的KEY（token）
    const jsonStr = window.sessionStorage.getItem(KEY)
    // 返回并转换成对象
    return JSON.parse(jsonStr)
  },
  // 删除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

// 导出
export default local
