import { createStore } from 'vuex'

import axios from 'axios'
export default createStore({

    state: {
        itemList: [],
        isLogin: '',
        user: {

        },
        src:'header1.jpg',
        navInVisible:false,
        showHeader:true,
        orderList:[],
        headerIdx:1
    },

    mutations: {
        itemList(state, item) {
            state.itemList.push(item)
        },
        user(state, payload) {
            state.user = payload
        },
        changeIList(state, payload) {
            state.itemList = payload
        },
        changeHeaderImg(state, payload){
            state.src = payload
        }
    },
    getters: {
        loginState: state => {
            return state.user
        },
        changeCartNum: state => {
            return state.itemList.length
        }
    },
    actions: {
        productToData(context) {
            const userInfo = localStorage.getItem('user')

            if (userInfo) {
                context.commit('user', JSON.parse(userInfo))
            }

            const cartItem = {
                uid: this.state.user.id,
                itemList: this.state.itemList
            }
            const options = {
                method: 'get',
                url: `http://localhost/Amitproject/create.php#/`,
                params: {
                    cmd: 'saveUserCart',
                    data: cartItem
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
            axios(options)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log('err', error);
                });
        },
        async DataGetCart(context) {
            let uid;
            if (localStorage["user"]) {
                const userInfo = localStorage.getItem('user')
                context.commit('user', JSON.parse(userInfo))
                console.log('this.state.user',this.state.user)
                uid = this.state.user.id
            } else {
                context.commit('user', {})
                uid = []
            }
            const options = {
                method: 'get',
                url: `http://localhost/Amitproject/create.php#/`,
                params: {
                    cmd: 'findUserCart',
                    data: uid
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
            await axios(options)
                .then(res => {
                    context.commit('changeIList', res.data)
                    // console.log('res.data store',res.data)
                })
                .catch(error => {
                    console.log('err', error);
                });
        },
        createOrder(){
            
        }
    }
})