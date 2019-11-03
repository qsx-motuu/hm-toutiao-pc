<template>
  <div class="container-images">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div>
        <!-- 按钮单选框 label是值-->
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材 -->
        <el-button type="success" style="float:right" size="small" @click="openDialog">添加素材</el-button>
        <!-- 素材列表 -->
        <div class="img_list">
          <div class="img_item" v-for="item in images" :key="item.id">
            <img :src="item.url" />
            <!-- 底部操作框 -->
            <div class="footer" v-if="!reqParams.collect">
              <span
                class="el-icon-star-off"
                :class="{red:item.is_collected}"
                @click="toggleStatus(item)"
              ></span>
              <span @click="toggleDel(item.id)" class="el-icon-delete"></span>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 上传图片 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        name='image'
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求素材参数信息
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 上传成功后图片的地址
      imageUrl: null,
      // 对话框的显示隐藏
      dialogVisible: false,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm_toutiao_pc')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 发送请求，获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.reqParams })
      // 总条数
      this.total = data.total_count
      // 素材列表
      this.images = data.results
    },
    // 分页切换
    pager (newPage) {
      // 点击时的新页数重新赋值
      this.reqParams.page = newPage
      this.getImages()
    },
    // 列表切换
    toggleList () {
      // 总保持在第一页
      this.reqParams.page = 1
      this.getImages()
    },
    // 收藏图片
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$axios.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功后修改样式
      item.is_collected = data.collect
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
      // this.getImages()
    },
    // 删除
    toggleDel (id) {
      this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确定后
          await this.$axios.delete(`user/images/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImages()
        })
        .catch(() => {
          // 取消后
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSuccess (res) {
      // console.log(res)
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    openDialog () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 250px;
    height: 250px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      span {
        margin: 0 30px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
