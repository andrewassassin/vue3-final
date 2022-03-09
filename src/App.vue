<template>
    <div id="app">
        <nav class="nav-bar" :class="{hideUp:active}">
            <Navbar />
        </nav>
        <header v-if="showHeader" class="header-bar">
            <Header/>
        </header>
        <section  class="content p-my-3">
            <router-view @closeHeader="closeHeader" @showUpHeader="showUpHeader"  v-if="isRouterAlive"/>
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
export default {
    name: 'App',
    components: {
        Navbar,
        Header,
        Footer,
        SpeedDial,
        TopBtn
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
            showHeader:true,
            move:false
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
        closeHeader(){
            console.log('close header')
            this.showHeader = false
        },
        showUpHeader(){
            this.showHeader = true
        },
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
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
