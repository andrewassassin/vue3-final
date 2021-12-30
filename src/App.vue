<template>
  <div id="app">
    <div class="navbar">
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
        margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
}

.navbar{
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
}

.content{
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
    .content{
        margin-top: 120px;
  }
}

</style>
