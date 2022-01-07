<template>
    <div id="app">
        <nav class="nav-bar" :class="{hideUp:active}">
            <Navbar />
        </nav>
        <header class="header-bar">
            <Header/>
        </header>
        <section class="content p-my-3">
            <router-view v-if="isRouterAlive"/>
        </section>
        <footer>
            <Footer/>
        </footer>
    </div>
    <button v-if="showTop" @click="clickTop" class="top-btn">
        <i class="pi pi-angle-up" style="fontSize: 1.3rem;color:white;"></i>
    </button>
    <div v-click-outside="onClickOutside" class="p-d-flex p-ai-center work-bar p-pl-3">
        <Button @click.prevent="showup()" class="speeddial p-mr-2 p-button-info">
                <i class="pi pi-plus" style="fontSize: 1.3rem;" :class="{rotate:isRotate}"></i>
        </Button>
        <transition-group name="show" tag="div" class="p-d-flex">
            <div v-for="(item,idx) in workbrench" v-show="animationList.indexOf(idx)!==-1" class=" p-mr-2" :key="idx">
                <i class="pi round p-d-flex p-ai-center p-jc-center" :class="item.name" style="font-size: 1.5rem"></i>
            </div>
        </transition-group> 
    </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
    name: 'App',
    components: {
        Navbar,
        Header,
        Footer
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
            showTop:false,
            animationList:[],
            isRotate: false,
            workbrench:[
                {name:'pi-heart-fill'},{name:'pi-moon'},{name:'pi-github'},{name:'pi-facebook'},{name:'pi-google'}
            ]
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
        },
        showup(){
            this.isRotate=!this.isRotate
            let that =this
            if(that.animationList.length!==0){
                this.animationList.forEach((item,i)=>{
                    setTimeout(function() {
                        that.animationList.pop()
                    },i*40)
                })
            }else{
                for(let i = 0; i < 6; i++) {
                    setTimeout(function() {
                        that.animationList.push(i)
                    }, i*50 )
                }
            }
        },
        onClickOutside(){
            this.isRotate=false
            let that =this
            this.animationList.forEach((item,i)=>{
                setTimeout(function() {
                    that.animationList.pop()
                },i*40)
            })

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

.round{
    border-radius: 50%;
    width: 45px;
    height: 45px;
    background: rgb(231, 231, 231);
    opacity: 1;
    transform: scale(1);
}

.show-enter-active,.show-leave-active {
    transition: all .3s ease;
}

.show-enter-from, .show-leave-to {
    transform: scale(0);
}

.show-enter-from{
    opacity: 0;
}



@media(max-width:900px){
    .header-bar{
        margin-top: 120px;
    }
}

</style>
