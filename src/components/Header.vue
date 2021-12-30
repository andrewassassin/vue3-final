<template>
    <header class="header" :style="inlineBgImage(src)">

    </header>
</template>
<script>
import { ref} from "vue";
// import store from "@/store";
export default {
    setup(){
        // const src = computed(()=>{
        // // 監聽購物車商品數量
        //     return store.state.src;
        // })
        const src = ref("header1.jpg")
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
    background-size: cover;
    background-repeat:no-repeat;
}

@media(max-width:600px){
    .header{
        height: 400px;
    }
}
</style>