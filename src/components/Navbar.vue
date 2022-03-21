<template>
    <header class="header p-d-flex p-ai-center p-jc-center">台灣本島免運費</header>
    <section class="section p-d-flex p-ai-center p-jc-center">
        <div class="work-brench2">
            <i class="pi pi-map-marker p-mr-5" style="fontSize: 1.6rem"></i>
            <i class="pi pi-heart" style="fontSize: 1.6rem"></i>
        </div>
        <i @click="goIndex()" class="pi pi-apple p-ml-lg-2" style="fontSize: 2.5rem;cursor:pointer;"></i>
        <div class="work-brench p-d-flex p-ai-center">
            <form @submit.prevent="innerSearch($event)" class="search-bar p-mr-5">  
                <input v-model="searchBar" ref="myinput" @blur="blurFocus" :class="{ show: isExtend }" class="s-input" type="search" placeholder="Search" aria-label="Search">
                <i class="pi pi-search" @click="showInput" style="fontSize: 1.5rem; cursor:pointer;" type="button"></i>          
            </form>
            <div class="cart-place p-mr-5" @click.prevent="openModal()" @mouseover="isHoverCart = true" @mouseleave="isHoverCart=false" v-bind:class="{ move: isHoverCart }">
                <div id="cartNumber" type="button" style="cursor:pointer;">{{changeCartNum}}</div>
                <i class="pi pi-shopping-cart" style="fontSize: 1.6rem;cursor:pointer" type="button"></i>  
            </div>
            <i v-if="isLogin" @click="toUserInfo" class="pi pi-user" style="fontSize: 1.6rem; cursor:pointer;" type="button" aria-current="page"></i>     
        </div>
        <button @click="toggleBar()" class="nav-toggler" style="cursor:pointer;">
            <div class="line"></div>
        </button>
    </section>
    <nav :class="{ active: isActive }" class="nav-top p-d-flex p-ai-center p-jc-center">  
        <div class="p-mr-3 close-btn">
            <Button @click="closeLeftMenu" icon="pi pi-times" class="p-button-rounded p-button-plain p-button-text" />  
        </div>            
        <ul class="nav-ul p-d-flex p-ai-center p-jc-center p-pl-0" @mouseleave="showMask = false,hoverNav = false">
            <li class="itemList" v-for="(item,idx) in navList" :key="item" @mouseleave="navObj.title =''" @mouseenter="showUpMask($event)" :id="`${idx}`"> 
                <Itembar class="itemBar" @closeItem="closeBarDrawer" :class="{ show: barDrawer }" :navObj="navObj"/>    
                <a @click.prevent="toItemBar" style="cursor:pointer;" class="navTitle" :class="{color:chooseNav!==idx&&hoverNav}">{{item.title}}</a> 
            </li>
        </ul>
    </nav>
    <transition name="mask">
        <div class="DivOverlapMask" @mouseenter="showMask=false" v-if="showMask"></div> 
    </transition>
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
import { ref,computed,onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { navBarList } from "@/js/navList.js";
export default {  
    name: 'Navbar',
    emits: ["searchColor"], 
    components: {
        Modal,
        Itembar,
    },
    setup(props, { emit }){
        const showMask = ref(false);
        const hoverNav = ref(false)
        const chooseNav = ref(Number);
        const textColor = ref(false);
        const myinput = ref(null);
        const router = useRouter();
        const route = useRoute();
        const isClickCart = ref(false);
        const searchBar = ref("");
        const isActive = ref(false);
        const isExtend = ref(false);
        const barDrawer = ref(false);
        const isHoverCart = ref(false);
        const isLogin = ref(true);
        const navObj = reactive({
            title:'',
            content:[]
        })
        const navList = ref(navBarList)
        const loginState = computed(()=>{
            return store.getters.loginState;
        })
        const changeCartNum = computed(()=>{
            // 監聽購物車商品數量
            return store.getters.changeCartNum;
        })
        
        onMounted(()=>{
            console.log('navList~~',navList.value)
            // 取得購物車商品數量
            store.dispatch("DataGetCart");
            // const itemListStr = localStorage.getItem("cart");
            // const defaultList = JSON.parse(itemListStr);
            // store.state.itemList = defaultList || []; 
        })

        function closeLeftMenu(){
            isActive.value=false
        }

        function showUpMask(event){
            let idx = event.currentTarget.id
            navObj.title = navList.value[idx].title
            navObj.content = navList.value[idx].content
            hoverNav.value = true
            chooseNav.value = parseInt(event.currentTarget.id)
            let delay = setTimeout(() => {
                showMask.value=true
            }, 400)
            document.getElementById(`${idx}`).onmouseleave = function() {
                clearTimeout(delay);
            }
        }

        function openModal () {
            isClickCart.value = true
        }
        function closeModal(){
            isClickCart.value = false
        }
        function goIndex(){
            router.push({
                path: `/`,
            }) 
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
            emit("searchColor");
            isExtend.value = true
            myinput.value.focus()
        }
        
        function blurFocus(){
            emit("searchColor");
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
            barDrawer.value=true
        }

        function closeBarDrawer(){
            barDrawer.value=false
        }
        return {
            chooseNav,
            myinput,
            textColor,
            navObj,
            navList,
            hoverNav,
            showUpMask,
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
            barDrawer,
            isLogin,
            showInput,
            blurFocus,
            toUserInfo,
            closeLeftMenu,
            toItemBar,
            closeBarDrawer,
            showMask,
            goIndex
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
    transition: .3s ease;
}

.nav-top {
    background:  white;
    z-index: 2;
    height:55px; 
    border-bottom: 1px solid rgb(243, 243, 243) ;
    position: fixed;
    width: 100%;
    margin-top: 120px;
    transition: .3s ease;
}

.close-btn{
    display: none;
}

#modal{
    z-index: 5000000000;  
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
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 150px;
    margin: 0 30px;
    font-weight:bolder;
    text-decoration: none;
    transition: .1s ease-in;
    font-size: 18px;
}

.nav-ul a.color{
    color:rgb(173, 173, 173);
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
.itemList:hover .itemBar{
    visibility: visible;
    opacity: 1;
    transition-delay: .4s;
}

.itemBar{
    transition: all .1s ease;
    opacity: 0;
    visibility: hidden;
    position: fixed;
    margin-top: 55px;
    left: 50%;
    transform: translateX(-50%);
}

.DivOverlapMask {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: rgba(32, 32, 32, 0.7);
}

.mask-enter-active,.mask-leave-active {
    transition: opacity .2s;
}

.mask-enter-from, .mask-leave-to {
    opacity: 0;
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
        left: 250px;
        top: -350px;
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

    .itemBar{
        position: fixed;
        visibility: visible;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 900px;
        transition: all .3s ease;
        opacity: 1;
        background:rgb(255, 255, 255);
        margin-top:0;
        transform: translateX(0%);
        transition-delay: 0s;
    }

    .itemList:hover .itemBar{
        transition-delay: 0s;
    }

    .itemBar.show{
        left: 0;
    }
}


</style>