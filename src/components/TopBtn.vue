<template>
    <button v-if="showTop" @click="clickTop" class="top-btn">
        <i class="pi pi-angle-up" style="fontSize: 1.3rem;color:white;"></i>
    </button>
</template>
<script>
import { ref, onMounted } from 'vue';
export default {
    setup(){
        const showTop = ref(false)

        function topFunction() {
            let st = window.scrollY
            st > 500 ? showTop.value = true : showTop.value = false
        }

        function clickTop(){
            scrollTo(0, 0);
        }

        onMounted(() => {
            window.addEventListener("scroll", topFunction);
        })

        return{showTop,topFunction,clickTop}

    }
}
</script>
<style scoped>

</style>