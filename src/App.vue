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
export default {
  name: 'App',
   components: {
    Navbar
  }, 
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
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
  color: #2c3e50;
  text-align: center;
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
