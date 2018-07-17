<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal">
      <el-menu-item index="1">
        <img src="static/logo.png" alt="蛮荒社区" title="首页" height="50px"/>
      </el-menu-item>

      <el-menu-item index="2" >
          综合推荐
      </el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      <el-button type="primary" v-on:click="getUserInfo">登陆</el-button>
      <el-button type="primary">注册</el-button>
      <el-button type="primary" v-on:click="jumpToWrite">写文章</el-button>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  data () {
    return {
      radio: '1',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    jumpToWrite: function (event) {
      this.$router.push({path: '/WriteArticle'})
    },
    getUserInfo: function (event) {
      this.$axios.get('http://localhost:3000/users/queryUser?uid=1').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.el-menu {
  position: fixed;
  top: 0px;
  left: 23%;
  width: 67%;
  z-index: 999;
}

.el-menu-item{
  font-size: 18px;
}

.el-button {
    margin-top: 10px;
}

</style>
