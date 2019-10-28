<template>
  <el-container class="comtainer">
    <el-aside :width="isOpen?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{smallLogo:isOpen}"></div>
      <!-- 下拉菜单 -->
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isOpen"
        :collapse-transition="false"
        style="border-right:none"
        router>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 图标 -->
        <i class="el-icon-s-fold icon" @click="checkMenu"></i>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="dropdown" @command="userOut">
          <span class="el-dropdown-link">
            <img ref="user" v-bind:src="user.imgUrl" alt class="headImg" />
            <span class="username">{{user.username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item icon="el-icon-setting" command="set">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="out">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      // 导航栏是否折叠，默认为true折叠
      isOpen: false,
      user: {
        username: '',
        imgUrl: require('../../assets/avatar.jpg')
      }

    }
  },
  methods: {
    checkMenu () {
      // 触发事件，更改isOpen
      this.isOpen = !this.isOpen
    },
    userOut (a) {
      switch (a) {
        case 'out':
          alert(2)
          local.delUser()
          this.$router.push('/login')
          break
        default:alert(1)
          break
      }
      // local.delUser()
      // this.$router.push('/login')
    },
    userOut1 () {
      // local.delUser()
      // this.$router.push('/login')
    }
  },
  created () {
    // 请求个人信息
    // this.$axios({
    //   url: '/user/profile'
    // }).then(res => {
    //   // console.log(this.$refs)
    //   // console.log(res.data)
    //   this.user.username = res.data.data.name
    //   this.user.imgUrl = res.data.data.photo
    // })
    let { name, photo } = local.getUser()
    this.user.username = name
    this.user.imgUrl = photo
  }
}
</script>

<style lang='less'>
.comtainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .headImg {
        width: 30px;
        vertical-align: middle;
        margin-right: 10px;
      }
      .username {
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
