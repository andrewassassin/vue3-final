<template>
  <div class="login">
    <h2>登入</h2>
    <section class="p-d-flex p-jc-center">
        <form v-on:submit.prevent="loginForm($event)">
            <div class="form-group">
                <input type="text" v-model="user.username" placeholder="  " id="userName" class="login-input" required>
                <label class="upLabel">E-mail</label>
            </div>
            <div class="form-group">
                <input type="password" v-model="user.password" placeholder=" " id="userPwd" class="login-input"  required>
                <label class="upLabel">密碼</label>				
            </div>
            <div class="form-group">
                <button type="submit" class="general-btn" :class="{ color: spinActive }">                          
                    <div class="spinner-border p-d-flex p-jc-center p-ai-center" v-if="spinActive" role="status">
                        <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
                    </div>{{loginText}}
                </button>
            </div>
            <div class="mt-5">
                <h6 class="mb-3">忘記密碼了嗎?</h6>
                <h6 @click="toRegister" class="create-btn">創建帳戶</h6>
            </div>
        </form>              
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
            messages: [],
            cmd:'login'
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
            const options = {
                method: 'get',
                url: `http://localhost/Amitproject/account.php#/`,
                params: {
                    cmd: this.cmd,
                    data: data
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }            
            axios(options)
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
    position: relative;
    margin: 20px;
}

.upLabel {
    position: absolute;
    left: 10px;
    top: 40%;
    transform: translateY(-25%);
    transition: .3s;
    pointer-events: none;
    color: rgb(107, 105, 105);
}

.login-input:focus~.upLabel,
.login-input:not(:placeholder-shown)~.upLabel {
    color: black;
    font-size: 10px;
    top: -15px;
    border: none;
}

.login-input{
    background: rgb(241, 241, 241);
    width: 500px;
    height: 50px;
    border: none;
    padding: 10px;
    box-shadow: none;
}

.login-input:focus{
    border-radius: 4px;
    border: 2px black solid;
}
    
::-webkit-input-placeholder { /* Chrome, Safari */
    font-size: 16px;
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

.login{
    margin: 220px 0 50px 0;
}

@media (max-width: 600px) {
    .login-input, .general-btn{
        width: 90vw;
        height: 50px;
    }

    .login{
        margin: 150px 0 50px 0;
    }
}

</style>