<template>
    <div class="footercss">
      <div class="footercss-text" >
        Copyright ©
        <a  class="footercss-a" target="_blank" href="http://www.manhuang.club/">蛮荒社区 </a>
        <a class="footercss-a" target="_blank" href="http://www.miitbeian.gov.cn/">浙ICP备18026896号-1</a>
      </div>
    </div>
</template>

<script>
  export default {
   name: 'my-footer'
  }
</script>

<style scoped>
  .footercss {
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #2d3237;
  }

  .footercss-text {
    color: #c0ccda;
  }

  .footercss-a {
    color: #c0ccda;
    text-decoration : none
  }
</style>
