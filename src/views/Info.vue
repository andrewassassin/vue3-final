<template>
    <div class="p-mt-2 p-d-flex p-flex-wrap">
        <form class="p-text-left p-md-12">
            <div class="p-d-flex p-ai-center userData">
                <label class="p-md-2 p-mb-3 p-text-bold">EMAIL</label>
                <label v-if="changeInfo" class="p-mb-3">{{user.username}}</label>
                <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12 p-mb-3" v-model="user.username" placeholder="" type="text" />
            </div>
            <div class="p-d-flex p-ai-center userData">
                <label class="p-md-2 p-mb-3 p-text-bold">電話</label>
                <label v-if="changeInfo" class="p-mb-3">{{user.phone}}</label>
                <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12 p-mb-3" v-model="user.phone" type="text" />
            </div>
            <div class="p-d-flex p-ai-center userData">
                <label class="p-md-2 p-mb-3 p-text-bold">名字</label>
                <label v-if="changeInfo" class="p-mb-3">{{user.name}}</label>
                <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12 p-mb-3" v-model="user.name" placeholder="" type="text" />
            </div>
            <div class="p-d-flex p-ai-center userData">
                <label class="p-md-2 p-mb-3 p-text-bold">姓氏</label>
                <label v-if="changeInfo" class="p-mb-3">{{user.name}}</label>
                <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12 p-mb-3" v-model="user.name" placeholder="" type="text" />
            </div>
            <div class="p-d-flex p-ai-center userData">
                <label class="p-md-2 p-mb-3 p-text-bold">生日</label>
                <label v-if="changeInfo" class="p-mb-3">{{user.phone}}</label>
                <InputText :style="(changeInfo?'display:none;':'display:block;')" class="p-md-12 p-mb-3" v-model="user.phone" type="text" />
            </div>
            <button type="submit" class="general-btn" @click.prevent="changeInfo?editInfo():saveInfo()">
                {{changeInfo?'編輯':'儲存'}}
            </button>
        </form>
    </div>
</template>
<script>
import { ref,computed } from 'vue';
import store from "@/store";
  export default {
    setup () {
        const changeInfo = ref(true)
        const user = computed(()=>{
            return store.state.user;
        })
        function editInfo(){
            changeInfo.value = false
        }
        function saveInfo(){
            localStorage.setItem('user', JSON.stringify(user))
            changeInfo.value=true
        }
        return {
            changeInfo,user,editInfo,saveInfo
        }
    }
}
</script>
<style scoped>
.general-btn{
    width: 500px;
    height: 50px;
}

.userData{
    margin: 20px 0;
    border-bottom: 1px solid rgb(233, 233, 233);
}
</style>