<template>
    <div class="infoPage">
        <div class="p-md-8">
            <div class="textHello p-mb-3 p-d-flex p-flex-wrap p-ai-center">
                HELLO, {{userFromVuex.first_name}}
                <div class="p-md-2 p-col-12">
                    <Button @click.prevent="logOut" label="登出"  class="p-ml-3 p-md-4 p-col-10 p-button-info"/>
                </div>
            </div>
            <TabMenu v-if="!isMobile" :model="items" class="p-md-6 p-sm-12"/>
            <div v-else class="p-d-flex p-flex-wrap p-jc-start">
                <div v-for="item in items" :key="item" class="infoBar p-col-12">
                    <label @click="herfContent" for="">{{item.label}}</label>
                </div>
            </div>
            <router-view class="infoContent" :class="{show:showContent}"></router-view>
        </div>
    </div>
</template>
<script>
import Login from '@/views/Login'
import { ref,onMounted,computed } from 'vue';
import store from "@/store";
import { useRouter } from "vue-router";
export default {
    setup () {
        const router = useRouter();
        const logOutText = ref('編輯')
        const isShowLogOut = ref(false)
        const spinActive = ref(false)
        const showContent = ref(false)
        const items = ref([
            {
                label: '帳戶詳細資料',
                icon: 'pi pi-fw pi-user-edit',
                to: '/userinfo/info'
            },
            {
                label: '訂單紀錄',
                icon: 'pi pi-fw pi-shopping-bag',
                to: '/userinfo/Payment'
            },
            {
                label: '預設地址',
                icon: 'pi pi-fw pi-home',
                to: '/edit'
            },
            {
                label: '近期瀏覽紀錄',
                icon: 'pi pi-fw pi-list',
                to: '/documentation'
            },
        ]);

        const userFromVuex = computed(()=>{
            return store.state.user;
        })

        const isMobile = computed(()=>{
            if (screen.width <= 900) {
                return true
            }else {
                return false
            }
        })

        onMounted(()=>{
            if(Object.entries(userFromVuex).length !==0){
                isShowLogOut.value = true
            }else{
                isShowLogOut.value = false
            }
        })

        function herfContent(){
            showContent.value = true
        }

        function logOut(){
            spinActive.value = true
            logOutText.value = ''
            setTimeout(() => {
                store.commit("user",{});
                localStorage.setItem('user', "")
                store.dispatch("DataGetCart");
                router.push({
                    path: `/login`,
                    component: Login,
                })  
            }, 1000);   
        }
        return {logOutText, isShowLogOut, showContent, spinActive,items,userFromVuex,isMobile, logOut,herfContent}
    }
}
</script>
<style scoped>
.infoContent{
    position: relative;        
}

.infoPage{
    display: flex;
    margin: 200px 50px 0 0;
    justify-content: center;
    align-items: center;
}

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

.textHello{
    font-size: 35px;
    text-align: left;
}

@media(max-width:900px){
    .infoPage{
        margin: 130px 0 50px 0;
        justify-content: start;
    }

    .infoContent{
        position: relative;
        top: -150px;
        left: 900px;
        height: 300px;
        transition: all .3s ease;
        background:white;
    }

    .infoContent.show{
        left: 0;
    }

    .infoBar{
        text-align: left;
    }

}
</style>