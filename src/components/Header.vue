<template>
    <header class="header" :style="inlineBgImage(src)">
        <div class="p-md-4 container">
            <div class="p-md-12 l-text">{{headerText}}</div>
            <div class="p-md-12 t-text">{{headerTitle}}</div>
        </div>
    </header>
</template>
<script>
import {computed,ref,onMounted,watch} from "vue";
import { navBarList } from "@/js/navList.js";
import store from "@/store";
export default {
    setup(){
        const show = ref(true)
        const headerTitle = ref('')
        const headerText = ref('')
        const navList = ref(navBarList)
        const idx = computed(()=>{
            return store.state.headerIdx;
        })
        const src = computed(()=>{
            return store.state.src;
        })
        onMounted(()=>{
            console.log(' navList[list].title',navList.value[store.state.headerIdx])
            headerTitle.value = navList.value[store.state.headerIdx].title
            headerText.value = navList.value[store.state.headerIdx].text
        })
        function inlineBgImage(image) {
            let bgImage = require('@/assets/img/' + image)
            return {
                backgroundImage: `url("${bgImage}")`,
            }
        }

        watch(idx,function(newval){
            headerTitle.value = navList.value[newval].title
            headerText.value = navList.value[newval].text
        })

        return { inlineBgImage  , src, show,headerTitle,headerText}
    }
}
</script>
<style scoped>
.header{
    width: 100%;
    padding: 70px 150px;
    height: 87vh;
    position: relative;
    background-position: center;
    /* background-attachment:fixed; */
    background-size: cover;
    background-repeat:no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container{
    top: 60px;
    position: relative;
    z-index: 3;
    color: white;
}

.header:after {
    content: "";
    background: rgb(0, 0, 0);
    opacity: .3;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    transition: all .3s ease;
}

.l-text{
    font-size: 24px;
}

.t-text{
    font-size: 40px;
    font-weight: bold;
}

@media(max-width:900px){
    .header{
        padding: 70px 0px;
        height: 80vh;
        background-attachment:scroll;   
    }
}
</style>