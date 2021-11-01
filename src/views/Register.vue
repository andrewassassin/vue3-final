<template>
  <div class="hello mt-5">
    <h3>{{ msg }}</h3>
    <section class="py-3">
        <div class="container">
            <div class="row ">
                <form id="registerForm" v-on:submit.prevent="registerForm($event)" class="container col-md-6 py-3">
                    <div class="form-group row align-items-center">
                        <label for="userName" class="mr-3">會員帳號</label>
                        <input type="text" v-model="user.username" placeholder="請輸入帳號" id="userName" class="col-lg-8 form-control" required>
                    </div>
                    <div class="form-group row align-items-center mt-5">
                        <label for="userPwd" class="mr-3">會員密碼</label>
                        <input :type="typePwd" v-model="user.password" placeholder="請輸入密碼" id="userPwd" class="form-control col-lg-8"  required>
                        <i class="pi" v-bind:class="{'pi-eye': isActive, 'pi-eye-slash':notActive}" @click="showPwd()" style="fontSize: 1.2rem"></i>
                    </div>
                   <div class="form-group row align-items-center mt-5">
                        <label for="nickName" class="mr-3">會員姓名</label>
                        <input type="text" v-model="user.name" id="nickName" class="form-control col-lg-8" required>
                    </div>
                    <div class="form-group my-4 mt-5">
                        <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i> 註冊</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data () {
        return {
            typePwd:'password',
            isActive:true,
            notActive:false,
            msg: '會員註冊',
            user:{
                username:'',
                password:'',
                name:''
            }
        }
    }, 
    methods: {
        registerForm(){
            console.log('submit')
            const data = {
                username: this.user.username,
                password: this.user.password,
                name: this.user.name
            }
            // console.log('data',data)
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    },
                };
            axios.post("https://x-home.pcpogo.com/homex/register.php?RDEBUG=andrewc", data, config)
                .then(response => {
                console.log('res  ', response);
                })
                .catch(error => {
                console.log('err',error);
                });
        },
        showPwd(){
            this.typePwd = this.typePwd === 'password' ? 'text' : 'password'
            this.isActive =! this.isActive 
            this.notActive =! this.notActive
        }
    }
}
</script>
<style scoped>
.pi{
    position: relative;
    left: -30px;
}
</style>