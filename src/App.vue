<template>
  <div id="app">
    <div>
      <Navbar />
    </div>
    <div class="content">
      <router-view v-if="isRouterAlive"/>
    </div>
  </div>
</template>
<script>

import Navbar from '@/components/Navbar'
import { provide,nextTick } from "vue";
import { ref } from "vue";
export default {
  name: 'App',
   components: {
    Navbar
  },
  setup() {
    provide("reload", reload);
    const isRouterAlive = ref(true);

    function reload(){
      isRouterAlive.value = false;
      nextTick(() => {
        console.log('next tick')
        isRouterAlive.value = true;
      })
    }
    return{
      reload,
      isRouterAlive
    }
  }
}
</script>

<style scoped>
*{
    overflow-x:hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content{
  padding-top:75px ;
}
</style>
