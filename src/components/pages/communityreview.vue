<template>


  <div>

    <div class="readcantain">

      <my-header></my-header>
      <div >

        <el-table
          ref="tableData"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="name"
            label="社区名称"
            width="200">
          </el-table-column>
          <el-table-column
            property="introduction"
            label="简介"
            width="200">
          </el-table-column>

        </el-table>


      </div>

      <div class="segmentationcss" > </div>

      <div style="margin-top: 10px;margin-left: 0px;">

        <el-form ref="communityInfo" :model="communityInfo" label-width="100px" class="demo-dynamic">
          <el-form-item label="社区名称" style="width: 50%">
            <el-input v-model="communityInfo.name" disabled></el-input>
          </el-form-item>

          <el-form-item label="社区描述" style="width: 50%" >
            <el-input type="textarea" v-model="communityInfo.desc" disabled></el-input>
          </el-form-item>

          <el-form-item
            v-for="(column, index) in communityInfo.columns"
            :label="'栏  目' + (index+1)"
            :key="column.category_id"
            :prop="'columns.' + index + '.name'"
            style="width: 50%" >
            <el-input v-model="column.name" style="width: 78%;float: left" disabled></el-input>
          </el-form-item>

          <el-form-item label="审核意见" style="width: 50%" >
            <el-input type="textarea" v-model="communityInfo.reviewopinion"></el-input>
          </el-form-item>

          <el-form-item style="width: 50%">
            <el-button type="primary" @click="onSubmit(2)">立即通过</el-button>
            <el-button type="primary" @click="onSubmit(3)">退回申请</el-button>
          </el-form-item>

        </el-form>

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
        name: "communityreview",
        data() {
          return {
            communityInfo: {
              community_id:'',
              name: '',
              desc: '',
              reviewopinion:'',
              columns: []
            },
            tableData: null,
            currentRow: null
          };
        },
        components: {
          MyHeader,
          MyFooter
        },
        methods: {
          onSubmit:function (status) {
            var url = this.HOST + '/users/updateCommunity';

            var parm ={
              community_id:this.communityInfo.community_id,
              status:status,
              approver_uid:sessionStorage.uId,
              approval_comments:this.communityInfo.reviewopinion
            };
            //申请创建社区
            var qs = require('qs');

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
              if(res.data.changedRows = 1) {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                });

                var index = null;

                for (var i = 0;i<this.tableData.length;i++)
                {
                  if(this.tableData[i].community_id == this.communityInfo.community_id)
                  {
                    index = i;
                    break;
                  }
                }

                //需要移除这条数据
                this.tableData.splice(index,1);
                if(index<this.tableData.length)
                {
                  this.$refs.tableData.setCurrentRow(this.tableData[index]);
                }
                this.communityInfo.reviewopinion = '';


              }
            }).catch(res=>{
              console.log(' onCreateCommunity  catch');
              console.log(res);
            });
          },
          queryCommunity: function () {
            var url = this.HOST + '/users/queryCommunity?status=1';
            this.$axios.get(url).then(res => {
              console.log(res.data);
              this.tableData = res.data;
              console.log(res);
            })
          },
          handleCurrentChange(val) {
            console.log('handleCurrentChange');
            console.log(val);
            this.currentRow = val;
            this.communityInfo.community_id = val.community_id;
            this.communityInfo.name = val.name;
            this.communityInfo.desc = val.introduction;
            this.communityInfo.columns = val.columns;
            console.log(val);
          }
        },
        mounted:function () {
          this.queryCommunity();
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

</style>
