<template>
  <div class="container-article">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]" >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 插图组件 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item v-if="$route.query.id">
          <el-button type="primary" @click="update(false)">修改</el-button>
          <el-button  @click="update(true)">存入草稿</el-button>
        </el-form-item>
         <el-form-item v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button  @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            // 加粗，斜体，下划线，删除线
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    // const articleId = this.$route.query.id
    // if (articleId) {
    //   // 获取当前文章信息
    //   this.getArticle(articleId)
    // }
    this.toggleArticleStatus()
  },
  methods: {
    async create (draft) {
      // 发表 存入草稿
      await this.$axios.post(`articles?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 去内容管理
      this.$router.push('/article')
    },
    // 修改
    async update (draft) {
      // 发表 存入草稿
      await this.$axios.put(`articles/${this.articleForm.id}?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 去内容管理
      this.$router.push('/article')
    },
    async getArticle (id) {
      const { data: { data } } = await this.$axios.get('articles/' + id)
      // 表单填充  面包屑文字   按钮文字
      this.articleForm = data
    },
    // 切换发布与修改
    toggleArticleStatus () {
      // 地址栏id
      const articleId = this.$route.query.id
      // 判断当前是否编辑，
      if (articleId) {
        // 获取当前文章信息
        this.getArticle(articleId)
      } else {
        // 重置空对象
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  watch: {
    // data = {a:{b:10}}  'a.b':function(){}
    // （只要是this能够获取到的数据）字段名称：function(newVal,oldVal){ //当数据改变就会执行  }
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  }
}
</script>

<style scoped lang='less'>
</style>
