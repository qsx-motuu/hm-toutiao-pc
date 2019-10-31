<template>
  <div class="container-article">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
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
          <el-select v-model="reqParams.channe_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果布局 -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <div slot="header">
          <span>根据筛选条件共查询到 {{total}} 条结果</span>
        </div>
        <!-- 表格 -->
        <el-table :data="article">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <el-image
                style="width: 150px; height: 100px"
                :src="scope.row.cover.images[0]"
                fit="fill"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status===0">草稿</el-tag>
              <el-tag v-if="scope.row.status===1" type="info">待审核</el-tag>
              <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
              <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="pubdate"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
              <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle plain></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!--
          total:总条数
          page-size:默认10条显示一页
        -->
        <el-pagination
          style="margin-top:20px;"
          background
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          :total="total"
          @current-change="parer"
        ></el-pagination>
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
        channe_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 显示20条一页
        per_page: 20,
        // 首页
        page: 1
      },
      // 频道死数据
      channeOptions: [{ value: 1, lable: 'java' }, { value: 2, lable: '前端' }],
      // 选择日期后保存的数据
      dateArr: [],
      // 筛选后，表格中列的内容，筛选结果
      article: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getChanneOptions()
    this.getArticle()
  },
  methods: {
    // 请求数据，获取频道筛选数据
    async getChanneOptions () {
      // 接口请求数据
      const {
        data: { data }
      } = await this.$axios.get('/channels')
      // console.log(data)
      // 赋值
      this.channeOptions = data.channels
    },
    // 请求接口，获取筛选结果数据 文章列表
    async getArticle () {
      const {
        data: { data }
      } = await this.$axios.get('/articles', { params: this.reqParams })
      // 文章信息
      this.article = data.results
      // 总条数
      this.total = data.total_count
      // console.log(this.article)
    },
    parer (newPage) {
      // 赋值当前页码
      this.reqParams.page = newPage
      // 重新获取文章
      this.getArticle()
      // console.log(1)
    },
    // 筛选查询
    search () {
      // 判断频道的值是否为‘’
      if (this.reqParams.channe_id === '') this.reqParams.channe_id = null
      // 回到第一页
      this.reqParams.page = 1
      // 重新获取文章
      this.getArticle()
    },
    changeDate (dateArr) {
      console.log(dateArr)
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 编辑
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async del (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        try {
          await this.$axios.delete(`articles/${id}`)
          this.getArticle()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } catch (e) {
          this.$message({
            type: 'info',
            message: '删除失败!'
          })
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
