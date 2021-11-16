<template>
  <div class="mt-5">
    <h3>會員登入</h3>
    <section class="py-3">
        <div class="container">
            <div class="row">
                <form id="LoginForm" v-on:submit.prevent="loginForm($event)" class="container col-md-6 py-3">
                    <div class="form-group">
                        <label for="userName">會員帳號</label>
                        <input type="text" v-model="user.username" placeholder="請輸入帳號" id="userName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="userPwd">會員密碼</label>
                        <input type="password" v-model="user.password" placeholder="請輸入密碼" id="userPwd" class="form-control"  required>
                    </div>
                    <div class="form-group my-4">
                        <button type="submit" class="btn btn-primary loginBtn" :class="{ color: spinActive }"> 
                            <div class="spinner-border" v-show="spinActive" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>{{loginText}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import UserInfo from '@/views/UserInfo'
export default {
    data () {
        return {
            loginText:'登入',
            spinActive:false,
            user:{
                    username:'',
                    password:'',
            }, 
            api:'login'
        }
    }, 
    methods:{
        loginForm () {
            this.spinActive = true
            this.loginText=''
            console.log('submit')
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
                    setTimeout(() => {
                        this.$router.push({
                            path: `/userinfo`,
                            component: UserInfo,
                        })  
                        localStorage.setItem('user', JSON.stringify(response.data))
                        this.$store.commit("user", response.data);
                        this.$store.dispatch("DataGetCart");
                        // this.spinActive = false
                    }, 1000);
                })
                .catch(error => {
                    console.log('err',error);
                });

         }          
    },

}
</script>
<style scoped>
.spinner-border{
    width: 22px;
    height: 22px;
}

.loginBtn{
    width: 70px;
    height: 38px;
}
.loginBtn.color{
    width: 70px;
    height: 38px;
    /* background: rgb(22, 21, 21); */
    opacity: .8;
}
</style>