import { createStore } from 'vuex'


export default createStore({
  
  state: {
    itemList:[],
    isLogin:'',
    user:{
    },
    token:"",
  },
  
  mutations: {
    itemList(state,item) {
      state.itemList.push(item)
    },
    login(state,payload) {
      state.token = payload;
    },
    user(state,payload) {
      state.user = payload
    }
  },
  getters: {
    doneTodos: state => {
      return state.user
    },
    changeCartNum: state => {
      return state.itemList.length
    }
  }
})
