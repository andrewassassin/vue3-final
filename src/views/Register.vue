<template>
    <div class="hello mt-5">
        <section class="py-3">
            <div class="container">
                <div class="row">
                    <form
                        id="registerForm"
                        v-on:submit.prevent="registerForm($event)"
                        class="container col-md-6 py-3"
                    >
                        <div class="form-group row align-items-center">
                            <label for="userName" class="mr-3">會員帳號</label>
                            <input
                                type="text"
                                v-model="user.username"
                                placeholder="請輸入帳號"
                                id="userName"
                                class="col-lg-8 form-control"
                                required
                            />
                            <button @click.prevent="checkAccount" class="btn btn-info checking-btn" :class="{ color: spinActive }">
                                <div class="spinner-border" v-show="spinActive" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>{{loginText}}
                            </button>
                        </div>
                        <div class="form-group row align-items-center mt-5">
                            <label for="userPwd" class="mr-3">會員密碼</label>
                            <input
                                :type="typePwd"
                                v-model="user.password"
                                placeholder="請輸入密碼"
                                id="userPwd"
                                class="form-control col-lg-8 pwd"
                                @focus="focusPwd"
                                @keyup="pwdAuth"
                                @blur="blur"
                                required
                            />
                            <i
                                class="pi"
                                v-bind:class="{
                                    'pi-eye': isActive,
                                    'pi-eye-slash': notActive,
                                }"
                                @click="showPwd()"
                                style="fontsize: 1.2rem"
                            ></i>
                        </div>
                        <transition>
                            <div v-show="showHint" class="pwd-hint">
                                <div class="textarea">Pick a password</div>
                                <ProgressBar :value="progressRate" :showValue="false" :class="{ safecolor: activeColor, color:middle}" />
                                <div>{{ pwdHint }}</div>
                            </div>
                        </transition>
                        <div class="form-group row align-items-center mt-5">
                            <label for="nickName" class="mr-3">會員姓名</label>
                            <input
                                type="text"
                                v-model="user.name"
                                id="nickName"
                                class="form-control col-lg-8"
                                required
                            />
                        </div>
                        <div class="form-group my-4 mt-5">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-plus"></i> 註冊
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Register",
    data() {
        return {
            loginText:'檢查帳號',
            spinActive:false,
            typePwd: "password",
            showHint:false,
            isActive: true,
            notActive: false,
            pwdHint: "Enter a password",
            user: {
                username: "",
                password: "",
                name: "",
            },
            progressRate: 0,
            activeColor:false,
            middle:false,
            api:'register'
        };
    },
    methods: {
        registerForm() {
            console.log("submit");
            const data = {
                username: this.user.username,
                password: this.user.password,
                name: this.user.name,
            };
            // console.log('data',data)
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            axios
                .post(
                    `https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`,
                    data,
                    config
                )
                .then((response) => {
                    console.log("res  ", response);
                })
                .catch((error) => {
                    console.log("err", error);
                });
        },
        checkAccount(){
            this.spinActive = true
            this.loginText=''
            const data = {
                username: this.user.username,
            }
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            axios
                .post(
                    `https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`,
                    data,config
                )
                .then((response) => {
                    // console.log("res  ", response.data.msg);
                    if(response.data.msg==='帳號可使用'){
                        console.log('帳號可使用')
                         setTimeout(() => {
                            this.spinActive = false
                            this.loginText='帳號可使用'
                            },1000)
                        return;
                    }else{
                        console.log('帳號已重複')
                        this.spinActive = false
                        this.loginText='帳號已重複'
                        return;
                    }
                })
                .catch((error) => {
                    console.log("err", error);
                });
        },
        showPwd() {
            this.typePwd = this.typePwd === "password" ? "text" : "password";
            this.isActive = !this.isActive;
            this.notActive = !this.notActive;
        },
        focusPwd(){
            this.showHint = true
        },
        pwdAuth() {
            var oValue = this.user.password;
            console.log("keyup!", oValue);
            if (
                /\d/.test(oValue) &&
                /[a-z]/.test(oValue) &&
                /[A-Z]/.test(oValue)
            ) {
                this.changeColorHint("Strong",100,true,false)
            } else if (
                /^\d+$/.test(oValue) ||
                /^[A-Z]+$/.test(oValue) ||
                /^[a-z]+$/.test(oValue)
            ) {
                this.changeColorHint("Weak",25,false,false)
            } else if(oValue==""){
                this.changeColorHint("Enter a password",0,false,false)
            } else{
                this.changeColorHint("Middle",50,false,true)
            }
        },
        changeColorHint(hint,progressRate,acolor,mcolor){
                this.pwdHint = hint;
                this.progressRate = progressRate;
                this.activeColor=acolor
                this.middle=mcolor
        },
        blur(){
            this.showHint = false
        },
    },
};
</script>
<style scoped>
.pi {
    position: relative;
    left: -30px;
}

/* 密碼強度驗證區塊 */

.pwd{
    position: relative;
}
.pwd-hint{
    position: absolute;
    z-index: 50;
    left:77px;
    top: 145px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 10px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.288);
    padding: 20px;
    width: 384px;
    /* height: 120px; */
    font-size: 14px;
    /* opacity: 1; */
}

.pwd-hint div{
    width: 200px;
    margin: 5px;
}

.p-progressbar{
    height: 10px;
    /* background: rgb(255, 255, 255); */
}

::v-deep(.p-progressbar .p-progressbar-value){
    background: crimson;
}

::v-deep(.p-progressbar.safecolor .p-progressbar-value){
    background: rgb(11, 102, 49);
}

::v-deep(.p-progressbar.color .p-progressbar-value){
    background: rgb(255, 239, 15);
}

.v-enter-active,.v-leave-active {
  transition: all .1s ease-in-out;
}

.v-enter-from, .v-leave-to {
  height: 0;
  opacity: 0;
}

.v-enter-to, .v-leave-from {
  height: 120px;
  opacity: 1;
}

.spinner-border{
    width: 22px;
    height: 22px;
}

.checking-btn{
    width: 110px;
    height: 38px;
}
</style>