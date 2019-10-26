<template>
  <div class="container">
    <!-- 登录卡片 -->
    <el-card>
      <!-- logo -->
      <img src="../../assets/logo_index.png" style="width:200px;" alt="logo" />
      <!-- 表单组件 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <!-- 输入框 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px;"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 确认按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" :plain="true" @click="login">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()// 成功
      } else {
        // 失败
        callback(new Error('手机格式不正确，请重新输入'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      // 添加简单校验功能
      loginRules: {
        // 手机号
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        // 验证码
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入正确验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open () {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('手机号或者验证码错误，请重新输入')
            this.loginForm.mobile = ''
            this.loginForm.code = ''
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
}
.el-card {
  width: 400px;
  height: 340px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    margin: 0 auto 30px;
  }
  opacity: 0.8;
}
</style>
