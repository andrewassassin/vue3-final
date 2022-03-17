<template>
    <header v-if="show" class="header" :style="inlineBgImage(src)"/>
</template>
<script>
import {computed,ref,watch} from "vue";
import store from "@/store";
import {useRoute} from 'vue-router'
export default {
    props:{
        showHeader:Boolean
    },
    setup(props){
        const show = ref(true)
        const route =useRoute();
        const src = computed(()=>{
            return store.state.src;
        })
        // show.value=store.state.showHeader
        
        watch(() => props.showHeader,
			val => {
                show.value = val;
			}
		);

        watch(route, function (newVal) {
            newVal.name ==='Index' ? show.value = false : show.value = true
        });

        function inlineBgImage(image) {
            let bgImage = require('@/assets/img/' + image)

            return {
                backgroundImage: `url("${bgImage}")`,
            }
        }

        return { inlineBgImage  , src,show}
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