<template>
    <header class="header" :style="inlineBgImage(src)"/>
</template>
<script>
import {computed,ref} from "vue";
import store from "@/store";
export default {
    setup(){
        const show = ref(true)
        const src = computed(()=>{
            return store.state.src;
        })

        function inlineBgImage(image) {
            let bgImage = require('@/assets/img/' + image)
            return {
                backgroundImage: `url("${bgImage}")`,
            }
        }

        return { inlineBgImage  , src, show}
    }
}
</script>
<style scoped>
.header{
    width: 100%;
    height: 85vh;
    background-position: center;
    background-attachment:fixed;
    background-size: contain;
    background-repeat:no-repeat;
}

@media(max-width:900px){
    .header{
        height: 600px;
        background-size: cover;
        background-attachment:scroll;   
    }
}
</style>