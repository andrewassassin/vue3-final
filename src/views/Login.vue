<template>
  <div class="p-mt-5">
    <h2>登入</h2>
    <section class="p-py-3">
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
                        <button type="submit" class="general-btn" :class="{ color: spinActive }"> 
                            
                            <div class="spinner-border " v-show="spinActive" role="status">
                                <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
                            </div>{{loginText}}
                        </button>
                    </div>
                    <div class="mt-5">
                        <h6 class="mb-3">忘記密碼了嗎?</h6>
                        <h6 @click="toRegister" class="create-btn">創建帳戶</h6>
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
import Register from '@/views/Register'
import Toast from 'primevue/toast';
export default {
    components:{
        Toast
    },
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

        },
        toRegister(){
            this.$router.push({
                path: `/register`,
                component: Register,
            })  
        }          
    }
}
</script>
<style scoped>
.form-group{
    margin: 15px;
}

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
    
::-webkit-input-placeholder { /* Chrome, Safari */
    font-size: 16px;
}   

.spinner-border{
    width: 22px;
    height: 22px;
}

.general-btn{
    width: 500px;
    height: 50px;
}

.general-btn.color{
    opacity: .7;
}

.p-toast{
    top: 150px;
}

.create-btn{
    cursor: pointer;
}

@media (max-width: 600px) {
    .login-input,.loginBtn{
        width: 90vw;
    }
}

</style>