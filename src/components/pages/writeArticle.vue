<template>
  <div>
    <my-header> </my-header>

    <div class="quilleditorcss">

      <div class="order">
        <span class="line"></span>
        <span class="txt">投 稿</span>
        <span class="line"></span>
        <span class="pointout" @click="submissionPointout">投稿提示</span>
      </div>

        <!--<h3 align="left" style="margin-top:10px" >文章标题</h3>-->

        <el-input v-model="title" placeholder="请输入标题,1-60个字" class="titlecss"></el-input>

        <el-select v-model="catevalue" placeholder="请选择文章分类" class="selectcss">
          <el-option
            v-for="item in cateoptions"
            :key="item.catevalue"
            :label="item.catelabel"
            :value="item.catevalue">
          </el-option>
        </el-select>

      <el-button type="primary" v-on:click="jumpToCreateCommunity">新的社区</el-button>

        <!--<h3 align="left">文章简介</h3>-->
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入文章简介"
          v-model="introduction" class="intrcss">
        </el-input>
        <h5 align="left">文章内容</h5>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options = "editorOption"
                   >
        </quill-editor>

        <el-button class="elbuttoncss" type="primary" v-on:click="saveArticle('0')" >发布文章</el-button>
        <el-button class="elbuttoncss" type="primary" v-on:click="saveArticle('1')">保存草稿</el-button>
    </div>

    <my-footer> </my-footer>
  </div>

</template>
<script>
import MyHeader from '../common/myHeader'
import MyFooter from '../common/myFooter'
import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'write-article',
    data () {
      return {
        msg: '这是写文章的页面！',
        content: '',
        introduction:'',
        title:'',
        editorOption:{},
        cateoptions: null,
        catevalue: ''
      }
    },
    components: {
      MyHeader,
      MyFooter,
      quillEditor
    },
    methods: {
      jumpToCreateCommunity: function (event) {
        this.$router.push({path: '/CreateCommunity'})
      },
      saveArticle: function (isdraft) {
        // console.log(this.title)
        // console.log(this.introduction)
        // console.log(this.content)
        var parm = {
          title: this.title,
          introduction: this.introduction,
          content: this.content,
          uId:sessionStorage.uId,
          isdraft:isdraft,
          catevalue:this.catevalue
        };

        var qs = require('qs');
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/article/addArticle',
          data:qs.stringify(parm, { indices: false }),
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        })
      },
      getUserInfo: function (event) {
        this.$axios.get('http://localhost:3000/users/queryUser?uid=1').then(res => {
          console.log(res)
        })
      },
      getCateOptions: function (event) {
        var url = 'http://localhost:3000/article/getCateOptions';
        this.$axios.get(url).then(res => {
          console.log('getCateOptions');
          console.log(res);
          this.cateoptions = res.data;
        })
      },
      submissionPointout: function () {
        this.$alert('请保持原创、尊重原创、转载请注明出处、欢迎投稿' , '投稿提示', {
          confirmButtonText: 'I KNOW'
        });
      }
    },
    mounted:function () {
      this.getCateOptions();
    }
  }
</script>

<style scoped>
  .quilleditorcss{
    background-color: #fff;
    border-radius: 20px;
    width: 40%;
    margin-left: 24%;
  }

  .intrcss{
    margin-top: 3%;
    width: 100%;
  }

  .titlecss{
    margin-top: 3%;
    width: 58%;
    float: left;
  }


  .selectcss{
    margin-top: 3%;
  }

  .elbuttoncss {
    margin-top: 10%;
    left: 0px;
    float:left
  }


  .order {
    height: 60px;
    line-height: 60px;
    text-align: right;
  }

  .order .line {
    display: inline-block;
    width: 40%;
    border-top: 1px solid #ccc ;
  }

  .order .txt {
    color: #2d3237;
    font-size: xx-large;
    vertical-align: super;
  }

  .order .pointout{
    color: #3a8ee6;
  }

  .quill-editor {
    height: 300px;
  }

</style>
