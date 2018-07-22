import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 定义状态
  state: {
    loginshow: false,
    loginstate:0,
    registerstate:0,
    nickname:''
  },
  mutations:{
    isloginshow (state,msg){
      state.loginshow = msg
    },
    islogin (state,msg){
      state.loginstate = msg
    },
    isregister (state,msg){
      state.registerstate = msg
    },
    setNickname (state,msg){
      state.nickname = msg
    }
  }
});

export default store
