<template>
    <div id="app" >
        <nav class="nav-bar" :class="{hideUp:active,trans: transparentNav,search:changeColor }">
            <Navbar @searchColor="searchColor"/>
        </nav>
        <header class="header-bar">
            <Header :showHeader="showHeader"/>
        </header>
        <section class="content p-mb-3">
            <router-view @closeHeader="closeHeader" @showUpHeader="showUpHeader"/>
        </section>
        <footer>
            <Footer/>
        </footer>
    </div>
    <TopBtn/>
    <SpeedDial/>
</template>
<script>
import Navbar from '@/components/Navbar'
import TopBtn from '@/components/TopBtn'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SpeedDial from '@/components/SpeedDial.vue'
import {useRoute} from 'vue-router'
import { ref,watch} from "vue";
export default {
    name: 'App',
    components: {
        Navbar,
        Header,
        Footer,
        SpeedDial,
        TopBtn
    }, 
    setup() {
        window.addEventListener("scroll", handleScroll);
        const active= ref(false)
        const lastScrollY = ref(250)
        const showHeader = ref(true)
        const changeColor = ref(false)
        const move= ref(false)
        const transparentNav = ref(true)
        const route =useRoute();
    
        function handleScroll(){
            let st = window.scrollY
            if(st > lastScrollY.value){
                active.value =true
            }else{
                active.value =false
            }
            if(st>200){
                lastScrollY.value = st;
                route.name ==='Index' ? transparentNav.value = false : 1
            }else{
                route.name ==='Index' ? transparentNav.value = true : 1
            }
        }

        function closeHeader(){
            showHeader.value = false
        }

        function searchColor(){
            changeColor.value =! changeColor.value
        }

        function showUpHeader(){
            showHeader.value = true
        }
        watch(route, function (newVal) {
            newVal.name ==='Index' ? transparentNav.value = true : transparentNav.value = false
        });

        return{active,showHeader,move,transparentNav,changeColor,closeHeader,showUpHeader,searchColor}
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
}

.nav-bar{
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    transition: .3s ease;
}

.nav-bar.trans .section,.nav-bar.trans .nav-top{
    background: transparent;
    border-bottom: none ;
    color: white;
}

.nav-bar.trans .pi-search,.nav-bar.trans .pi-shopping-cart,.nav-bar.trans .pi-map-marker,
.nav-bar.trans .pi-map-marker, .nav-bar.trans .pi-user,.nav-bar.trans .pi-heart,
.nav-bar.trans .pi-apple,.nav-bar.trans .nav-ul .navTitle {
    color: white;
}

.nav-bar.hideUp{
    top: -175px;
}

.nav-bar.search .pi-search{
    color: black;
}

@media(max-width:900px){
    .nav-bar.trans .line,.nav-bar.trans .line:before,.nav-bar.trans .line:after{
        background: white;
    }

    #app{
        overflow-x:hidden;
    }
}

</style>
