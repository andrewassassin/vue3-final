<template>
  <div class="p-mt-5 p-d-flex p-jc-center p-ai-center" >
    <div class="p-md-2 p-d-flex p-flex-wrap p-jc-center left-menu">
      <div class="p-md-12 p-d-flex p-flex-wrap p-jc-center">
        <TieredMenu class="" :model="items" />
      </div>
      <div class="p-md-12">
        <Button @click.prevent="logOut" label="登出"  class="p-ml-3"/>
      </div>
    </div>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Login from '@/views/Login'
  export default {
    data () {
      return {
        items: [
                {
                  label:'會員資料',
                  icon:'pi pi-fw pi-file',
                },
                {
                  label:'訂單狀態',
                  icon:'pi pi-fw pi-pencil',
                  items:[
                    {
                        label:'全部',
                        icon:'pi pi-fw pi-align-left'
                    },
                    {
                        label:'處理中',
                        icon:'pi pi-fw pi-align-right'
                    },
                  ]
                },
                {
                  label:'信用卡管理',
                  icon:'pi pi-fw pi-file',
                },
                {
                  label:'收藏名單',
                  icon:'pi pi-fw pi-file',
                },
        ],
        logOutText:'編輯',
        isShowLogOut:false,
        spinActive:false,
        changeInfo:true,
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
      },
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
.left-menu{
  position: fixed;
  left: 100px;
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