import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    chatState: {
      account: null,
      nickName: null
    },
    groupState: null   //  点击进群的时候更新
  },
  mutations: {
    updateChatState (state, obj) {
      state.chatState = obj
    },
    updateGroupState (state, obj) {
      state.groupState = obj
    }
  },
  actions: {
    // changeSideBarState (context, status) {
    //   context.commit('changeSideBarState', status)
    // }
    // es6解构写法
    updateChatState ({commit}, obj) {
      commit('updateChatState', obj)
    },
    updateGroupState ({commit}, obj) {
      commit('updateGroupState', obj)
    }
  },
  getters: {
    getChatState (state) {
      return state.chatState
    },
    getGroupState (state) {
      return state.groupState
    }
  }
})
