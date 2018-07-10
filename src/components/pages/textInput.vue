<template>
  <div>

    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>

    <div style="margin: 20px 0;">

    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="textarea3">
    </el-input>

  </div>

</template>

<script>
    export default {
        name: "text-input",
        data() {
          return {
            textarea: '',
            textarea3: ''
         }
    }
    }
</script>

<style scoped>

</style>
