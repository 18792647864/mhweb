<template>
  <div>

  <div class="readcantain">
    <my-header> </my-header>
    <div class="titlecss" align="left" >
      {{article.title}}
    </div>

    <div class="autorInfo" align="left">
      <span>{{article.uId}}</span>
      <span>&emsp;</span>
      <img class="likecss" src="@/assets/images/comment.png" title="评论"/>
      <span>15</span>
      <span>&emsp;</span>
      <img class="likecss" src="@/assets/images/like.png" title="点赞"/>
      <span>100</span>
      <span>&emsp;{{article.release_time}}</span>
      <span>&emsp;&emsp;收藏</span>
      <a class="channelcss" href="homePage.vue">{{article.categoryId}}</a>
    </div>

    <div class="introductioncss" align="left">
      {{article.introduction}}
    </div>

    <div align="left" v-html="contentInfo"></div>

    <div class="praise-box">
      <img  align="" class="likecontentcss" src="@/assets/images/like.png" title="点赞"/>
      <span style="margin-top: 0px">100</span>
    </div>

    <br/>
    <br/>

    <div align="left">
    <el-tag>姆巴佩</el-tag>
    <el-tag type="success">世界杯</el-tag>
    <el-tag type="info">小米</el-tag>
    <el-tag type="warning">邓肯</el-tag>
    <el-tag type="danger">西安</el-tag>
  </div>

    <br/>
    <br/>

    <div align="left">
      <p class="topicTitlecss">推荐阅读</p>

      <el-row>
        <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="@/assets/images/hamburger.50e4091.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <br/>
    <br/>

    <div align="left">
      <p class="topicTitlecss">说点什么</p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入评论内容"
        v-model="comments">
      </el-input>
      <el-button class="pushButtoncss" type="primary">发表</el-button>
    </div>

    <div align="left">
      <p class="topicTitlecss">热门评论</p>
      <div title="热门评论">
        <img class="useravtarcss" src="@/assets/images/avatar.jpg"/>
        <span class="usernamecss">&emsp;用户名称</span>

        <img class="likecss likecommentcss" src="@/assets/images/like.png" title="点赞"/>
        <span>
          100
        </span>
        <span>
          &emsp;&emsp;&emsp;
        </span>
        <img class="likecss" src="@/assets/images/report.png" title="举报"/>
        <span>
          100
        </span>
        <p class="commentcss">
          年纪轻轻就疯了，一点都不可惜
        </p>
        <img class="reviewcss" src="@/assets/images/review.png" title="点评"/>
        <span class="reviewfontcss">
          I want 点评
        </span>
      </div>
    </div>

    <br/>
    <br/>

    <div align="left">
      <p class="topicTitlecss">最新评论</p>
      <div title="热门评论">
        <img class="useravtarcss" src="@/assets/images/avatar.jpg"/>
        <span class="usernamecss">&emsp;用户名称</span>

        <img class="likecss likecommentcss" src="@/assets/images/like.png" title="点赞"/>
        <span>
          100
        </span>
        <span>
          &emsp;&emsp;&emsp;
        </span>
        <img class="likecss" src="@/assets/images/report.png" title="举报"/>
        <span>
          100
        </span>
        <p class="commentcss">
          毕志飞🌚🌚🌚🌚🌚🌚🌚🌚🌚🌚
        </p>
        <img class="reviewcss" src="@/assets/images/review.png" title="点评"/>
        <span class="reviewfontcss">
          I want 点评
        </span>
      </div>
    </div>

  </div>

    <br/>
    <br/>
    <my-footer></my-footer>
  </div>


</template>



<script>
  import MyHeader from '../common/myHeader'
  import MyFooter from '../common/myFooter'

  export default {
    name: "read-article",
    data () {
      return {
        msg: '这是读文章的页面！',
        article: {},
        contentInfo:null,
        abortTag:"相关标签",
        recommendedReading:'推荐阅读',
        addComments:'说点什么',
        topComments:'热门评论',
        LatestComments:'最新评论',
        comments:null,
        currentDate: new Date()

      }
    },
    components: {
      MyHeader,
      MyFooter
    },
    methods: {
      getContentInfo: function () {
        if(this.article.content_id == null || this.article.content_id == "")
        {
          console.log('当前文章ID为空！');
          return
        }
        var url = this.HOST + '/article/getSingleArticle?contentId=' + this.article.content_id;
        this.$axios.get(url).then(res => {
          this.contentInfo = res.data;
          console.log(res);
          console.log(this.contentInfo);
        })
      }
    },
    created:function () {
      // console.log("created");
      // console.log(this.$route.query.article);
    },

    mounted:function () {
      console.log("mounted");
      // console.log(this.$route.query.article);

      this.article.title = this.$route.query.title;
      this.article.uId = this.$route.query.uId;
      this.article.release_time = this.$route.query.release_time;
      this.article.categoryId = this.$route.query.categoryId;
      this.article.introduction = this.$route.query.introduction;
      this.article.content_id = this.$route.query.content_id;
      this.getContentInfo();
    }
  }
</script>

<style scoped>

  .readcantain{
    background-color: #fff;
    border-radius: 20px;
    width: 40%;
    height: auto;
    margin-left: 24%;
    top: auto;
    left: auto;
    border: #2d3237;
    margin-top: 70px;
  }

  .introductioncss{
    width: 100%;
    color: #c0ccda;
    font-size: 17px;
    font-weight: inherit;
    font-style: inherit;
    margin-top: 10px;
  }

  .titlecss{
    font-size: 28px;
    margin: 0;
    position: inherit;
    line-height: 1.5;
    color: #333;
    word-wrap: break-word;
    word-break: normal;
    bottom: 22px;
  }

  .autorInfo{
    width: 60%;
    margin-top: 10px;
  }

  .likecss{
    height:15px;
  }

  .likecontentcss{
    height:48px;
  }


  .reviewcss{
    margin-top: 10px;
    height:20px;
  }

  .reviewfontcss{
    color: silver;
    cursor: pointer;
    width: 120px;
  }

  .likecommentcss{
    margin-left: 60%;
  }



  .channelcss{
    float: right;
  }

  .topicTitlecss{
    display: inline-block;
    border-bottom: 4px solid #f63756;
    height: 28px;
    line-height: 20px;
    font-size: 16px;
  }

  .pushButtoncss{
    font-size: x-large;
    margin-top: 10px;
    width: 150px;
  }

  .useravtarcss{
    margin-left: 15px;
    margin-top: 10px;
    width:30px;
    height:30px;
    border-radius:10px;
  }

  .commentcss{
    margin-left: 15px;
    margin-top: 10px;
  }

  .praise-box {
    text-align: center;
    height: 48px;
    width: 148px;
    border: 1px solid #f6f6f6;
    line-height: 48px;
    color: #bbb;
    cursor: pointer;
    margin-left: 45%;
  }




  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    height: 220px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }





</style>
