<template>
  <div>

  <div class="readcantain">
    <my-header> </my-header>
    <div class="titlecss" align="left" >
      {{article.title}}
    </div>

    <div class="autorInfo" align="left">
      <span>{{article.nickname}}</span>
      <span>&emsp;</span>
      <img class="likecss" src="@/assets/images/comment.png" title="评论"/>
      <span>{{article.count_comments}}</span>
      <span>&emsp;</span>
      <img class="likecss" src="@/assets/images/like.png" title="点赞"/>
      <span>{{article.count_likes}}</span>
      <span>&emsp;{{article.release_time}}</span>
      <span>&emsp;&emsp;收藏</span>
      <a class="channelcss" v-on:click="jumpToHome">{{article.categoryname}}</a>
    </div>

    <div class="introductioncss" align="left">
      {{article.introduction}}
    </div>

    <div align="left" v-html="contentInfo"></div>

    <div class="praise-box">
      <img  align="" class="likecontentcss" src="@/assets/images/like.png" @click="addArticlelikes" title="点赞"/>
      <span style="margin-top: 0px">{{article.count_likes}}</span>
    </div>

    <br/>
    <br/>

    <div align="left">
      <el-tag >姆巴佩</el-tag>
      <el-tag type="success">世界杯</el-tag>
      <el-tag type="info">小米</el-tag>
      <el-tag type="warning">邓肯</el-tag>
      <el-tag type="danger">西安</el-tag>
    </div>

    <br/>
    <br/>

    <div align="left">
      <p class="topicTitlecss">推荐阅读</p>

      <el-row class="pushnewscss">
        <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 3 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="@/assets/images/hamburger.50e4091.png" class="image">
            <div style="padding: 12px;">
              <span>好吃的汉堡</span>
              <!--<div class="bottom clearfix">-->
                <!--<time class="time">{{ currentDate }}</time>-->
                <!--&lt;!&ndash;<el-button type="text" class="button">操作按钮</el-button>&ndash;&gt;-->
              <!--</div>-->
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
        size="large"
        :rows="4"
        placeholder="请输入评论内容"
        v-model="comments">
      </el-input>
      <el-button class="pushButtoncss" type="primary" @click="publishcomment">发表</el-button>
    </div>

    <div align="left">
      <p class="topicTitlecss">热门评论</p>
      <div title="热门评论" v-for="item in hotcomments">
        <img class="useravtarcss" src="@/assets/images/avatar.jpg"/>
        <span class="usernamecss">&emsp;{{item.nickname}}</span>

        <img class="likecss likecommentcss" src="@/assets/images/like.png" title="点赞"/>
        <span>
            {{item.like_num}}
        </span>
        <span>
          &emsp;&emsp;&emsp;
        </span>
        <img class="likecss" src="@/assets/images/report.png" title="举报"/>
        <span>
           0
        </span>
        <p class="commentcss">
          {{item.content}}
        </p>
        <img class="reviewcss" src="@/assets/images/review.png" title="点评"/>
        <span class="reviewfontcss">
          I want 点评
        </span>
        <hr class="dividingline" align="left" />
      </div>
    </div>

    <br/>
    <br/>

    <div align="left">
      <p class="topicTitlecss">最新评论</p>
      <div title="热门评论" v-for="item in newcomments">
        <img class="useravtarcss" src="@/assets/images/avatar.jpg"/>
        <span class="usernamecss">&emsp;{{item.nickname}}</span>

        <img class="likecss likecommentcss" src="@/assets/images/like.png" title="点赞"/>
        <span>
          {{item.like_num}}
        </span>
        <span>
          &emsp;&emsp;&emsp;
        </span>
        <img class="likecss" src="@/assets/images/report.png" title="举报"/>
        <span>
            0
        </span>
        <p class="commentcss">
          {{item.content}}
        </p>
        <img class="reviewcss" src="@/assets/images/review.png" title="点评"/>
        <span class="reviewfontcss">
          I want 点评
        </span>
        <hr class="dividingline" align="left" />
      </div>
    </div>

  </div>

    <br/>
    <br/>
    <my-footer></my-footer>
  </div>


</template>



<script>
  import MyHeader from '../common/myHeader';
  import MyFooter from '../common/myFooter';
  import Bus from '../common/Bus.js';

  export default {
    name: "read-article",
    data () {
      return {
        msg: '这是读文章的页面！',
        article: {
          count_likes:0
        },
        contentInfo:null,
        abortTag:"相关标签",
        recommendedReading:'推荐阅读',
        addComments:'说点什么',
        topComments:'热门评论',
        LatestComments:'最新评论',
        comments:'',
        currentDate: new Date(),
        hotcomments:null,
        newcomments:null
      }
    },
    components: {
      MyHeader,
      MyFooter
    },
    methods: {

      addArticlelikes: function () {
        //判断登陆
        if(this.$store.state.loginstate  == 1) {
          this.$alert('未登录，请先登陆', '登陆提示', {
            confirmButtonText: '确定'
          });
          return;
        }

        var articleId = this.article.article_id;
        var uId = sessionStorage.uId;
        var url = this.HOST + '/article/addArticlelikes?articleId=' + articleId+'&uId='+uId;
        this.$axios.get(url).then(res => {
          var likeResult = res.data;
          if(likeResult.changedRows == 1)
          {
            console.log("点赞成功");
            this.article.count_likes++;
            this.$notify({
              title: '成功',
              message: '点赞成功',
              type: 'success'
            });
          }
          else{
            console.log("点赞失败");
            this.$notify({
              title: '警告',
              message: '取消退出',
              type: 'warning'
            });
          }
          console.log(res);
        }).catch(res => {
          this.$notify({
            title: '警告',
            message: '点赞失败',
            type: 'warning'
          });
        })

      },
      jumpToHome: function () {
        console.log(this.article.categoryId);
        this.$store.commit('setCateId',this.$route.query.categoryId);
        this.$router.push({path: '/'});
      },
      getContentInfo: function () {
        if(this.article.content_id == null || this.article.content_id == "")
        {
          console.log('当前文章内容ID为空！');
          return
        }
        var url = this.HOST + '/article/getSingleArticle?contentId=' + this.article.content_id;
        this.$axios.get(url).then(res => {
          this.contentInfo = res.data;
          console.log(res);
          console.log(this.contentInfo);
        })
      },
      getHotcomments: function () {
        if(this.article.content_id == null || this.article.content_id == "")
        {
          console.log('当前文章内容ID为空！');
          return
        }
        var url = this.HOST + '/article/getHotcomments?articleId=' + this.article.article_id;
        this.$axios.get(url).then(res => {
          console.log('getHotcomments');
          this.hotcomments = res.data;
          console.log(this.hotcomments);
        })
      },
      getNewcomments: function () {
        if(this.article.content_id == null || this.article.content_id == "")
        {
          console.log('当前文章内容ID为空！');
          return
        }
        var url = this.HOST + '/article/getNewcomments?articleId=' + this.article.article_id;
        this.$axios.get(url).then(res => {
          console.log('getNewcomments');
          this.newcomments = res.data;
          console.log(this.newcomments);
        })
      },
      publishcomment: function () {
        //判断登陆
        if(this.$store.state.loginstate  == 1) {
          this.$alert('未登录，请先登陆', '登陆提示', {
            confirmButtonText: '确定'
          });
          return;
        }

        //判断内容是不是空的
        if(this.article.content_id == null || this.article.content_id == "")
        {
          console.log('当前文章内容ID为空！');
          return
        }
        //插入评论
        var qs = require('qs');
        var url = this.HOST + '/article/addcomments';
        this.$axios({
          method: 'post',
          url: url,
          data:qs.stringify({
            'article_id': this.article.article_id,
            'uId': '1',
            'comments': this.comments
          }, { indices: false }),
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then(res => {
          console.log(res);
          if(res.data.insertId > 0)
          {
            this.$message({
              type: 'success',
              message: '评论成功!'
            });
            this.comments = '';
          }
        });
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
      this.article.article_id = this.$route.query.article_id;
      this.article.count_comments = this.$route.query.count_comments;
      this.article.count_likes = this.$route.query.count_likes;
      this.article.categoryname = this.$route.query.categoryname;
      this.article.nickname = this.$route.query.nickname;
      //页面初始化的时候获取文章信息
      this.getContentInfo();
      //页面初始化的时候获取文章的热评信息
      this.getHotcomments();
      //页面初始化的时候获取文章的最新评论信息
      this.getNewcomments();
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
    width: 95%;
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
    height:15px;
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
    color: #3a8ee6;
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
    width:25px;
    height:25px;
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
    /*display: block;*/
    height: 130px;
  }




  .pushnewscss{
    height: 10%;
  }


  .dividingline{
    height:1px;
    border:none;
    border-top:1px dotted #185598;
    margin-top: 20px;
    width: 100%;
  }


</style>
