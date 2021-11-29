<template>
  <div class="mt-5">
    <h3>登入</h3>
    <section class="py-3">
        <div class="container">
            <div class="row">
                <form id="LoginForm" v-on:submit.prevent="loginForm($event)" class="container col-md-6 py-3">
                    <div class="form-group">
                        <input type="text" v-model="user.username" placeholder="E-mail" id="userName" class="login-input" required>
                    </div>
                    <div class="form-group">
                        <input type="password" v-model="user.password" placeholder="密碼" id="userPwd" class="login-input"  required>
                    </div>
                    <div class="form-group ">
                        <button type="submit" class="loginBtn" :class="{ color: spinActive }"> 
                            <div class="spinner-border" v-show="spinActive" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>{{loginText}}
                        </button>
                    </div>
                    <div class="mt-5">
                        <h6 class="mb-3">忘記密碼了嗎?</h6>
                        <h6>創建帳戶</h6>
                    </div>
                </form>              
            </div>
        </div>
        <Toast /> 
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import UserInfo from '@/views/UserInfo'
import Toast from 'primevue/toast';
export default {
    data () {
        return {
            loginText:'登入',
            spinActive:false,
            user:{
                    username:'',
                    password:'',
            }, 
            api:'login',
            messages: [],
        }
    }, 
    components:{Toast},
    methods:{
        loginForm () {
            this.spinActive = true
            this.loginText=''
            const data = {
                username: this.user.username,
                password: this.user.password,
            }
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            };                
            axios.post(`https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`, data, config)
                .then(response => {
                    console.log('res',response)
                    if(response.data.msg==="密碼錯誤"){
                        this.$toast.add({severity:'error', summary: 'Error Message', detail:'密碼輸入錯誤', life: 3000});
                        this.spinActive = false
                        this.loginText='登入'
                        return;
                    }
                    setTimeout(() => {
                        this.$router.push({
                            path: `/userinfo`,
                            component: UserInfo,
                        })  
                        localStorage.setItem('user', JSON.stringify(response.data))
                        this.$store.commit("user", response.data);
                        this.$store.dispatch("DataGetCart");
                    }, 1000);
                })
                .catch(error => {
                    console.log('err',error);
                });

        }          
    }
}
</script>
<style scoped>
.login-input{
    background: rgb(241, 241, 241);
    width: 500px;
    height: 50px;
    border: none;
    padding: 10px;
}

.login-input:focus{
    border-radius: 4px;
    border: 2px black solid;
}
    

.spinner-border{
    width: 22px;
    height: 22px;
}

.loginBtn{
    width: 500px;
    height: 50px;
    border: 1px #000000 solid;
    background: rgb(255, 255, 255);
    border-radius: 0;
    font-weight: bold;
    transition: 0.3s ease;
    color: black;
}

.loginBtn:hover {
    background: black;
    color: #fff;
}

.loginBtn.color{
    opacity: .7;
}

.p-toast{
    top: 150px;
}

@media (max-width: 600px) {
    .login-input,.loginBtn{
        width: 90vw;
    }
}

</style>