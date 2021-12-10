<template>
  <div class="p-mt-5 p-d-flex p-flex-wrap p-jc-center">
    <div class="p-md-12">
        <h3>會員資料</h3>
    </div>
    <div class="p-text-left">
      <div>
        <div class="p-mb-1">E-mail</div>
        <p v-if="changeInfo">{{user.username}}</p>
        <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12" v-model="user.username" placeholder="" type="text" />
      </div>
      <hr size="1px" align="left" class="p-my-4">
      <div>
        <div class="p-mb-1">姓名</div>
        <p v-if="changeInfo">{{user.name}}</p>
        <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12" v-model="user.name" placeholder="" type="text" />
      </div>
      <hr size="1px" align="left" width="100%" class="p-my-4">
      <div>
        <div class="p-mb-1">電話</div>
        <p v-if="changeInfo">{{user.phone}}</p>
        <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12" v-model="user.phone" type="text" />
      </div>
      <hr size="1px" align="left" width="100%" class="p-my-4">
      <button type="submit" class="logout-Btn" @click="changeInfo?editInfo():saveInfo()">{{changeInfo?'編輯':'儲存'}}</button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        changeInfo:true
      }
    },
    methods:{
      editInfo(){
        this.changeInfo=false
      },
      saveInfo(){
        console.log('saveInfo')
        console.log('userNew',this.user)
        localStorage.setItem('user', JSON.stringify(this.user))
        this.changeInfo=true
      }
    },
    computed: {
      user() {
        console.log('userid info ',this.$store.state.user)  
        return this.$store.state.user;
      },
    },
    mounted(){
    }
}
</script>
<style scoped>
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