import { createStore } from 'vuex'

import axios from 'axios'
export default createStore({
  
  state: {
    itemList:[],
    isLogin:'',
    user:{
    },
  },
  
  mutations: {
    itemList(state,item) {
      state.itemList.push(item)
    },
    user(state,payload) {
      state.user = payload
    },
    changeIList(state,payload){
      state.itemList = payload
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
      axios.post("https://x-home.pcpogo.com/homex/create.php?RDEBUG=andrewc", cartItem ,config)
        .then(res => {
              console.log(res)
            })
        .catch(error => {
          console.log('err',error);
        });
    },
    DataGetCart(context){
      
      const userInfo = JSON.parse(localStorage.getItem('user'));
      context.commit('user',userInfo) 
      const uid = this.state.user.id
      axios.post("https://x-home.pcpogo.com/homex/create.php?RDEBUG=andrewc", uid )
        .then(res => {
              console.log('cart item',res.data)
              context.commit('changeIList',res.data)
            })
        .catch(error => {
          console.log('err',error);
        });
    }
  }
})
