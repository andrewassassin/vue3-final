<template>
    <header class="header p-d-flex p-ai-center p-jc-center">台灣本島免運費</header>
    <NavSec @searchColor="searchColor"/>
    <nav :class="{ active: isActive }"  v-click-outside="onClickOutside" class="nav-top p-d-flex p-ai-center p-jc-center">  
        <div class="p-mr-3 close-btn">
            <Button @click="closeLeftMenu" icon="pi pi-times" class="p-button-rounded p-button-plain p-button-text" />  
        </div>
        <ul class="nav-ul p-d-flex p-ai-center p-jc-center p-pl-0" @mouseleave="showMask = false,hoverNav = false">
            <li class="itemList" v-for="(item,idx) in navList" :key="item" @mouseleave="leaveLi" @mouseenter="showUpMask($event)" :id="`${idx}`"> 
                <Itembar class="itemBar" @closeItem="closeBarDrawer" :class="{ show: barDrawer }" :navObj="navObj"/>    
                <a @click.prevent="toItemBar(idx)" style="cursor:pointer;" class="navTitle"
                :class="{color:chooseNav!==idx&&hoverNav}">{{item.title}}</a> 
            </li>
        </ul>
    </nav>
    <button @click="toggleBar()" class="nav-toggler" style="cursor:pointer;">
        <div class="line"></div>
    </button>
    <transition name="mask">
        <div class="DivOverlapMask" v-show="showMask"></div> 
    </transition>
</template>
<script>
import store from "@/store";
import NavSec from '@/components/NavSec'
import Itembar from '@/components/Itembar'
import { ref,onMounted, reactive} from "vue";
import { navBarList } from "@/js/navList.js";
export default {  
    emits: ["searchColor"], 
    components: {
        Itembar,
        NavSec
    },
    setup(props, { emit }){
        const isActive = ref(false)
        const showMask = ref(false);
        const hoverNav = ref(false)
        const chooseNav = ref(Number);
        const textColor = ref(false);
        const barDrawer = ref(false);
        const navObj = reactive({
            title:'',
            content:[]
        })
        const navList = ref(navBarList)
        const mm = window.matchMedia("(max-width: 900px)");
        mm.addListener(resizeWidth);
        resizeWidth(mm);

        function resizeWidth(pMatchMedia){
            if (pMatchMedia.matches) {
                //小於768時執行的js
                return 'no'
            }else {
                //大於768時執行的jsS
            }
        }
        
        onMounted(()=>{
            // console.log('navList~~',navList.value)
            console.log('hi andrew')
            // 取得購物車商品數量
            store.dispatch("DataGetCart");
            // const itemListStr = localStorage.getItem("cart");
            // const defaultList = JSON.parse(itemListStr);
            // store.state.itemList = defaultList || []; 
        })

        function searchColor(){
            emit("searchColor");
        }

        function closeLeftMenu(){
            isActive.value=false
        }

        function onClickOutside(){
            isActive.value=false
        }

        function showUpMask(event){
            let checkPc = resizeWidth(mm);
            if(checkPc==='no')  return
            console.log('進入pc')
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

        function toggleBar(){
            console.log('按住')
            isActive.value = true
        }
  
        function toItemBar(idx){
            console.log('idx',idx)
            barDrawer.value=true
            navObj.title = navList.value[idx].title
            navObj.content = navList.value[idx].content
        }

        function closeBarDrawer(){
            barDrawer.value=false
        }

        function leaveLi(){
            let checkPc = resizeWidth(mm);
            if(checkPc==='no')return
            navObj.title=''
        }
        return {
            chooseNav,
            textColor,
            navObj,
            navList,
            hoverNav,
            showUpMask,
            toItemBar,
            closeBarDrawer,
            showMask,
            barDrawer,
            onClickOutside,
            isActive,
            closeLeftMenu,
            searchColor,
            toggleBar,
            leaveLi
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

.nav-ul {
    list-style-type:none;
}

.nav-ul .navTitle{
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

.navTitle.color{
    color:rgb(173, 173, 173);
}

.nav-toggler {
    display: none;
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
    transform: translateY(175px);
    height: 100vh;
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
        left: 70%;
        top: -40%;
    }

    .nav-toggler{
        display: block;
        position: fixed;
        top: 50px;
        left: 10px;
        border: none;
        width: 60px;
        height: 60px;
        background: transparent;
        /* z-index: 49; */
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
    }

    .itemList:hover .itemBar{
        transition-delay: 0s;
    }

    .itemBar.show{
        left: 0;
    }
}
</style>