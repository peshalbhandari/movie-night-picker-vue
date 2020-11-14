import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import VuexPersist from 'vuex-persist'


const vuexLocal=new VuexPersist({
storage:window.localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  },
  plugins:[vuexLocal.plugin]
})
