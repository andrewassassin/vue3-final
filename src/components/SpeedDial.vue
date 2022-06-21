<template>
    <div v-click-outside="onClickOutside" class="p-d-flex p-ai-center work-bar p-pl-3">
        <Button @click.prevent="showup()" class="speeddial p-mr-2 p-button-outlined p-button-secondary">
                <i class="pi pi-plus" style="fontSize: 1.3rem;" :class="{rotate:isRotate}"></i>
        </Button>
        <transition-group name="show" tag="div" class="p-d-flex">
            <div v-for="(item,idx) in workbrench" v-show="animationList.indexOf(idx)!==-1" class=" p-mr-2" @click="functionLink(idx)" :key="idx" style="cursor:pointer;">
                <i class="pi round p-d-flex p-ai-center p-jc-center" :class="item.name" style="font-size: 1.5rem"></i>
            </div>
        </transition-group> 
    </div>
</template>
<script>
import { ref } from 'vue';
import CreatePrd from '@/views/CreatePrd'
import PrdManage from '@/views/PrdManage'
import { useRouter } from "vue-router";
export default {
    setup(){
        const isRotate = ref(false)
        const router = useRouter();
        const animationList = ref([])
        const workbrench = ref([
                {name:'pi-heart-fill'},{name:'pi-moon'},{name:'pi-github'},{name:'pi-facebook'},{name:'pi-google'}
            ])
            
        function showup(){
            isRotate.value =! isRotate.value
            if(animationList.value.length!==0){
                animationList.value.forEach((item,i)=>{
                    setTimeout(function() {
                        animationList.value.pop()
                    },i*40)
                })
            }else{
                for(let i = 0; i < 6; i++) {
                    setTimeout(function() {
                        animationList.value.push(i)
                    }, i*50 )
                }
            }
        }

        function onClickOutside(){
            isRotate.value = false
            animationList.value.forEach((item,i)=>{
                setTimeout(function() {
                    animationList.value.pop()
                },i*50)
            })
        }

        function functionLink(idx){
            switch(idx){
                case 0:
                    router.push({
                        path: `/CreatePrd`,
                        component: CreatePrd,
                    })  
                    break;
                case 1:
                    router.push({
                        path: `/PrdManage`,
                        component: PrdManage,
                    })  
                break;
            }
        }
        return{showup,onClickOutside,functionLink,isRotate,workbrench,animationList}
    }
}
</script>
<style scoped>
.show-enter-active,.show-leave-active {
    transition: all .3s ease;
}

.show-enter-from, .show-leave-to {
    transform: scale(0);
}

.show-enter-from{
    opacity: 0;
}

.round{
    border-radius: 50%;
    width: 45px;
    height: 45px;
    background: rgb(231, 231, 231);
    opacity: 1;
    transform: scale(1);
}

.work-bar{
    position: fixed;
    left: 40px;
    bottom: 50px;
    height: 100px;
}

.speeddial{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    opacity: .8;
}

.pi-plus{
    transition: all .3s ease;
}

.pi-plus.rotate {
    transform: rotateZ(45deg);
}

</style>