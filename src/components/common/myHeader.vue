<template>
  <div>

    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal">
      <el-menu-item index="1" >
          处理中心
      </el-menu-item>
      <el-submenu index="2">
        <template  slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template  slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      <el-button type="primary">登陆</el-button>
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
    }
  }

}
</script>

<style scoped>
.el-menu {
  position: fixed;
  top: 0px;
  left: 25%;
  width: 67%;
  z-index: 999;
}
.templatecss{
  font-size: 17px;
}

.el-button {
    margin-top: 10px;
}

</style>
