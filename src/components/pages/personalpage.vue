<template>

  <div>
    <my-header></my-header>

    <div class="containcss">
        <div class="user-info">
          <div class="user-head-box">
            <div class="user-face" >
              <a href="homePage.vue" target="_blank">
                <img src="@/assets/images/avatar.jpg"/>
              </a>
            </div>
            <div>
              <a href="homePage.vue" target="_blank" style="font-size: large">
                {{userInfo.nickname}}
              </a>

            </div>
            <div style="margin-top: 20px">
              {{userInfo.personal_profile}}
            </div>

            <div>
              <el-button type="primary" @click="showUserInfoEdit" >修改个人资料</el-button>
            </div>


          </div>
          <div class="user-info-box new-user-info-box">
            <div >
              <div class="col-lg col-lg-5">

                  公司：


                <span class="c2">{{userInfo.company}}
                </span>
              </div>

              <div class="col-lg col-lg-7">性别：<span class="c2">{{userInfo.gender}} </span></div>

            </div>

            <div  style="margin-top: 30px">
              <div class="col-lg col-lg-5">邮箱：<span class="c2">{{userInfo.mailbox}} </span></div>

              <div class="col-lg col-lg-7">手机号：<span class="c2">{{userInfo.phone_number}} </span></div>

            </div>

            <div  style="margin-top: 30px">
              <div class="col-lg col-lg-5">职业：<span class="c2">{{userInfo.career}} </span></div>

              <div class="col-lg col-lg-7">注册时间：<span class="c2">{{userInfo.registration_time}}</span></div>


            </div>
            <div  style="margin-top: 30px">
              <!--<div class="col-lg col-lg-5">职业：<span class="c2">程序员 </span></div>-->

              <div class="col-lg col-lg-intr">个人介绍：</div>
              <span class="c2">  {{userInfo.personal_profile}}</span>

            </div>



          </div>

        </div>


      <br/>

      <div class="user-info2" v-if="UserInfoEdit">

        <el-form :inline="true" :model="userInfo" class="demo-form-inline ">
          <el-form-item label="昵  称" style="margin:30px 0px 20px -300px;">
            <el-input v-model="userInfo.nickname" ></el-input>
          </el-form-item>
          <div></div>
          <el-form-item label="公  司">
            <el-input v-model="userInfo.company" ></el-input>
          </el-form-item>
          <el-form-item label="性  别">
            <el-select v-model="userInfo.gender" >
              <el-option label="男" value="1">男</el-option>
              <el-option label="女" value="2">女</el-option>
              <el-option label="不详" value="0">不详</el-option>
            </el-select>
          </el-form-item>
          <div></div>
          <el-form-item label="邮 箱">
            <el-input v-model="userInfo.mailbox" ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userInfo.phone_number" ></el-input>
          </el-form-item>
          <div></div>
          <el-form-item label="职 业" >
            <el-input v-model="userInfo.career" ></el-input>
          </el-form-item>
          <el-form-item label="生 日" >
            <el-date-picker type="date" placeholder="选择日期" v-model="userInfo.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <div></div>
          <el-form-item label="个人介绍"  class="user-info-update">
            <el-input v-model="userInfo.personal_profile" type="textarea" style="width: 500px;margin-bottom: 20px"></el-input>
          </el-form-item>
          <div></div>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo">确认修改</el-button>
          </el-form-item>

        </el-form>



      </div>


        <div  style="margin-top: 20px;color: #ff4d51;background-color: #f4f8ff">
          <el-tabs :tab-position="tabPosition" >
            <el-tab-pane label="已发表的">
              <div v-for="item in pushArticleInfos">
                <div class="haspushtitlecss">
                  <span> {{item.title}} </span>
                </div>

                <div class="haspushlikecss">
                  <span> {{item.count_likes}} </span>
                  <span>赞 </span>
                </div>

                <div class="haspushcommentscss">
                  <span>{{item.count_comments}} </span>
                  <span>评论 </span>
                </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="我的草稿">
                <div v-for="item in draftArticleInfos">
                  <div class="haspushtitlecss">
                    <span> {{item.title}} </span>
                  </div>

                  <div class="haspushlikecss">
                    <span> {{item.count_likes}} </span>
                    <span>赞 </span>
                  </div>

                  <div class="haspushcommentscss">
                    <span>{{item.count_comments}} </span>
                    <span>评论 </span>
                  </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我的社区">我的社区</el-tab-pane>
            <el-tab-pane label="我的参与">我的参与</el-tab-pane>
          </el-tabs>

        </div>
    </div>

    <my-footer> </my-footer>
  </div>

</template>

<script>
  import MyHeader from '../common/myHeader'
  import MyFooter from '../common/myFooter'
    export default {
      name: "personalpage",
      data () {
        return {
          UserInfoEdit:false,
          tabPosition:'left',
          draftArticleInfos:null,
          pushArticleInfos:null,
          userInfo:{
            nickname:'',
            company:'',
            gender:'',
            mailbox:'',
            phone_number:'',
            career:'',
            birthday:null,
            personal_profile:''
          }
        }
      },
      methods: {
        queryArticles: function (event) {
          var url = this.HOST + '/article/queryUserArticle?uId='+sessionStorage.uId+'&isdraft=';
          this.$axios.get(url+'1').then(res => {
            console.log('console.log(res)');
            this.draftArticleInfos = res.data;
            console.log(res)
          });


          this.$axios.get(url+'0').then(res => {
            console.log('console.log(res)');
            this.pushArticleInfos = res.data;
            console.log(res)
          })
        },
        getUserInfo: function () {
          var url = this.HOST + '/users/queryUser?uid='+sessionStorage.uId;
          this.$axios.get(url).then(res => {
            this.userInfo = res.data[0];
          })
        },
        updateUserInfo: function () {
          //判断登陆
          if(this.$store.state.loginstate  == 1) {
            this.$alert('未登录，请先登陆', '登陆提示', {
              confirmButtonText: '确定'
            });
            return;
          }

          //修改用户信息
          var qs = require('qs');
          var url = this.HOST + '/users/updateUserInfo';
          this.$axios({
            method: 'post',
            url: url,
            data:qs.stringify(this.userInfo, { indices: false }),
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            }
          }).then(res => {
            console.log(' updateUserInfo  then');
            console.log(res);
            if(res.data.changedRows = 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.UserInfoEdit = false;
            }
          }).catch(res=>{
            console.log(' updateUserInfo  catch');
            console.log(res);
          });
        },
        showUserInfoEdit:function () {
          this.UserInfoEdit = !this.UserInfoEdit;
        }
      },
      mounted:function () {
        this.getUserInfo();
        this.queryArticles();
      },
      components: {
        MyHeader,
        MyFooter
      },
    }
</script>

<style scoped>

  .containcss{
    /*background-color: #ff4d51;*/
    margin-left: 24%;
    width:50%;
    border-radius: 20px;
    border: #2d3237;
    /*height: 30%;*/
  }


  .user-info{
    /*min-height: 100px;*/
    background-color: #f4f8ff;
    width: 100%;
    /*height: 10%;*/
  }


  .user-info2{
    /*min-height: 100px;*/
    background-color: #f0f2f5;
    width: 100%;
    /*height: 10%;*/
  }

  .user-info-update{
    margin:0px 0px 0px -300px;
    margin-left: auto;
  }

  .user-head-box{
    width: 270px;
    float: left;
    padding: 30px;
    text-align: center;
  }



  .user-head-box .user-face {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    margin-top: 0px;
    margin-right: auto;
    margin-bottom: 0px;
    margin-left: auto;
  }


  .new-user-info-box {
    position: relative;
  }
  .user-info-box {
    min-height: 280px;
    border-left: 1px solid #f0f0f0;
    margin-left: 269px;
    /*padding: 75px 35px 0 50px;*/
    padding: 20px 0px 20px 50px;
  }

  .col-lg{
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 0px;
  }


  .col-lg-5{
    margin-left: 0px;
    width: 40%;
    float: left;
  }

  .col-lg-7{
    margin-right: 0px;
    width: 100%;
  }

  .col-lg-intr{
    margin-left: 15%;
    float: left;
  }

  .user-info-box .user-info {
    font-size: 16px;
    color: #333;
    margin-bottom: 35px;
  }

  .c2 {
    color: #909090;
  }

  .haspushtitlecss{
    margin-top: 10px;
    width: 60%;
    float: left;
  }

  .haspushlikecss{
    margin-top: 10px;
    width: 20%;
    float: left;
  }

  .haspushcommentscss{
    margin-top: 10px;
    width: 20%;
    float: left;
  }






</style>
