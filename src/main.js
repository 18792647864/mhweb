// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/* 编辑框引入 */
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Vuex);


/* axios 发送请求引入 */
import axios from 'axios'
// axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
Vue.prototype.HOST = 'http://localhost:3000';


Vue.use(VueQuillEditor);

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
