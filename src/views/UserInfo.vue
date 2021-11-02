<template>
  <div class="mt-5" id="userInfo">
    <h3>會員資料</h3>
    <div class="mt-5 container">
      <p>會員帳號: {{user.username}}</p>
      <hr size="8px" align="center" width="70%" class="my-4">
      <p class="mt-5">會員ID: {{user.id}}</p>
      <hr size="8px" align="center" width="70%" class="my-4">
      <button v-if="isShowLogOut" class="btn btn-outline-danger" @click="logOut()" type="click">
          登出
      </button>
    </div>
  </div>
</template>
<script>
import Login from '@/views/Login'
  export default {
    data () {
      return {
        isShowLogOut:false
      }
    },
    methods:{
      logOut(){
          this.$store.commit("user",{});
          localStorage.setItem('user', "")
          this.$store.dispatch("DataGetCart");
          this.$router.push({
              path: `/login`,
              component: Login,
          })  
      }
    },
    computed: {
      user() {
        console.log('userid info ',this.$store.state.user)  
        return this.$store.state.user;
      },
      userFromVuex(){
        return this.$store.state.user;
      }
    },
    mounted(){
         if(Object.entries(this.userFromVuex).length !==0){
          this.isShowLogOut = true
        }else{
          this.isShowLogOut = false
        }
    }
}
</script>
<style scoped>
#userInfo{
    margin-top: 75px;
}
</style>