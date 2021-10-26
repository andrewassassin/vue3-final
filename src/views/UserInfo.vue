<template>
  <div id="userInfo">
    <h1>UserInfo</h1>
    <h3>user name:</h3>
    <h3>ID:</h3>
    <p>{{ userid }}</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        userName: 'Steven Chou',
      }
    },
    computed: {
        userid() {
        console.log('userid info ',this.$store.state.userId)  
        return this.$store.state.userId;
      },
    }
  }
</script>
<style scoped>
#userInfo{
    margin-top: 75px;
}
</style>