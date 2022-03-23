<template>
    <div class="p-d-flex">
        <section class="p-md-7 p-d-flex section">
            <div class="p-md-3"></div>
            <form class="p-text-left p-md-9 p-jc-end cForm">
                <div class="p-d-flex p-ai-center">
                    <label class="p-md-2 p-text-bold">聯絡</label>
                    <label v-if="changeInfo">{{user.username}}</label>
                </div>
                <div class="p-d-flex p-ai-center userData">
                    <label class="p-md-2 p-text-bold">電話</label>
                    <label v-if="changeInfo">{{user.phone}}</label>
                </div>
                <div class="p-d-flex p-ai-center userData">
                    <label class="p-md-2 p-text-bold">名字</label>
                    <label v-if="changeInfo">{{user.first_name}}</label>
                </div>
            </form>
        </section>
        <aside class="p-md-5 aside">
            
        </aside>
    </div>
</template>
<script>
import { ref,computed, onMounted } from 'vue';
import store from "@/store";
  export default {
    setup () {
        const changeInfo = ref(true)
        const user = computed(()=>{
            return store.state.user;
        })
        onMounted(()=>{
            console.log('store list',store.state.orderList)
        })
        function editInfo(){
            changeInfo.value = false
        }
        function saveInfo(){
            // localStorage.setItem('user', JSON.stringify(user))
            changeInfo.value = true
        }

        return {
            changeInfo,user,editInfo,saveInfo
        }
    }
}
</script>
<style scoped>
.cForm{
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    width: 60%;
}

.section{
    background: white;
    height: 100%;
}

.aside{
    position: relative;
    border-left: 1px solid rgb(204, 203, 203) ;
    height: 100vh;
    background: rgb(245, 245, 245);
}

.userData{
    display: flex;
    align-items: center;
    border-top: 1px solid #d9d9d9;
}
</style>