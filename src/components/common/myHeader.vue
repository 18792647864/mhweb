<template>
  <div>
    <el-menu
      class="el-menu-demo elmenucss"
      mode="horizontal">
      <el-menu-item index="1">
        <img src="@/assets/images/logo.png" alt="蛮荒社区" title="首页" height="50px"/>
      </el-menu-item>

      <el-menu-item index="2" >
          综合推荐
      </el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-button v-if="loginstate == 1" type="primary" @click="setLoginShow">登 陆</el-button>
      <el-button v-if="registerstate == 1" type="primary"v-on:click="jumpToRegister" >注 册</el-button>
      <!--<img v-if="islogin == 0" class="useravtarcss" src="static/avatar.jpg"/>-->
      <span v-if="loginstate == 0" class="nickcss" >{{nickname}} &emsp;</span>
      <el-button type="primary" v-on:click="jumpToWrite">写文章</el-button>
      <span v-if="loginstate == 0" class="nickcss" > &emsp;退出登陆</span>
    </el-menu>

    <login-dialog ></login-dialog>

  </div>
</template>
<script>


import LoginDialog from './logindialog';


export default {
  name: 'myHeader',
  data () {
    return {

    }
  },
  methods: {
    jumpToWrite: function (event) {
      this.$router.push({path: '/WriteArticle'})
    },
    jumpToRegister: function (event) {
      this.$router.push({path: '/register'})
    },
    getUserInfo: function (event) {
      this.$axios.get('http://localhost:3000/users/queryUser?uid=1').then(res => {
        console.log(res)
      })
    },
    setLoginShow: function () {
      console.log('isloginshow');
      this.$store.commit('isloginshow',true);
    }

  },
  mounted:function () {
    // console.log('mounted');
    console.log(sessionStorage.mhusername);
    if(sessionStorage.mhusername) {
      this.$store.commit('islogin',0);
      this.$store.commit('isregister',0);
    }
    else{
      this.$store.commit('islogin',1);
      this.$store.commit('isregister',1);
    }

  },
  computed: {
    loginshow () {
      return this.$store.state.loginshow
    },
    loginstate () {
      return this.$store.state.loginstate
    },
    registerstate () {
      return this.$store.state.registerstate
    },
    nickname () {
      return this.$store.state.nickname
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

.elmenucss{

  width: 50%;
}

.el-menu-item{
  font-size: 18px;
}

.el-button {
    margin-top: 10px;
}



  .registercss{
    margin-left: 5%;
  }

.useravtarcss{
  margin-left: 15px;
  margin-top: 15px;
  width:40px;
  height:40px;
  border-radius:20px;
}

  .nickcss{
    font-size: small;
    font-style: inherit;
    color: #3a8ee6;
  }



</style>
