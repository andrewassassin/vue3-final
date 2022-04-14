<template>
    <header class="header" :style="inlineBgImage(src)">
        <div class="p-md-4 container">
            <div class="p-md-12 l-text">簡易攜帶，音質絕美，隨身享受音樂的沉浸感</div>
            <div class="p-md-12 t-text">便攜式喇叭</div>
        </div>
    </header>
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