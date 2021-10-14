<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <section class="py-3">
        <div class="container">
            <div class="row">
                <form id="registerForm" v-on:submit.prevent="registerForm($event)" class="container col-md-6 py-3">
                    <div class="form-group">
                        <label for="userName">會員帳號</label>
                        <input type="text" v-model="user.username" placeholder="請輸入帳號" id="userName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="userPwd">會員密碼</label>
                        <input type="password" v-model="user.password" placeholder="請輸入密碼" id="userPwd" class="form-control"  required>
                    </div>
                   <div class="form-group">
                        <label for="nickName">會員姓名</label>
                        <input type="text" v-model="user.name" id="nickName" class="form-control" required>
                    </div>
                    <div class="form-group my-4">
                        <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i> 註冊</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
    name: 'Register',
    data () {
        return {
            msg: '會員註冊',
            user:{
                username:'',
                password:'',
                name:''
            }
        }
    }, 
    methods: {
        registerForm(event){
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
        }
    }
}
</script>