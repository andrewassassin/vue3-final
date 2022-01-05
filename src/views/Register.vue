<template>
    <div class="p-mt-5">
        <h2>註冊</h2>
        <section class="p-py-3 section">
            <form @submit.prevent="registerForm($event)" class="register-form">
                <div v-if="repeatAccount" class="input-group">
                    帳號已有人使用
                </div>
                <div class="input-group">
                    <input type="text" v-model="user.name" class="register-input" placeholder="姓名" required/>
                </div>
                <div class="input-group">
                    <input type="text" v-model="user.phone" class="register-input" placeholder="手機號碼" required/>
                </div>
                <div class="input-group account-group">
                    <input type="email" v-model="user.username" placeholder="E-mail" id="userName" class="register-input account-group" required/>
                </div>
                <div class="input-group pwd-group">
                    <input
                        :type="typePwd"
                        v-model="user.password"
                        placeholder="密碼"
                        id="userPwd"
                        class="register-input"
                        @focus="focusPwd"
                        @keyup="pwdAuth"
                        @blur="blur"
                        required
                    />
                    <i class="pi" :class="{'pi-eye': isActive,'pi-eye-slash': notActive,}" @click="showPwd()" style="fontsize: 1.2rem"></i>
                <transition>
                    <div v-show="showHint" class="pwd-hint">
                        <div class="textarea">Pick a password</div>
                        <ProgressBar :value="progressRate" :showValue="false" :class="{ safecolor: activeColor, color: middle }"/>
                        <div>{{ pwdHint }}</div>
                    </div>
                </transition>
                </div>
                <div class="input-group">
                    <input :type="typePwd" placeholder="請再次輸入密碼" class="register-input" required/>
                </div>
                <div class="input-group">
                    <button type="submit" class="registerBtn">註冊</button>
                </div>
            </form>
        </section>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Register",
    data() {
        return {
            spinActive: false,
            typePwd: "password",
            showHint: false,
            isActive: true,
            notActive: false,
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
            api: "register",
        };
    },
    methods: {
        registerForm() {
        console.log("submit");
        const data = {
            username: this.user.username,
            password: this.user.password,
            name: this.user.name,
            phone: this.user.phone,
        };
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        axios.post(`https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`,data,config)
            .then((response) => {
                if(response.data.msg==='帳號已有人註冊'){
                    this.repeatAccount = true
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
        focusPwd() {
            this.showHint = true;
        },
        pwdAuth() {
            var oValue = this.user.password;
            console.log("keyup!", oValue);
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

.pi {
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

.spinner-border {
    width: 22px;
    height: 22px;
}

.register-input{
    background: rgb(241, 241, 241);
    width: 500px;
    height: 50px;
    border: none;
    padding: 10px;
}

.register-input:focus{
    border-radius: 4px;
    border: 2px black solid;
}
    

.registerBtn{
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

.registerBtn:hover {
    background: black;
    color: #fff;
    cursor: pointer;
}

@media (max-width: 600px) {
    .register-form,.register-input,.registerBtn,.form-group,.pwd-hint{
        width: 90vw;
    }
}
</style>
