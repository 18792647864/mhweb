<template>
  <div>

    <div class="readcantain">


        <my-header></my-header>

        <el-steps :active="active" align-center style="width: 100%">
          <el-step title="申请" description="填写申请成立社区基本资料"></el-step>
          <el-step title="审核" description="社区成立必须由管理员审核"></el-step>
          <el-step title="结果" description="管理员审核结果展示"></el-step>
        </el-steps>

      <div class="segmentationcss" > </div>


      <div v-if="active == 0">
          <el-form ref="communityInfo" :model="communityInfo" label-width="100px" style="margin-left: 10%" class="demo-dynamic">
            <el-form-item label="社区名称" style="width: 50%">
              <el-input v-model="communityInfo.name" placeholder="名称1-12个字，请遵守社区命名规则"></el-input>
            </el-form-item>

            <el-form-item label="社区描述" style="width: 50%" >
              <el-input type="textarea" v-model="communityInfo.desc" placeholder="我们是谁？我们要聚集一群什么样的人？我们有着什么样的专业和爱好？"></el-input>
            </el-form-item>

            <el-form-item
              v-for="(column, index) in communityInfo.columns"
              :label="'栏  目' + (index+1)"
              :key="column.key"
              :prop="'columns.' + index + '.value'"
              :rules="{
                required: true, message: '栏目名称不能为空', trigger: 'blur'
                }"
              style="width: 50%" >
              <el-input v-model="column.value" style="width: 78%;float: left"></el-input>
              <el-button @click.prevent="removeColumn(column)">删除</el-button>
            </el-form-item>

            <el-form-item style="width: 50%">
              <el-button type="primary" @click="onCreateCommunity">立即创建</el-button>
              <el-button @click="addColumn">新增栏目</el-button>
              <el-button>取消</el-button>
            </el-form-item>

          </el-form>

      </div>

      <div v-if="active == 1">
          <img  class="commit-ok-css" src="@/assets/images/commit_ok.png"/>
          信息提交成功，管理员正在审核，请等待......
      </div>


      <div v-if="active == 2">


          <div v-if="isPass == 0" style="margin-top: 10%">
            您申请的社区 xxxx 已经通过审核，恭喜您成为社区管理员

          </div>

          <div v-if="isPass == 1" style="margin-top: 10%">
            您申请的社区 xxxx 未通过审核，恭喜您成为社区管理员


          </div>

          <div>
            <br>
            理由：{{approval_comments}}
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
    export default {
        name: "createcommunity",
        data() {
          return {
            approval_comments:'',
            isPass: 0,
            active: 0,
            communityInfo: {
              name: '',
              desc: '',
              columns: []
            }
          };
        },
        components: {
          MyHeader,
          MyFooter
        },
        methods: {
          addColumn() {
            this.communityInfo.columns.push({
              value: '',
              key: Date.now()
            });
          },
          removeColumn(item) {
            var index = this.communityInfo.columns.indexOf(item);
            if (index !== -1) {
              this.communityInfo.columns.splice(index, 1)
            }
          },
          queryCreateCommunity() {
            var url = this.HOST + '/users/queryCreateCommunity?uId='+sessionStorage.uId;
            this.$axios({
              method: 'get',
              url: url,
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              }
            }).then(res => {
              console.log(' queryCreateCommunity  then');
              console.log(res);
              if(res.data.length>0)
              {
                if(res.data[0].status == 1)
                {
                  this.active = 1;
                }
                else if(res.data[0].status == 2)
                {
                  this.active = 2;
                  this.isPass = 0;
                  this.approval_comments = res.data[0].approval_comments;
                }
                else
                {
                  this.active = 2;
                  this.isPass = 1;
                  this.approval_comments = res.data[0].approval_comments;
                }

              }
              else
              {
                this.active = 0;
              }

            }).catch(res=>{
              console.log(' queryCreateCommunity  catch');
              console.log(res);
            });

          },
          onCreateCommunity() {
            var parm = this.communityInfo;
            parm.uId = sessionStorage.uId;

            //申请创建社区
            var qs = require('qs');
            var url = this.HOST + '/users/onCreateCommunity';
            this.$axios({
              method: 'post',
              url: url,
              data:qs.stringify(parm, { indices: false }),
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              }
            }).then(res => {
              console.log(' onCreateCommunity  then');
              console.log(res);
              if(res.data.insertId > 0) {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                });
                this.active = 1;
              }
            }).catch(res=>{
              console.log(' onCreateCommunity  catch');
              console.log(res);
            });
          },

          handleCurrentChange(val) {
            console.log('handleCurrentChange');
            this.currentRow = val;
            console.log(val);
          }
        },
        mounted:function () {
          this.queryCreateCommunity();
        }
    }
</script>

<style scoped>

  .readcantain{
    background-color: #fff;
    width: 50%;
    margin-left: 24%;
    border: #2d3237;
    margin-top: 70px;
  }

  .segmentationcss{
    width:100%;
    height:1px;
    padding:0px;
    background-color:#D5D5D5;
    overflow:hidden;
    margin-top: 3%;
    margin-bottom: 3%;
  }

  .commit-ok-css{

  }

</style>
