<template>
  <div class="welcome">
    <img src="../../assets/welcome.jpg" alt />
  </div>
</template>

<script>
export default {
  created () {
    // this.$axios({
    //   url: '/articles'
    // }).then(res => {
    //   console.log(res.data)
    // }).catch(err => {
    //   console.log(err)
    // })
    this.getText()
  },
  methods: {
    getText: async function () {
      const res = await this.$axios('/articles')
      console.log(res)
    }
  }
}
</script>

<style>
.welcome img {
  display: block;
  margin: 100px auto 0;
}
</style>
