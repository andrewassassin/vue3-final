import { createStore } from 'vuex'

import axios from 'axios'
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
  },
  actions: {
    productToData(context){
      const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
      }

      const userInfo = JSON.parse(localStorage.getItem('user'));
      context.commit('user',userInfo) 
      
      const cartItem = {
        uid:this.state.user.id,
        itemList: this.state.itemList
      }
      console.log('cartItem',cartItem)
      axios.post("http://localhost/Amitproject/create.php#/", cartItem ,config)
        .then(res => {
              console.log(res)
            })
        .catch(error => {
          console.log('err',error);
        });
    }
  }
})
