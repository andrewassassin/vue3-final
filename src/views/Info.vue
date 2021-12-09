<template>
  <div class="p-mt-5 p-d-flex p-flex-wrap p-jc-center">
    <div class="p-md-12">
        <h3>會員資料</h3>
    </div>
    <div class="p-text-left">
      <p>帳號: {{user.username}}</p>
      <hr size="1px" align="left" class="p-my-4">
      <p class="p-mt-5">ID: {{user.id}}</p>
      <hr size="1px" align="left" width="100%" class="p-my-4">
      <p>姓名: {{user.name}}</p>
      <hr size="1px" align="left" width="100%" class="p-my-4">
      <p>電話: {{user.phone}}</p>
      <hr size="1px" align="left" width="100%" class="p-my-4">
      <button type="submit" class="logout-Btn" @click="logOut" :class="{ color: spinActive }">                        
            <div class="spinner-border " v-show="spinActive" role="status">
                <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
            </div>{{logOutText}}
        </button>
    </div>
  </div>
</template>
<script>
import Login from '@/views/Login'
  export default {
    data () {
      return {
        logOutText:'登出',
        isShowLogOut:false,
        spinActive:false,
      }
    },
    methods:{
      logOut(){
        this.spinActive = true
        this.logOutText=''
        setTimeout(() => {
            this.$store.commit("user",{});
            localStorage.setItem('user', "")
            this.$store.dispatch("DataGetCart");
            this.$router.push({
                path: `/login`,
                component: Login,
            })  
        }, 1000);     
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

.spinner-border{
    width: 22px;
    height: 22px;
}

.logout-Btn{
    width: 500px;
    height: 50px;
    border: 1px #000000 solid;
    background: rgb(255, 255, 255);
    border-radius: 0;
    font-weight: bold;
    transition: 0.3s ease;
    color: black;
    font-size: 16px;
}

.logout-Btn:hover {
    background: black;
    color: #fff;
    cursor: pointer;
}
</style>