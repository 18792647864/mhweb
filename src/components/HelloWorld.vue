<template>
  <div class="hello">
    <my-header> </my-header>

    <home-page></home-page>

    <!--<ul>-->
      <!--<li>-->
        <!--<a href="https://github.com/vuejs/awesome-vue" target="_blank" > awesome-vue </a>-->
      <!--</li>-->
    <!--</ul>-->

    <my-footer> </my-footer>
  </div>
</template>

<script>

import MyHeader from './common/myHeader'
import MyFooter from './common/myFooter'
import HomePage from './pages/homePage'

export default {

  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    MyHeader,
    MyFooter,
    HomePage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
