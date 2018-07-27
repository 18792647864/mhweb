<template>
  <div>
    <el-menu
      class="el-menu-demo elmenucss"
      mode="horizontal">
      <el-menu-item index="1" >
        <img src="@/assets/images/logo.png" alt="蛮荒社区" title="首页" height="60px" v-on:click="jumpToHome('0')"/>
      </el-menu-item>


      <el-menu-item index="2" v-on:click="jumpToHome('0')">
          综合推荐
      </el-menu-item>
      <el-menu-item index="3" v-on:click="jumpToHome('1')" >IT资讯</el-menu-item>
      <el-menu-item index="4" v-on:click="jumpToHome('4')">区块链专题</el-menu-item>
      <!--<el-menu-item index="5" style="width: 20px"> <i class="el-icon-menu imenucss"></i></el-menu-item>-->

      <el-menu-item index="5" style="width: 20px">
          <el-dropdown trigger="click" >
            <span class="el-dropdown-link">
              <i class="el-icon-menu imenucss"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="clearfix" >
                <div v-on:click="jumpToHome('2')">
                  创业频道
                </div>
                <!--<el-badge class="mark" :value="12" />-->

                  <!--<a href="/">这是一个a标签</a>-->

              </el-dropdown-item>
              <el-dropdown-item class="clearfix" >

                <span v-on:click="jumpToHome('3')">法律先锋</span>
                <!--<el-badge class="mark" :value="3" />-->
              </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-button v-if="loginstate == 1" type="primary" @click="setLoginShow">登 陆</el-button>
      <el-button v-if="registerstate == 1" type="primary"v-on:click="jumpToRegister" >注 册</el-button>
      <!--<img v-if="loginstate == 0" class="useravtarcss" src="@/assets/images/avatar.jpg"/>-->
      <!--<el-menu-item style="margin-left: 23%" v-if="loginstate == 0" class="nickcss" v-on:click="jumpToPersonalpage">{{nickname}} &emsp;</el-menu-item>-->

      <el-menu-item  v-if="loginstate == 0" class="nickavtarcss" index="6">
        <img class="useravtarcss" src="@/assets/images/avatar.jpg" v-on:click="jumpToPersonalpage"/> &emsp;
      </el-menu-item>
      <el-button type="primary" v-on:click="jumpToWrite" >写文章</el-button>
      <span v-if="loginstate == 0" class="nickcss" @click="loginOff"> &emsp;退出登陆</span>
    </el-menu>

    <login-dialog ></login-dialog>

  </div>
</template>
<script>


import LoginDialog from './logindialog';

import Bus from './Bus.js';



export default {
  name: 'myHeader',
  data () {
    return {

    }
  },
  methods: {
    jumpToWrite: function (event) {
      console.log(this.$store.state.loginstate);
      if(this.$store.state.loginstate  == 1) {
        this.$alert('未登录，请先登陆', '登陆提示', {
          confirmButtonText: '确定'
        });
        return;
      }
      else {
        this.$router.push({path: '/WriteArticle'})
      }
    },
    jumpToHome: function (cateId) {
      this.$store.commit('setCateId',cateId);
      Bus.$emit('on', '来自兄弟组件');
      this.$router.push({path: '/'})
    },
    jumpToRegister: function (event) {
      this.$router.push({path: '/register'})
    },

    jumpToPersonalpage: function (event) {
      this.$router.push({path: '/PersonalPage'})
    },
    getUserInfo: function (event) {
      this.$axios.get('http://localhost:3000/users/queryUser?uid=1').then(res => {
        console.log(res)
      })
    },
    setLoginShow: function () {
      console.log('isloginshow');
      this.$store.commit('isloginshow',true);
    },
    loginOff: function () {
      this.$confirm('确定要退出登陆?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '退出成功',
          type: 'success'
        });
        this.$store.commit('islogin',1);
        this.$store.commit('isregister',1);
        sessionStorage.removeItem('mhusername');
        sessionStorage.removeItem('uId');
      }).catch(() => {
        this.$notify({
          title: '警告',
          message: '取消退出',
          type: 'warning'
        });
      });
    }

  },
  mounted:function () {
    console.log('mounted');
    console.log(sessionStorage.mhusername);
    console.log(sessionStorage.uId);
    if(sessionStorage.mhusername) {
      console.log('1111111111');
      this.$store.commit('islogin',0);
      this.$store.commit('isregister',0);
    }
    else {
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
  font-size: 15px;
  border: #2d3237;
}

.el-button {
    margin-top: 10px;
}



  .registercss{
    margin-left: 5%;
  }

.useravtarcss{
  width:30px;
  height:30px;
  border-radius:20px;
}

  .nickcss{
    font-size: small;
    font-style: inherit;
    color: #3a8ee6;
  }


.nickavtarcss{
  font-size: small;
  /*font-style: inherit;*/
  /*color: #3a8ee6;*/
  margin-left: 23%;
  width: 7%;
}

  .imenucss{
    margin: -7px 0px 0px -10px;
    /*float: left*/
  }



</style>
