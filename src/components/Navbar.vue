<template>
        <header class="header p-d-flex p-ai-center p-jc-center">台灣本島免運費</header>
        <section class="section p-d-flex p-ai-center p-jc-center">
            <div class="work-brench2">
                <i class="pi pi-map-marker p-mr-5" style="fontSize: 1.6rem"></i>
                <i class="pi pi-heart" style="fontSize: 1.6rem"></i>
            </div>
            <i class="pi pi-apple p-ml-lg-2" style="fontSize: 2.5rem"></i>
            <div class="work-brench p-d-flex p-ai-center">
                <form @submit.prevent="innerSearch($event)" class="search-bar p-mr-5">  
                    <input v-model="searchBar" ref="myinput" @blur="blurFocus" :class="{ show: isExtend }" class="s-input" type="search" placeholder="Search" aria-label="Search">
                    <i class="pi pi-search" @click="showInput" style="fontSize: 1.5rem" type="button"></i>          
                </form>
                <div class="cart-place p-mr-5" @click.prevent="openModal()" @mouseover="isHoverCart = true" @mouseleave="isHoverCart=false" v-bind:class="{ move: isHoverCart }">
                    <div id="cartNumber" type="button">{{changeCartNum}}</div>
                    <i class="pi pi-shopping-cart" style="fontSize: 1.6rem;cursor:pointer" type="button"></i>  
                </div>
                <i v-if="isLogin" @click="toUserInfo" class="pi pi-user" style="fontSize: 1.6rem;cursor:pointer" type="button" aria-current="page"></i>     
            </div>
            <button @click="toggleBar()" class="nav-toggler" style="cursor:pointer;">
                <div class="line"></div>
            </button>
        </section>
        <nav :class="{ active: isActive }" class="nav-top p-d-flex p-ai-center p-jc-center">  
            <div @click.prevent="closeLeftMenu()" class="close-btn p-mr-3">
                <i style="fontSize: 1.3rem" class="p-mt-3 pi pi-times close"></i>      
            </div>            
            <ul class="nav-ul p-d-flex p-ai-center p-jc-center p-pl-0">
                <li class="">
                    <router-link to="/" style="text-decoration:none;">回到首頁</router-link>
                </li>
                <li class="">
                    <router-link @click="toItemBar" class="itemList" to="/product" style="text-decoration:none;">
                        商品詳情
                        <Itembar class="itemBar" :class="{ show: isShowItemBar }"/>
                    </router-link>
                </li>
                <li class="">
                    <router-link to="/create" style="text-decoration:none;">建立商品</router-link>
                </li>
                <li class=" ">
                    <router-link to="/productManage" style="text-decoration:none;">商品管理</router-link>
                </li>        
            </ul>
        </nav>
        <transition>
            <Modal v-if="isClickCart" @closeBtn="closeModal" />
        </transition>
</template>
<script>
import store from "@/store";
import Modal from '@/components/Modal'
import Itembar from '@/components/Itembar'
import Search from '@/views/Search'
import UserInfo from '@/views/UserInfo'
import Login from '@/views/Login'
import { ref,computed,onMounted  } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {  
    name: 'Navbar',
    components: {
        Modal,
        Itembar,
    },
    setup(){
        const myinput = ref(null);
        const router = useRouter();
        const route = useRoute();
        const isClickCart = ref(false);
        const searchBar = ref("");
        const isActive = ref(false);
        const isExtend = ref(false);
        const isShowItemBar = ref(false);
        const isHoverCart = ref(false);
        const isLogin = ref(true);
        const loginState = computed(()=>{
            return store.getters.loginState;
        })

        const changeCartNum = computed(()=>{
        // 監聽購物車商品數量
            return store.getters.changeCartNum;
        })

        onMounted(()=>{
            // 取得購物車商品數量
            console.log('nav mounted')
            store.dispatch("DataGetCart");
            // const itemListStr = localStorage.getItem("cart");
            // const defaultList = JSON.parse(itemListStr);
            // store.state.itemList = defaultList || []; 
        })

        function closeLeftMenu(){
            isActive.value=false
        }

        function openModal () {
            isClickCart.value = true
        }
        function closeModal(){
            isClickCart.value = false
        }

        function innerSearch(){
            let id = searchBar.value
            if(id&& route.path!==`/search/${id}` &&route.name!=='search'){
                router.push({
                    path: `/search/${id}`,
                    component: Search,
                })  
            }else if(id&&route.name=='search'){
                router.push({
                    path: `/search/${id}`,
                    component: Search,
                })  
            }
        }

        function toggleBar(){
            isActive.value = true;
        }


        function showInput(){
            isExtend.value = true
            myinput.value.focus()
        }
        
        function blurFocus(){
            isExtend.value =false
        }

        function toUserInfo(){
            if(Object.entries(loginState.value).length !==0){
                router.push({
                    path: `/userinfo`,
                    component: UserInfo,
                }) 
            }else{
                router.push({
                    path: `/login`,
                    component: Login,
                }) 
            }
        }

        function toItemBar(){
            isShowItemBar.value=true
        }

        return {
            myinput,
            isClickCart,
            searchBar,
            openModal,
            closeModal,
            changeCartNum,
            innerSearch, 
            isActive,
            isExtend,
            toggleBar,
            isHoverCart,
            isShowItemBar,
            isLogin,
            showInput,
            blurFocus,
            toUserInfo,
            closeLeftMenu,
            toItemBar
        }
    },
}

</script>

<style scoped>
.header{
    width: 100%;
    height: 45px;
    background: black;
    color: white;
    position: fixed;
    z-index: 50;
}

.section{
    width: 100%;
    height: 75px;
    background: white;
    position: fixed;
    margin-top: 45px;
    z-index: 50;
}

.nav-top {
    background:  white;
    z-index: 50;
    height:55px; 
    border-bottom: 1px solid rgb(243, 243, 243) ;
    position: fixed;
    width: 100%;
    margin-top: 120px;
}

.close-btn{
    display: none;
}

#modal{
    z-index: 500000000000;  
}

.v-enter-active,.v-leave-active {
    transition: opacity .4s;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}



.nav-ul {
    list-style-type:none;
}

.nav-ul a{
    color: rgb(82, 82, 82);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 200px;
    margin: 0 30px;
    font-weight:bolder ;

}

.nav-toggler {
    display: none;
}

.work-brench{
    position: fixed;
    right: 20%;
}

.work-brench2{
    position: fixed;
    left: 20%;
}

.search-bar{
    display: flex; 
    align-items: center; 
}

.s-input{
    position: relative;
    left: 30px;
    width: 0px;
    height: 38px;
    opacity: 0;
    border-radius: 6px;
    transition: .3s ease-in;
    border:none;
}

.pi-search{
    position: relative;
    z-index: 2;
    /* left: -40px; */
}


.s-input.show {
    width: 220px;
    transition: .2s ease-in;
    opacity: 1;
} 

input:focus{
    outline:none;
    background: rgb(233, 232, 232);
    transition: .5s auto;
}

input::-webkit-search-cancel-button{
    display: none;
}

.cart-place{
    position: relative;
    transition: .3s;
}

.cart-place.move{
     transform: scale(1.2);
}

#cartNumber {
    width: 28px;
    height: 28px;
    background-color: tomato;
    text-align: center;
    line-height: 30px;
    position: absolute;
    border-radius: 50%;
    top: -10px;
    left: 12px;
    color: white;
    transform: scale(.6);
}

.itemList{
    position: relative;
}

.itemBar{
    position: absolute;
}


.itemBar{
    visibility: hidden;
    transition: .2s ease;
    opacity: 0;
}

.itemList:hover .itemBar{
    visibility: visible;
    transition: .6s ease;
    opacity: 1;
}

@media (max-width: 900px){
    .pi-apple{
      display: none;
    }

    .work-brench2{
        display: none;
    }

    .section{
        border-bottom: 1px solid rgb(243, 243, 243) ;
    }

    .nav-top {
        position: fixed;
        top: 0px;
        margin-top: 0;
        left: -500px;
        width: 350px;
        height: 100vh;
        background: rgb(255, 255, 255);
        border-right: 8px solid rgb(161, 156, 156);
        border-radius: 20%;
        transition: all .4s ease-out;
        z-index: 50;
    }

    .nav-ul{
        margin-left: 85px;
        flex-wrap: wrap;
        /* position: relative; */
        width: 150px;
        top: 100px;
        left: 150px;
        padding: 0;
    }

   .nav-ul li{
        width: auto;
    }
    .nav-top.active {
        left: -150px;
    }

    .close-btn{
        display: block;
        position: relative;
        left: 230px;
        top: -400px;
    }

    .nav-toggler{
        position: fixed;
        left: 10px;
        border: none;
        display: block;
        width: 60px;
        height: 60px;
        background: transparent;
        z-index: 500;
    }

    .line {
        width: 30px;
        height:2.5px;
        background: rgb(0, 0, 0);
        position: relative;
    }


    .line:before,
    .line:after {
        content: "";
        width: 30px;
        height: 2.5px;
        background: rgb(0, 0, 0);
        display: block;
        position: absolute;
    }

    .line:before {
        top: -8px;
    }

    .line:after {
        bottom: -8px;
    }

    .work-brench{
        right: 10%;
    }

    .itemBar.show{
        visibility: visible;
        transition: .6s ease;
        opacity: 1;
    }
}

</style>