<template>
  <div class="container">
    <!-- 登录卡片 -->
    <el-card>
      <!-- logo -->
      <img src="../../assets/logo_index.png" style="width:200px;" alt="logo" />
      <!-- 表单组件 -->
      <el-form ref="form" :model="loginForm">
        <!-- 输入框 -->
        <!-- <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>-->
        <el-form-item
          prop="mobile"
          :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
        >
          <el-input type="age" v-model.number="loginForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:235px;margin-right:10px;"
          ></el-input> -->
          <el-form-item
          prop="mobile"
          :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
        >
          <el-input type="age" v-model.number="loginForm.mobile" autocomplete="off" style="width:235px;margin-right:10px;"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 确认按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" :plain="true" @click="open">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    open () {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
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
