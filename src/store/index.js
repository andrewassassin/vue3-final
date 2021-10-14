import { createStore } from 'vuex'

export default createStore({
  state: {
    itemList:[],
    isLogin:'',
    userId:"",
    token:"",
  },
  mutations: {
    itemList(state,item) {
      state.itemList.push(item)
    },
    login(state,data) {
      state.token = data;
    },
    user(state,data) {
      state.userId = data
    }
  },
})
