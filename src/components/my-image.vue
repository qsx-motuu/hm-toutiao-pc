<template>
  <div class="my_image">
    <!-- 按钮 -->
    <div class="btn_box" @click="open">
      <!-- 默认图和选择的图切换传值 接收 -->
      <img :src="value||btnImage" />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img_list">
            <div class="img_item" :class="{selected: selectedImageUrl === item.url}" @click="selectedImage(item.url)" v-for="item in images" :key="item.id">
              <img :src="item.url" />
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入静态图片
import defaultImage from '../assets/default.png'
export default {
  // 封面图片地址
  // 父传子
  props: ['value'],
  data () {
    return {
      // 对话框显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡name的值
      activeName: 'image',
      // 请求素材参数信息
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 上传的图片地址
      uploadImageUrl: null,
      // 素材图片
      selectedImageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm_toutiao_pc')).token
      },
      // 按钮上的预览图
      btnImage: defaultImage
    }
  },
  methods: {
    // 打开对话框
    open () {
      this.dialogVisible = true
      // 加载素材列表
      this.getImages()
    },
    // 分页 下一页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 收藏、全部切换
    toggleList () {
      // 保持当前页数
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取素材列表数据
    async getImages () {
      // 请求
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 赋值总条数
      this.total = data.total_count
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 上传成功
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    // 上传图片确定事件
    confirmImage () {
      // 判断当前选项卡
      if (this.activeName === 'image') {
        // 素材库
        // 判断是否选择一张图片
        if (!this.selectedImageUrl) {
          // 没有选择图片，提示
          return this.$message.warning('请选择一张图片')
        } else {
          // 选择了图片
          // 赋值给图片按钮，预览
          // this.btnImage = this.selectedImageUrl
          // 子传父 提交父组件
          this.$emit('input', this.selectedImageUrl)
          // 关闭对话框
          this.dialogVisible = false
        }
      } else {
        // 上传图片
        // 判断是否上传一张图片
        if (!this.uploadImageUrl) {
          // 没有上传图片，提示
          return this.$message.warning('请上传一张图片')
        } else {
          // 上传了图片
          // 赋值给图片按钮，预览
          // this.btnImage = this.uploadImageUrl
          // 子传父 提交父组件
          this.$emit('input', this.uploadImageUrl)
          // 关闭对话框
          this.dialogVisible = false
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.my_image {
  display: inline-block;
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img_item {
  width: 150px;
  height: 120px;
  position: relative;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  &.selected::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center /
      50px 50px;
  }
}
</style>
