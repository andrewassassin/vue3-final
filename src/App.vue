<template>
    <div id="app">
        <div class="nav-bar" :class="{hideUp:active}">
            <Navbar />
        </div>
        <div class="header-bar">
            <Header/>
        </div>
        <div class="content">
            <router-view v-if="isRouterAlive"/>
        </div>
        <button v-if="showTop" @click="clickTop" class="goBackBtn">
            <i class="pi pi-angle-up" style="fontSize: 1.3rem;color:white;"></i>
        </button>
    </div>
</template>
<script>

import Navbar from '@/components/Navbar'
import Header from '@/components/Header.vue'
export default {
    name: 'App',
    components: {
        Navbar,
        Header
    }, 
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true,
            active:false,
            lastScrollY : 250,
            showTop:false
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(() => {
                this.isRouterAlive = true;
            });
        },
        handleScroll() {
            let st = window.scrollY
            if(st > this.lastScrollY){
                this.active =true
            }else{
                this.active =false
            }
            if(st>200){
                this.lastScrollY = st;
            }
        },
        topFunction() {
            let st = window.scrollY
            if(st > 500){
                this.showTop =true
            }else{
                this.showTop =false
            }
        },
        clickTop(){
            scrollTo(0, 0);
        }
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("scroll", this.topFunction);
    },
}
</script>

<style scoped>
*{
    overflow-x:hidden;
    margin: 0;
}

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

.nav-bar.hideUp{
    top: -175px;
}


.header-bar{
    margin-top: 175px;
}


#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

@media(max-width:900px){
    .header-bar{
        margin-top: 120px;
    }
}

</style>
