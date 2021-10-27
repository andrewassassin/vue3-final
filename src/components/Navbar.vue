<template>
    <div>
      <nav class="navbar-expand-lg navbar-light fixed-top" id="navBar">
          <img class="logo" src="../assets/img/logo.png" alt="">
          <div v-bind:class="{ active: isActive }" class="nav-top">              
                <ul class="mr-auto mt-2 mt-lg-0 nav-ul">
                  <li class="nav-item">
                      <router-link class="nav-link" to="/">回到首頁</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link itemList" to="/product">
                          商品詳情
                            <itembar class="itemBar" />
                      </router-link>
                  </li>
                  <li class="nav-item ">
                      <router-link class="nav-link" to="/create">建立商品</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to="/register">會員註冊</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to="/login">會員登入</router-link>
                  </li>
                    <li class="nav-item mr-5">
                      <router-link class="nav-link" to="/userinfo">會員資料</router-link>
                  </li>              
                </ul>
          </div>
          <button @click="toggleBar()" class="nav-toggler">
            <div v-bind:class="{ rotate: isActive }" class="line"></div>
          </button>
          <form @submit.prevent="innerSearch($event)" class="form-inline mr-5 search-bar">  
                <input v-model="searchBar" @blur="blurFocus()" v-bind:class="{ extend: isActive }" class="mr-sm-2 s-input" type="search" placeholder="Search" aria-label="Search" autofocus>
                <i class="pi pi-search mr-5" @click="showInput()" style="fontSize: 1.5rem" type="button"></i>          
          </form>
          <i @mouseover="isHoverCart = true" @mouseleave="isHoverCart=false" v-bind:class="{ move: isHoverCart }" class="pi pi-shopping-cart" @click.prevent="openModal()" style="fontSize: 1.6rem" type="button"></i>  
              <i v-if="isLogin" class="pi pi-user" style="fontSize: 1.6rem" type="button" aria-current="page"></i>     
      </nav>
            <transition >
                <Modal v-if="isClickCart" @closeBtn="closeModal"  />
            </transition >
           
    </div>
</template>
<script>
import { inject } from "vue";
import store from "@/store";
import Modal from '@/components/Modal'
import itembar from '@/components/itembar'
import Search from '@/views/Search'
import { ref,watch,computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {  
  name: 'Navbar',
  setup(){
    const reload = inject("reload");
    const myinput = ref(null);
    const router = useRouter();
    const route = useRoute();
    const isClickCart = ref(false);
    const searchBar = ref("");
    const isActive = ref(false);
    const isHoverItem = ref(false);
    const isHoverCart = ref(false);
    const isLogin = ref(false);
    const doneTodos = computed(()=>{
      // console.log('doneTodos',store.getters.doneTodos)
      return store.getters.doneTodos;
    })

    watch(doneTodos,function(newVal){
        // console.log('newVal: ',newVal)
        if(Object.entries(newVal).length !==0){
          isLogin.value=true
        }else{
          isLogin.value=false
        }
    })

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
      isActive.value = !isActive.value;
    }


    function showInput(){
      isActive.value =true
      // myinput.value.focus()
    }
    
    function blurFocus(){
      isActive.value =false
    }

      return {
        myinput,
        isClickCart,
        searchBar,
        openModal,
        closeModal,
        innerSearch,
        reload, 
        router,
        route,
        isActive,
        toggleBar,
        isHoverItem,
        isHoverCart,
        isLogin,
        showInput,
        blurFocus,
        doneTodos
      }
  },
  components: {
    Modal,
    itembar
  },

}

</script>

<style scoped>
.logo{
  width: 8%;
  margin-left: 50px;
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


#navBar{
  box-shadow: 0px 5px 10px rgba(0, 0, 0, .2);
  background:  rgba(255, 255, 255, 0.904);
  z-index: 99;
  display: flex;
  align-items: center;
  height:75px;
  padding: 30px;
  margin:0  ;
  align-items: center;
  /* justify-content: space-between; */
  
}

.nav-top {
  position: fixed;
  height: auto;
  overflow: auto;
  left: 20%;
  }

.nav-ul {
  height: 75px;
  display: flex;
  align-items: center;
  list-style-type:none;
  margin-bottom: 0;
}

.nav-ul li{
  height: auto;
}
.nav-ul a{
  color: rgb(82, 82, 82);
  height: 75px;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-toggler {
    display: none;
}

.search-bar{
  position: fixed;
  right: 16%;
}

.s-input{
  width: 0px;
  height: 38px;
  opacity: 0;
  border-radius: 5px;
  transition: .3s ease-in;
  border: 1px #3a3a3a solid;
}

.s-input.extend {
  width: 180px;
  opacity: 1;
} 

input:focus{
  outline:none;
  border:2px #000000 solid;
  transition: .5s auto;
}

.pi-shopping-cart{
  position: fixed;
  right: 18%;
  transition: .3s;
}

.pi-shopping-cart.move{
  transform: scale(1.2);
}

.pi-user{
  position: fixed;
  right: 15%;
}

.itemBar{
  visibility: hidden;
  transition: .4s ease;
  opacity: 0;
}

.itemList:hover .itemBar{
  visibility: visible;
  opacity: 1;
}

@media (max-width: 600px) {
    .logo{
      position: fixed;
      left: 50px;
      width: 120px;
    }

    .nav-top {
        position: fixed;
        top: -300px;
        left: 0;
        width: 100%;
        /* viewport height 100% */
        height: 200px;
        background: rgba(255, 255, 255, 0.904);
        transition: all .5s ease-out;
    }

    .nav-ul{
        flex-wrap: wrap;
    }

   .nav-ul li{
        width: 100px;
    }
    .nav-top.active {
        top: 18px;
    }

    .search-bar{
        left: -340px;
    }

    .pi-shopping-cart{
        position: fixed;
        left: 72%;
        width: 100px;
        margin-right: 0;
        z-index: 50;
    }

    .pi-user{
        position: fixed;
        width: 100px;
        left: 83%;
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
        height:2px;
        background: rgb(0, 0, 0);
        position: relative;
        /* transform: rotateZ(45deg); */
    }

    .line.rotate {
        transform: rotateZ(45deg);
    }

    .line.rotate:before {
        top: 0;
    }

    .line.rotate:after {
        transform: rotateZ(270deg);
        bottom: 0px;
    }

    .line,
    .line:before,
    .line:after {
        transition: all .3s ease-out;
    }

    .line:before,
    .line:after {
        content: "";
        width: 30px;
        height: 2px;
        background: rgb(0, 0, 0);
        display: block;
        position: absolute;
        /* top: -5px; */
    }

    .line:before {
        top: -8px;
    }

    .line:after {
        bottom: -8px;
    }
}

</style>