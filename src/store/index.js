import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    device:{},
    isRunning: false,
    consoleMsg: []
  },
  mutations: {
    setStore(state,device){
      state.device = device
    },
    setIsRunning(state,payload) {
      state.isRunning = payload
    },
    setConsoleMsg(state,payload){
      state.consoleMsg.push(payload);
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
    },
    CONSOLE_MSG({commit}, payload){
      commit('setConsoleMsg',payload)
    }
  },
  getters: {
    GET_IS_RUNNING: (state) => {
      return state.isRunning;
    },
    GET_CONSOLE_MSG: (state) => {
      return state.consoleMsg;
    },
    GET_DEVICE: (state) => {
      return state.device;
    },
  }
})
