import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    device:{},
    isRunning: false,
    consoleMsg: [],
    style: {
      sidebarMini: false,
      sidebarDrawer: true,
      dark: 'true'
    }
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
    },
    setStyleMini(state) {
      state.style.sidebarMini = !state.style.sidebarMini
    },
    setStyleDrawer(state) {
      state.style.sidebarDrawer = !state.style.sidebarDrawer
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
    },
    SET_STYLE_MINI({commit}) {
      commit('setStyleMini')
    },
    SET_STYLE_DRAWER({commit}) {
      commit('setStyleDrawer')
    }
  },
  getters: {
    GET_IS_RUNNING: (state) => {
      return state.isRunning;
    },
    GET_CONSOLE_MSG: (state) => {
      return state.consoleMsg;
    },
    GET_STYLE: (state) => {
      return state.style;
    },
  }
})
