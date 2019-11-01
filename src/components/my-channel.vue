
<template>
<!-- 频道组件插件 -->
  <el-select :value="value" @change="Fn" placeholder="请选择" clearable>
    <el-option v-for="item in channeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  // 父组件数据传给子组件
  props: ['value'],
  data () {
    return {
      channeOptions: []
    }
  },
  created () {
    this.getChanneOptions()
  },
  methods: {
    Fn (channelID) {
      if (channelID === '') {
        channelID = null
      }
      // 把子组件数据传给父组件
      this.$emit('input', channelID)
    },
    // 请求数据，获取频道筛选数据
    async getChanneOptions () {
      // 接口请求数据
      const {
        data: { data }
      } = await this.$axios.get('channels')
      // console.log(data)
      // 赋值
      this.channeOptions = data.channels
    }

  }
}
</script>

<style>
</style>
