<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{id}}</el-form-item>
            <el-form-item label="手机：">{{mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="putUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: ''
      },
      imageUrl: null,
      id: null,
      mobile: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async putUserInfo () {
      const { data: { data } } = await this.$axios.patch('profile', this.userInfo)
      console.log(data)
    },
    async getUserInfo () {
      const { data: { data } } = await this.$axios.get('user/profile', this.userInfo)
      this.userInfo = data
      this.imageUrl = data.photo
      this.id = data.id
      this.mobile = data.mobile
      console.log(data)
    }
  }
}
</script>

<style scoped lang='less'></style>
