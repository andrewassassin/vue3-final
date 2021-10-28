import { createStore } from 'vuex'

import axios from 'axios'
export default createStore({
  
  state: {
    itemList:[],
    isLogin:'',
    user:{
    },
    token:"",
    itemToData:[]
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
    },
    itemToData(state){
      state.itemList.forEach(item=>{
        const product ={
          id: item.id,
          amount: item.amount,
          uid: item.uid
        }

        state.itemToData.push(product)
        // console.log('action product',state.itemToData)
      })
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
      // context.commit('itemToData')
      console.log('context',context)
      const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }  
      axios.post("https://x-home.pcpogo.com/homex/create.php?RDEBUG=andrewc",JSON.stringify(this.state.itemList),config)
        .then(res => {
              console.log(res)
            })
        .catch(error => {
          console.log('err',error);
        });
    }
  }
})
