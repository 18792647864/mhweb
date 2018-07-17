<template>

  <div class="readcantain">
    <my-header> </my-header>
    <div class="titlecss" align="left" >
      {{article.title}}
    </div>

    <div class="autorInfo" align="left">
      <span>{{article.uId}}</span>
      <span>&emsp;</span>
      <img class="likecss" src="/static/comment.png" title="评论"/>
      <span>15</span>
      <span>&emsp;</span>
      <img class="likecss" src="/static/like.png" title="点赞"/>
      <span>100</span>
      <span>&emsp;{{article.release_time}}</span>
      <span>&emsp;&emsp;收藏</span>
      <a  class="channelcss" href="homePage.vue">{{article.categoryId}}</a>
    </div>

    <div class="introductioncss" align="left">
      {{article.introduction}}
    </div>

    <div align="left" v-html="contentInfo">

    </div>
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
        article: this.$route.params.article,
        contentInfo:null
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
      console.log("created");
      console.log(this.$route.params.article);
    },

    mounted:function () {
      console.log("mounted");
      console.log(this.$route.params.article);
      this.article = this.$route.params.article;
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
    margin-left: 23%;
    top: auto;
    left: 23%;
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

  .channelcss{
    float: right;
  }


</style>
