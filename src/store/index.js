import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    device:{},
    isRunning: false,
  },
  mutations: {
    setStore(state,device){
      state.device = device
    },
    setIsRunning(state,payload) {
      state.isRunning = payload
    }
  },
  actions: {
    READ_ESTORE({commit}){
      window.ipc.send("GET_DEVICE");
      window.ipc.on("GET_DEVICE", (device) => {
        commit('setStore',device)
      });
    },
    SET_IS_RUNNING({commit}, payload){
      commit('setIsRunning', payload)
    }
  },
  getters: {
    GET_IS_RUNNING: (state) => {
      return state.isRunning;
    }
  }
})
