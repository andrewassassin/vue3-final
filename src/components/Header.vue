<template>
    <header class="header" :style="inlineBgImage(src)"/>
</template>
<script>
import {computed} from "vue";
import store from "@/store";
export default {
    setup(){
        const src = computed(()=>{
            return store.state.src;
        })
        // const src = ref("header1.jpg")
        function inlineBgImage(image) {
            let bgImage = require('@/assets/img/' + image)

            return {
                backgroundImage: `url("${bgImage}")`,
            }
        }

        return { inlineBgImage  , src}
    }
}
</script>
<style scoped>
.header{
    width: 100%;
    height: 600px;
    background-position: center;
    background-attachment:fixed;
    background-size: contain;
    background-repeat:no-repeat;
}

@media(max-width:900px){
    .header{
        height: 200px;
        background-size: cover;
        background-attachment:scroll;   
    }
}
</style>