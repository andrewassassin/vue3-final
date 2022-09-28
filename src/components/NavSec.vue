<template>
    <section class="section p-d-flex p-ai-center p-jc-center">
        <div class="work-brench2">
            <i class="pi pi-map-marker i-custom p-mr-5"></i>
            <i class="pi pi-heart i-custom"></i>
        </div>
        <i @click="goIndex()" class="pi pi-slack p-ml-lg-2" style="fontSize: 2.5rem;cursor:pointer;"></i>
        <div class="work-brench p-d-flex p-ai-center">
            <form class="search-bar p-mr-5">  
                <input v-model="searchBar" @input="debouncedFunc" ref="myinput" @blur="blurFocus" :class="{ show: isExtend }" class="s-input" type="search" placeholder="Search" aria-label="Search">
                <i class="pi pi-search i-custom" @click="showInput" type="button"></i>          
            </form>
            <div class="cart-place p-mr-5" @click.prevent="openModal()" @mouseover="isHoverCart = true" @mouseleave="isHoverCart=false" v-bind:class="{ move: isHoverCart }">
                <div id="cartNumber" type="button" style="cursor:pointer;">{{changeCartNum}}</div>
                <i class="pi pi-shopping-cart i-custom" type="button"></i>  
            </div>
            <i v-if="isLogin" @click="toUserInfo" class="pi pi-user i-custom" type="button" aria-current="page"></i>     
        </div>
    </section>
    <transition>
        <Modal v-if="isClickCart" @closeBtn="closeModal" />
    </transition>
</template>
<script>
import { ref,computed,onMounted,defineAsyncComponent} from "vue";
import store from "@/store";
import Search from '@/views/Search'
import UserInfo from '@/views/UserInfo'
import Login from '@/views/Login'
import { useRouter,useRoute } from "vue-router";
export default {
    emits: ["searchColor"], 
    components: {
        Modal: defineAsyncComponent(() => import("@/components/Modal.vue")),
    },
    setup(props, { emit }){
        const router = useRouter();
        const route = useRoute();
        const isHoverCart = ref(false);
        const isLogin = ref(true);
        const myinput = ref(null);
        const isClickCart = ref(false);
        const searchBar = ref("");
        const isExtend = ref(false);
        const loginState = computed(()=>{
            return store.getters.loginState;
        })
        const changeCartNum = computed(()=>{
            // 監聽購物車商品數量
            return store.getters.changeCartNum;
        })
        const DELAYED_TIME = 300;
        const debounce = (func, delay = 300) => {
            let timeout = null;
            
            return (...args) => {
                const later = () => {
                    timeout = null;
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, delay);
            };
        };
        const debouncedFunc = debounce(displayDebouncedResult, DELAYED_TIME);
        
   
        onMounted(()=>{
            // 取得購物車商品數量
            store.dispatch("DataGetCart");
            // const itemListStr = localStorage.getItem("cart");
            // const defaultList = JSON.parse(itemListStr);
            // store.state.itemList = defaultList || []; 
        })
        function openModal () {
            document.body.style.overflow = 'hidden'
            isClickCart.value = true
        }
        function closeModal(){
            document.body.style.overflow = 'auto'
            isClickCart.value = false
        }
        function goIndex(){
            router.push({
                path: `/`,
            }) 
        }
        function displayDebouncedResult(){
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
        function showInput(){
            emit("searchColor");
            isExtend.value = true
            myinput.value.focus()
        }   
        function blurFocus(){
            emit("searchColor");
            isExtend.value = false
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
        return {
            goIndex,
            openModal,
            closeModal,
            showInput,
            blurFocus,
            toUserInfo,
            debouncedFunc,
            changeCartNum,
            isHoverCart,
            isLogin,
            isClickCart,
            searchBar,
            isExtend,
            myinput,
        }
    }
}
</script>
<style scoped>
.section{
    width: 100%;
    height: 75px;
    background: white;
    position: fixed;
    margin-top: 45px;
    transition: .3s ease;
}

.v-enter-active,.v-leave-active {
    transition: opacity .4s;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
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

.i-custom{
    font-size: 1.6rem;
    cursor: pointer;
}

@media (max-width: 900px){
    .pi-slack{
        display: none;
    }
    .work-brench2{
        display: none;
    }
    .section{
        border-bottom: 1px solid rgb(243, 243, 243) ;
    }
    .work-brench{
        right: 10%;
    }
}
</style>