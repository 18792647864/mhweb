<template>
  <div>
    <my-header> </my-header>

    <div class="quilleditorcss">

        <h3 align="left" style="margin-top:10px" >文章标题</h3>

        <el-input v-model="title" placeholder="请输入标题"></el-input>

        <h3 align="left">文章简介</h3>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入文章简介"
          v-model="introduction">
        </el-input>
        <h3 align="left">文章内容</h3>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options = "editorOption"
                   >
        </quill-editor>

        <el-button class="elbuttoncss" type="primary" v-on:click="saveArticle" >发布文章</el-button>
        <el-button class="elbuttoncss" type="primary">保存草稿</el-button>
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
        editorOption:{}
      }
    },

    components: {
      MyHeader,
      MyFooter,
      quillEditor
    },
    methods: {

      saveArticle: function () {
        console.log(this.title)
        console.log(this.introduction)
        console.log(this.content)
        var parm = {
          title: this.title,
          introduction: this.introduction,
          content: this.content
        };


        var qs = require('qs');
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/article/addArticle',
          data:qs.stringify({
            'title': this.title,
            'introduction': this.introduction,
            'content': this.content
          }, { indices: false }),
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        })

      },
      getUserInfo: function (event) {
        this.$axios.get('http://localhost:3000/users/queryUser?uid=1').then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .quilleditorcss{
    background-color: #fff;
    border-radius: 20px;
    width: 1000px;
    height: auto;
    margin: auto;
    top: auto;
    left: auto;
  }

  .elbuttoncss {
    margin-top: 10px;
    float:left
  }

</style>
