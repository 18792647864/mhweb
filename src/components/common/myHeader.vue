<template>
  <div>
    <el-menu

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
      <el-button v-if="islogin == 1" type="primary" >登 陆</el-button>
      <el-button type="primary" >注 册</el-button>
      <el-button type="primary" v-on:click="jumpToWrite">写文章</el-button>
    </el-menu>


    <el-dialog title="用 户 登 陆" :visible.sync="dialogFormVisible" class="eldialogcss">
      <el-form :model="form" class="elformcss">
        <el-form-item label="昵  称:" :label-width="formLabelWidth" >
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密  码:" :label-width="formLabelWidth" >
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="el-footer">
        <el-button @click="dialogFormVisible = false" style="margin: auto">取 消</el-button>
        <el-button type="primary" @click="login" style="margin: auto">登 陆</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>

  import LoginDialog from './logindialog';

export default {
  name: 'myHeader',
  data () {
    return {
      islogin:'1',
      dialogFormVisible: true,
      form: {
        name: '',
        password: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
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
    },
    login: function () {
      var url = this.HOST + '/users/login?name=' + this.form.name+'&'+'password='+this.form.password;
      this.$axios.get(url).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    LoginDialog
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

  .eldialogcss{
    width: 50%;
    margin-left: 20%
  }
  .elformcss{
    width: 90%;
  }

  .registercss{
    margin-left: 5%;
  }



</style>
