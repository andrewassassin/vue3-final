<template>
    <div class="p-my-5 p-d-flex p-jc-center p-ai-center" >
        <div class="p-md-8">
            <div class="p-text-left textHello p-mb-3">HELLO, {{userFromVuex.name}}</div>
            <TabMenu :model="items" />
            <router-view></router-view>
        </div>
        <div class="">
            <Button @click.prevent="logOut" label="登出"  class="p-ml-3"/>
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

        onMounted(()=>{
            if(Object.entries(userFromVuex).length !==0){
                isShowLogOut.value = true
            }else{
                isShowLogOut.value = false
            }
        })

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
        return {logOutText, isShowLogOut, spinActive,items,userFromVuex,logOut}
    }
}
</script>
<style scoped>
.left-menu{
    position: fixed;
    left: 400px;
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
    font-size: 40px;
}
</style>