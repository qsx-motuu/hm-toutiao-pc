<template>
  <div class="container_setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
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
              <el-button type="primary" @click="getUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadPhoto"
            :show-file-list="false"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: null
      }
    }
  },
  created () {
    this.putUserInfo()
  },
  methods: {
    // 获得用户信息
    async putUserInfo () {
      const { data: { data } } = await this.$axios.get('user/profile')
      this.userInfo = data
    },
    // 修改个人信息（除头像 ）
    async getUserInfo () {
      const { name, intro, email } = this.userInfo
      await this.$axios.patch('user/profile', { name, intro, email })
      // 提示
      this.$message.success('保存成功')
      // 更改home组件
      eventBus.$emit('updataName', name)
      // 更改本地存储
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    // 修改头像
    async uploadPhoto ({ file }) {
      // restult.file 是你选择图片后的文件对象
      // 获取文件对象 文档没有记录
      const formData = new FormData()
      formData.append('photo', file)
      // 请求
      const { data: { data } } = await this.$axios.patch('user/photo', formData)
      // 提示
      this.$message.success('修改成功')
      // 预览
      this.userInfo.photo = data.photo
      // 更新home组件头像
      eventBus.$emit('updataPhoto', data.photo)
      // 更改本地存储
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  }
}
</script>

<style scoped lang='less'></style>
