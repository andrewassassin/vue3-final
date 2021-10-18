<template>
    <div>
      <nav class="navbar-expand-lg navbar-light fixed-top" id="navBar">
            <!-- 手機版切換導覽列顯示按鈕 -->
            <h5>Horizontal</h5>
          <MegaMenu v-if="showMega" :model="items" />
          <div class="nav-top ml-5">              
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item mr-5">
                      <router-link class="text-body nav-link" to="/">首頁</router-link>
                  </li>
                  <li class="nav-item active mr-5">
                      <router-link class="text-body nav-link" to="/product">商品詳情</router-link>
                  </li>
                  <li class="nav-item mr-5 ">
                      <router-link class="text-body nav-link" to="/create">建立商品</router-link>
                  </li>
                  <li class="nav-item mr-5">
                      <router-link class="text-body nav-link" to="/register">註冊</router-link>
                  </li>
                  <li class="nav-item mr-5">
                      <router-link class="text-body nav-link" to="/login">登入</router-link>
                  </li>
                    <li class="nav-item mr-5">
                      <router-link class="text-body nav-link" to="/multi">多選</router-link>
                  </li>              
                </ul>
          </div>
          <form @submit.prevent="innerSearch($event)" class="form-inline mr-5 search-bar">
                <input v-model="searchBar" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-info my-2 my-sm-0" type="submit">Search</button>
          </form>
          <button v-on:click.prevent="openModal()" class="btn btn-primary mr-5"  type="click">
            <i class="fas fa-shopping-cart"></i> 購物車
          </button>
      </nav>
            <transition >
                <Modal v-if="isClickCart" @closeBtn="closeModal"  />
            </transition >
    </div>
</template>
<script>
import MegaMenu from 'primevue/megamenu';
import { inject } from "vue";
import Modal from '@/components/Modal'
import Search from '@/views/Search'
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: 'Navbar',
  setup(){
    const reload = inject("reload");
    const router = useRouter();
    const route = useRoute();
    const isClickCart = ref(false);
    const showMega = ref(false);
    const searchBar = ref("");
      const items = ref([
            {
                label: 'Videos', icon: 'pi pi-fw pi-video',
                items: [
                    [
                        {
                            label: 'Video 1',
                            items: [{label: 'Video 1.1'}, {label: 'Video 1.2'}]
                        },
                        {
                            label: 'Video 2',
                            items: [{label: 'Video 2.1'}, {label: 'Video 2.2'}]
                        }
                    ],
                    [
                        {
                            label: 'Video 3',
                            items: [{label: 'Video 3.1'}, {label: 'Video 3.2'}]
                        },
                        {
                            label: 'Video 4',
                            items: [{label: 'Video 4.1'}, {label: 'Video 4.2'}]
                        }
                    ]
                ]
            },
            {
                label: 'Users', icon: 'pi pi-fw pi-users',
                items: [
                    [
                        {
                            label: 'User 1',
                            items: [{label: 'User 1.1'}, {label: 'User 1.2'}]
                        },
                        {
                            label: 'User 2',
                            items: [{label: 'User 2.1'}, {label: 'User 2.2'}]
                        },
                    ],
                    [
                        {
                            label: 'User 3',
                            items: [{label: 'User 3.1'}, {label: 'User 3.2'}]
                        },
                        {
                            label: 'User 4',
                            items: [{label: 'User 4.1'}, {label: 'User 4.2'}]
                        }
                    ],
                
                ]
            },
            {
                label: 'Events', icon: 'pi pi-fw pi-calendar',
                items: [
                    [
                        {
                            label: 'Event 1',
                            items: [{label: 'Event 1.1'}, {label: 'Event 1.2'}]
                        },
                        {
                            label: 'Event 2',
                            items: [{label: 'Event 2.1'}, {label: 'Event 2.2'}]
                        }
                    ],
                    [
                        {
                            label: 'Event 3',
                            items: [{label: 'Event 3.1'}, {label: 'Event 3.2'}]
                        },
                        {
                            label: 'Event 4',
                            items: [{label: 'Event 4.1'}, {label: 'Event 4.2'}]
                        }
                    ]
                ]
            },
        ]);

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
      return {
        isClickCart,
        searchBar,
        openModal,
        closeModal,
        innerSearch,
        reload, 
        router,
        route,
        items,
        showMega
      }
  },
  components: {
    Modal,
    MegaMenu
  },

}

</script>

<style >

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
  background:  rgba(170, 100, 9, 0.904);
  z-index: 99;
  display: flex;
  align-items: center;
  height: 56px;
  justify-content: space-between;
  
}

.nav-top{
  display: flex;
}

.search-bar{
  float: right;
}

</style>