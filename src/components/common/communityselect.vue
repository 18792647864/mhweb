<template>

  <div>

    <el-dialog
      :visible.sync="dialogVisible"

      :before-close="handleClose" class="communitycss">

      <div>
        <span>这是一段信息</span>
      </div>
      <div>
        <span>这是一段信息</span>
      </div>
      <div>
        <span>这是一段信息</span>
      </div>  <div>
      <span>这是一段信息</span>
    </div>
      <div>
        <span>这是一段信息</span>
      </div>
      <div>
        <span>这是一段信息</span>
      </div>  <div>
      <span>这是一段信息</span>
    </div>  <div>
      <span>这是一段信息</span>
    </div>  <div>
      <span>这是一段信息</span>
    </div>  <div>
      <span>这是一段信息</span>
    </div>








      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>

  </div>


</template>

<script>
    export default {
        name: "communityselect",
        data() {
          return {
            dialogVisible: false
          };
        },
        methods: {
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          }
        }
    }
</script>

<style scoped>
  .communitycss{
    width: 95%;
    margin-top: 0%;

  }

</style>
