<template>

  <div>



    <div class="context">
      <my-header></my-header>

      <div class="registerzonecss">


        <div class="userregister">
          用户注册
        </div>

        <div>
          <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="昵  称" prop="nickname" required style="width: 60%" >
              <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="性  别" prop="gender" required style="width: 60%" >
              <el-select v-model="ruleForm.gender" placeholder="请选择性别" style="width: 100%" >
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
                <el-option label="不详" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设置密码" prop="password" required style="width: 60%" >
              <el-input v-model="ruleForm.password" type="password" ></el-input>
            </el-form-item>


            <div class="order">
              <span class="line"></span>
              <span class="txt">你还可以完善信息哦</span>
              <span class="line"></span>
            </div>


            <el-form-item label="出生日期" >
              <el-col :span="11">
                <el-form-item prop="birthday">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="ruleForm.phonenumber"></el-input>
            </el-form-item>

            <el-form-item label="邮箱地址" prop="mailbox">
              <el-input v-model="ruleForm.mailbox"></el-input>
            </el-form-item>

            <el-form-item label="你的公司" prop="company">
              <el-input v-model="ruleForm.company"></el-input>
            </el-form-item>

            <el-form-item label="职  业" prop="career">
              <el-input v-model="ruleForm.career"></el-input>
            </el-form-item>

            <el-form-item label="描述一下自己" prop="desc">
              <el-input type="textarea" v-model="ruleForm.personalprofile"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>


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

      name: "register",
      data() {
        return {
          ruleForm:{
            nickname:'',
            gender:'',
            password:'',
            birthday:'',
            phonenumber:'',
            mailbox:'',
            company:'',
            career:'',
            personalprofile:''
          }

        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {

              var qs = require('qs');
              var url = this.HOST + '/users/register';
              this.$axios({
                method: 'post',
                url: url,
                data:qs.stringify(this.ruleForm, { indices: false }),
                headers:{
                  'Content-Type':'application/x-www-form-urlencoded'
                }
              }).then(res => {
                console.log(res);
                if(res.data.insertId > 0)
                {
                  this.$message({
                    type: 'success',
                    message: '注册成功!'
                  });
                  this.$router.push({path: '/'})
                }
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      components: {
        MyHeader,
        MyFooter
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

  .registerzonecss{
    width: 60%;
  }

  .userregister{
    font-size: xx-large;
    text-align: left;
    margin-left: 8%;
    margin-bottom: 5%;
    margin-top: 20%;
  }

  .order {
    height: 60px;
    line-height: 60px;
    text-align: right;
  }
  .order .line {
    display: inline-block;
    width: 210px;
    border-top: 1px solid #ccc ;
  }
  .order .txt {
    color: #ff4d51;
    vertical-align: super;
  }



</style>
