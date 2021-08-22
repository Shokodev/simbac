import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    device:{},
  },
  mutations: {
    setStore(state,device){
      state.device = device
    },
  },
  actions: {
    READ_ESTORE({commit}){
      window.ipc.send("GET_DEVICE");
      window.ipc.on("GET_DEVICE", (device) => {
        commit('setStore',device)
      });
    }
  },
})
