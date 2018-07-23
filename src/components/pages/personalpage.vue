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
                笨笨猪
              </a>

            </div>
            <div style="margin-top: 20px">
              我的简介，我的简介
            </div>

          </div>
          <div class="user-info-box new-user-info-box">
            <div >
              <div class="col-lg col-lg-5">

                  公司：


                <span class="c2">杭州云润
                </span>
              </div>

              <div class="col-lg col-lg-7">性别：<span class="c2">不详 </span></div>

            </div>

            <div  style="margin-top: 30px">
              <div class="col-lg col-lg-5">邮箱：<span class="c2">anff18792647864@163.com </span></div>

              <div class="col-lg col-lg-7">手机号：<span class="c2">18792647864 </span></div>

            </div>

            <div  style="margin-top: 30px">
              <div class="col-lg col-lg-5">职业：<span class="c2">程序员 </span></div>

              <div class="col-lg col-lg-7">注册时间：<span class="c2"> 2018-7-23 17点17分</span></div>


            </div>
            <div  style="margin-top: 30px">
              <!--<div class="col-lg col-lg-5">职业：<span class="c2">程序员 </span></div>-->

              <div class="col-lg col-lg-7">个人介绍：</div>
              <span class="c2"> 我是风中的一朵奇葩！</span>

            </div>


          </div>

        </div>


        <div  style="margin-top: 20px;color: #ff4d51;background-color: #f4f8ff">
          <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
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
          tabPosition:'left'
        }
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

  .user-info-box .user-info {
    font-size: 16px;
    color: #333;
    margin-bottom: 35px;
  }

  .c2 {
    color: #909090;
  }




</style>
