<template>
<div class="container-article">
<el-card>
    <div slot="header">
      <my-bread>内容管理</my-bread>
    </div>
    <el-form ref="form" label-width="80px" size="small">
      <el-form-item label="状态：">
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="reqParams.channe_id" placeholder="请选择">
          <el-option
            v-for="item in channeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="dateArr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
<el-card class="cardFooter">
  <div slot="header">
    <span>根据筛选条件共查询到55074条结果</span>
  </div>
</el-card>
</div>

</template>

<script>
export default {
  data () {
    return {
      // 筛选数据
      // 使用axios提交数据时，如果数据值为null是不会提交该字段
      reqParams: {
        status: null,
        channe_id: null
      },
      channeOptions: [{ value: 1, lable: 'java' }, { value: 2, lable: '前端' }],
      dateArr: []
    }
  }
}
</script>

<style scoped lang="less">
.cardFooter{
  margin-top: 20px;
}
</style>
