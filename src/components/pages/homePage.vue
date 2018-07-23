<template>
  <div class="context">
    <div  v-for="item in articleInfos">
      <div class="titlecss" align="left" @click="jumpToRead(item)">
        {{item.title}}
      </div>

      <!--<div class="titlecss" align="left">-->
        <!--<router-link :to="{ name: 'readArticle', query: { article:item }}" active-class="active">{{item.title}}</router-link>-->
      <!--</div>-->


      <div class="introductioncss" align="left" @click="jumpToRead(item)" >
        {{item.introduction}}
      </div>

      <div class="autorInfo" align="left">
        <img class="avatarcss" src="@/assets/images/avatar.jpg" title="头像"/>
        <span>
          {{item.nickname}}
        </span>
        <span>&emsp;</span>
        <img class="likecss" src="@/assets/images/comment.png" title="评论"/>
        <span>
          {{item.count_comments}}
        </span>
        <span>&emsp;</span>
        <img class="likecss" src="@/assets/images/like.png" title="点赞"/>
        <span>
          {{item.count_likes}}
        </span>
        <span>&emsp;{{item.release_time}}</span>
        <a  class="channelcss" href="homePage.vue">{{item.categoryname}}</a>
      </div>
      <hr class="dividingline" align="left" />
      <div style="margin: 10px 0;"></div>
    </div>

  </div>

</template>

<script>
 export default {
    name: "home-page",
    data() {
        return {
          articleInfos: null,
          active: false
        }
      },
    methods: {
      queryArticles: function (event) {
       var url = this.HOST + '/article/queryArticle';
       this.$axios.get(url).then(res => {
          console.log('console.log(res)');
          this.articleInfos = res.data;
          console.log(res)
       })
     },
      jumpToRead: function (article) {
        console.log(article);
        this.$router.push({name:'readArticle',query:{ article_id:article.article_id,
                                                      title:article.title,
                                                      uId:article.uId,
                                                      release_time:article.release_time,
                                                      categoryId:article.categoryId,
                                                      introduction:article.introduction,
                                                      content_id:article.content_id,
                                                      count_comments:article.count_comments,
                                                      count_likes:article.count_likes,
                                                      nickname:article.nickname,
                                                      categoryname:article.categoryname}});
      },
   },
   mounted:function () {
     this.queryArticles();
   }
 }
</script>

<style scoped>
  .context{
    background-color: #fff;
    border-radius: 20px;
    width: 1000px;
    height: auto;
    margin: auto;
    top: auto;
    left: auto;
    border: #2d3237;
    margin-top: 70px;
    margin-left: 24%;
  }

  .titlecss{
    font-size: larger;
    top: auto;
    left: auto;
    color: #303030;
    font-size: 20px;
  }

  .introductioncss{
    width: 60%;
    margin-top: 10px;
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }
  .autorInfo{
    width: 60%;
    margin-top: 10px;
  }

  .dividingline{
    height:1px;
    border:none;
    border-top:1px dotted #185598;
    margin-top: 20px;
    width: 60%;
  }

  .likecss{
    height:15px;
  }

  .avatarcss{
    height:20px;
    border-radius:5px;
  }

  .channelcss{
    float: right;
    color: #c0ccda;
  }
</style>



