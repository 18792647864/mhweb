<template>
  <div class="context">
    <div  v-for="item in articleInfo">
      <div class="titlecss" align="left">
        {{item.title}}
      </div>

      <div class="introductioncss" align="left">
        {{item.introduction}}
      </div>

      <div class="autorInfo" align="left">
        <span>
          {{item.uId}}
        </span>
        <span>&emsp;&emsp;</span>
        <img class="likecss" src="/static/comment.png" title="评论"/>
        <span>
          15
        </span>
        <span>&emsp;&emsp;</span>
        <img class="likecss" src="/static/like.png" title="点赞"/>
        <span>
          100
        </span>
        <a  class="channelcss" href="homePage.vue">{{item.categoryId}}</a>
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
          articleInfo: null
        }
      },
    methods: {
      queryArticles: function (event) {
       var url = this.HOST + '/article/queryArticle';
       this.$axios.get(url).then(res => {
          console.log('console.log(res)');
          this.articleInfo = res.data;
          console.log(res)
       })
     }
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
  }

  .titlecss{
    font-size: larger;
    font-weight: inherit;
    font-style: inherit;
    top: auto;
    left: auto;
    font-weight: bold;
  }

  .introductioncss{
    width: 60%;
    font-size: larger;
    font-weight: inherit;
    font-style: inherit;
    margin-top: 10px;
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

  .channelcss{
    float: right;
  }
</style>



