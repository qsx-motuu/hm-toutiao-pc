<template>
  <el-container class="comtainer">
    <el-aside :width="isOpen?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{smallLogo:isOpen}"></div>
      <!-- 下拉菜单 -->
      <el-menu
        :default-active="$route.path"
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
        <el-dropdown class="dropdown" @command="loginOut">
          <span class="el-dropdown-link">
            <img :src="userIbfo.photo" alt class="headImg" />
            <span class="username">{{userIbfo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="loginout">退出登录</el-dropdown-item>
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
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      // 导航栏是否折叠，默认为true折叠
      isOpen: false,
      userIbfo: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    checkMenu () {
      // 触发事件，更改isOpen
      this.isOpen = !this.isOpen
    },
    loginOut (a) {
      switch (a) {
        case 'loginout':
          this.$confirm('此操作将要退出该系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
            local.delUser()
            this.$router.push('/login')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            })
          })
          break
        default:this.$router.push('/setting')
          break
      }
    }
  },
  created () {
    // 请求个人信息
    const user = local.getUser() || {}
    this.userIbfo.name = user.name
    this.userIbfo.photo = user.photo
    // 绑定事件，修改name
    eventBus.$on('updataName', (name) => {
      console.log(name)
      this.userIbfo.name = name
    })
    // 绑定事件，修改photo
    eventBus.$on('updataPhoto', (photo) => {
      // console.log(photo)
      this.userIbfo.photo = photo
    })
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
