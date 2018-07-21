<template>
  <el-dialog title="用 户 登 陆" :visible.sync="loginshow" class="eldialogcss">
    <el-form  class="elformcss">
      <el-form-item label="名  称:" :label-width="formLabelWidth" >
        <el-input v-model="name" auto-complete="off"  placeholder="会员名/手机号/邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密  码:" :label-width="formLabelWidth" >
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="el-footer">
      <el-button @click="setLoginShow" style="margin: auto">取 消</el-button>
      <el-button type="primary" @click="login" style="margin: auto">登 陆</el-button>
    </div>
  </el-dialog>


</template>

<script>
    export default {
      name: "login-dialog",
      data() {
        return {
          name: '',
          nickname:'',
          password: '',
          formLabelWidth: '120px'
        };
      },
      methods: {
        login: function () {
          var url = this.HOST + '/users/login?name=' + this.name+'&'+'password='+this.password;
          this.$axios.get(url).then(res => {
            sessionStorage.mhusername = res.data[0].username;
            this.$store.commit('setNickname',res.data[0].nickname);
            this.$store.commit('islogin',0);
            this.$store.commit('isregister',0);
            console.log(res);
            this.$store.commit('isloginshow',false);
          });
        },
        setLoginShow: function () {
          console.log('isloginshow');
          this.$store.commit('isloginshow',false);
        }
      },
      mounted:function () {
        console.log('mounted');
        console.log(sessionStorage.mhusername);
      },
      computed: {
        loginshow () {
          return this.$store.state.loginshow
        }
      }
    }
</script>

<style scoped>

  .eldialogcss{
    width: 50%;
    margin-left: 20%
  }
  .elformcss{
    width: 90%;
  }

</style>
