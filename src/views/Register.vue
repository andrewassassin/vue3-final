<template>
    <div class="register"> 
        <h2>註冊</h2>
        <section class="p-py-3 section">
            <form @submit.prevent="registerForm($event)" class="register-form">
                <div class="input-group">
                    <input type="text" v-model="user.name" class="register-input" placeholder=" " required/>
                    <label class="upLabel">姓名</label>
                </div>
                <div class="input-group">
                    <input type="number" v-model="user.phone" class="register-input" placeholder=" " required/>
                    <label class="upLabel">手機號碼</label>
                </div>
                <div class="input-group account-group p-d-flex p-flex-wrap">
                    <input type="email" v-model="user.username" placeholder=" " id="userName" class="register-input account-group" required/>
                    <label class="upLabel">E-mail</label>
                    <small v-if="repeatAccount" class="p-error">
                        帳號已有人使用
                    </small>
                </div>
                <div class="input-group pwd-group">
                    <input :type="typePwd" v-model="user.password" placeholder="  " id="userPwd" class="register-input" @focus="focusPwd" @keyup="pwdAuth" @blur="blur" required/>
                    <label class="upLabel">密碼</label>
                    <i class="pi p-eye" :class="{'pi-eye': hidePwd,'pi-eye-slash': showPwd}" @click="visiblePwd()" style="fontsize: 1.2rem"></i>
                    <transition>
                        <div v-show="showHint" class="pwd-hint">
                            <div class="textarea">Pick a password</div>
                            <ProgressBar :value="progressRate" :showValue="false" :class="{ safecolor: activeColor, color: middle }"/>
                            <div>{{ pwdHint }}</div>
                        </div>
                    </transition>
                </div>
                <div class="input-group">
                    <input :type="typePwd" placeholder="  " class="register-input" required/>
                    <label class="upLabel">再輸入密碼</label>
                </div>
                <div class="input-group p-d-flex p-flex-wrap p-jc-center">
                    <button type="submit" class="general-btn" :class="{ color: spinActive }">
                        <div class="p-d-flex p-jc-center p-ai-center" v-if="spinActive" role="status">
                            <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
                        </div>{{loginText}}
                    </button>
                    <small v-if="failAccount" class="p-error">
                        註冊失敗
                    </small>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import Login from '@/views/Login'
export default {
    name: "Register",
    data() {
        return {
            loginText:'註冊',
            spinActive: false,
            failAccount:false,
            typePwd: "password",
            showHint: false,
            hidePwd: true,
            showPwd: false,
            repeatAccount:false,
            pwdHint: "Enter a password",
            user: {
                username: "",
                password: "",
                name: "",
                phone:""
            },
            progressRate: 0,
            activeColor: false,
            middle: false,
            cmd: "register",
        };
    },
    created(){
        this.$store.state.src='carousel-4.jpg'
    },
    methods: {
        async registerForm() {
            this.spinActive = true
            this.loginText=''
            const data = {
                username: this.user.username,
                password: this.user.password,
                name: this.user.name,
                phone: this.user.phone,
            };

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

            await new Promise(resolve => {
                setTimeout(resolve, 3000)
            })
            await axios(options)
                .then((response) => {
                    this.spinActive = false
                    this.loginText='註冊'
                    if(response.data.msg==='帳號已有人註冊'){
                        this.repeatAccount = true
                    }else if(response.data.msg==='ok'){
                        console.log('註冊成功!')
                        this.$router.push({
                            path: `/login`,
                            component: Login,
                        })           
                    }else{
                        console.log('msg',response.data.msg)
                    }
                })
                .catch((error) => {
                    console.log("err", error);
                    this.failAccount = true
                    this.spinActive = false
                    this.loginText='註冊'
                });
        },
        visiblePwd() {
            this.typePwd = this.typePwd === "password" ? "text" : "password";
            this.hidePwd = !this.hidePwd;
            this.showPwd = !this.showPwd;
        },
        focusPwd() {
            this.showHint = true;
        },
        pwdAuth() {
            var oValue = this.user.password;
            // console.log("keyup!", oValue);
            if (/\d/.test(oValue) && /[a-z]/.test(oValue) && /[A-Z]/.test(oValue)) {
                this.changeColorHint("Strong", 100, true, false);
            } else if (/^\d+$/.test(oValue) ||/^[A-Z]+$/.test(oValue) ||/^[a-z]+$/.test(oValue)) {
                this.changeColorHint("Weak", 25, false, false);
            } else if (oValue == "") {
                this.changeColorHint("Enter a password", 0, false, false);
            } else {
                this.changeColorHint("Middle", 50, false, true);
            }
        },
        changeColorHint(hint, progressRate, acolor, mcolor) {
            this.pwdHint = hint;
            this.progressRate = progressRate;
            this.activeColor = acolor;
            this.middle = mcolor;
        },
        blur() {
            this.showHint = false;
        },
    },
};
</script>
<style scoped>
.section{
    display: flex;
    justify-content: center;
}


.register-form{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 600px;
}

.p-eye {
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 95%;
}

.pwd-group {
    position: relative;
}

.input-group {
    width: 500px;
    margin: 10px 0px;
    position: relative;
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

.register-input{
    background: rgb(241, 241, 241);
    width: 500px;
    height: 50px;
    border: none;
    padding: 10px;
    box-shadow: none;
}

.register-input:focus{
    border-radius: 4px;
    border: 2px black solid;
}

.register-input:focus~.upLabel,
.register-input:not(:placeholder-shown)~.upLabel {
    color: black;
    font-size: 10px;
    top: -15px;
    border: none;
}

.p-error{
    position: absolute;
    width: 120px;
    top: 50px;
}

::-webkit-input-placeholder { /* Chrome, Safari */
    font-size: 16px;
}   

/* 密碼強度驗證區塊 */
.pwd-hint {
    position: absolute;
    z-index: 50;
    /* left: 20px; */
    top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 10px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.288);
    padding: 20px;
    width:500px;
    height: 130px;
    font-size: 14px;
    overflow: hidden;
}

.pwd-hint div {
    width: 200px;
    margin: 5px;
}

.p-progressbar {
    height: 10px;
}

::v-deep(.p-progressbar .p-progressbar-value) {
    background: crimson;
}

::v-deep(.p-progressbar.safecolor .p-progressbar-value) {
    background: rgb(11, 102, 49);
}

::v-deep(.p-progressbar.color .p-progressbar-value) {
    background: rgb(255, 239, 15);
}

.v-enter-active,
.v-leave-active {
    transition: all .3s ease;
}

.v-enter-from,
.v-leave-to {
    height: 0;
    opacity: 0;
}

.v-enter-to,
.v-leave-from {
    height: 130px;
    opacity: 1;
}    

.general-btn{
    width: 500px;
    height: 50px;
}

.general-btn.color{
    opacity: .7;
}

input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.general-btn.color{
    opacity: .7;
}

.register{
    margin: 200px 0 50px 0;
}

@media (max-width: 600px) {
    .register-form,.register-input,.registerBtn,.form-group,.pwd-hint,.general-btn{
        width: 90vw;
    }

    .register{
        margin: 150px 0 50px 0;
    }

}
</style>
