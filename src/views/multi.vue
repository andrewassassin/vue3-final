<template>
    <section class="p-d-flex p-jc-center">
        <div class="content">
            <div class="mid">
                <transition-group 
                :name="transType"
                @after-leave="afterLeave"
                >
                    <img 
                        v-for="(item, idx) in slidList" 
                        v-show="imgIdx === idx" 
                        :key="item.id" 
                        :src="item.src"
                    />
                </transition-group>
            </div>
            <div class="nav_menu">
                <a class="aaa"
                    v-for="(item, idx) in slidList"
                    :key="item.id"
                    :class="{active: imgIdx === idx}"
                    @click="handleMenuActive(idx)"
                >
                {{idx + 1}}
                </a>
            </div>
        </div>
    </section>
</template>
<script>
import { ref } from 'vue'
export default {
    setup(){
        const imgIdx = ref(0);
        const prevIdx = ref(0);
        const transType = ref("right");

        const slidList = ref([
            { id: '1', src: "https://source.unsplash.com/600x400?1" },
            { id: '2', src: "https://source.unsplash.com/600x400?2" },
            { id: '3', src: "https://source.unsplash.com/600x400?3" },
            { id: '4', src: "https://source.unsplash.com/600x400?4" },
            { id: '5', src: "https://source.unsplash.com/600x400?5" },
            { id: '6', src: "https://source.unsplash.com/600x400?6" },
            { id: '7', src: "https://source.unsplash.com/600x400?7" },
            { id: '8', src: "https://source.unsplash.com/600x400?8" },
        ]);
        
        const handleMenuActive = idx => {
            imgIdx.value = idx;
            transType.value = idx > prevIdx.value ? "left" : "right";
        }
        
        const afterLeave = () => {
            prevIdx.value = imgIdx.value;
        }
        
        return {
            imgIdx,
            slidList,
            handleMenuActive,
            afterLeave,
            transType
        }
    }
};
</script>
<style scoped>
    .left-enter-active,
    .left-leave-active,
    .right-enter-active,
    .right-leave-active {
        transition: transform .3s ease;
    }
    
    .left-enter-from{
        transform: translateX(-550px);
    }
    .left-leave-to{
        transform: translateX(550px)
    }
    .right-enter-from{
        transform: translateX(550px)
    }
    .right-leave-to{
        transform: translateX(-550px);
    }


    .content {
      width: 600px;
      height: 900px;
    }

    .mid{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden; 
        margin-bottom: 20px;
    }

    img{
        position: absolute;
        top: 0;
        right: 0;
    }

    .nav_menu{
        text-align: center;
        background-color: rgb(58, 49, 49); 
        width: 600px;
        /* height: 500px; */
    }

    .aaa{
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin: 5px;
        line-height: 20px;
        /* margin-top: 100px; */
        /* background-color: white; */
    }
    

    .aaa.active{
        color:black;
        background-color: #40c297;
    }
</style>