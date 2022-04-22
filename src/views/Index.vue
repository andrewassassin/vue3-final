<template >
    <div>
        <Carousel :autoplay="3000" :wrap-around="true" id="carou">
            <Slide v-for="item in imgItem" :key="item" >
                <div class="carousel__item p-d-flex p-flex-wrap p-jc-center p-ai-center lazy"  :data-src="inlineBgImage(item.bgi)">
                    <div class="p-md-4 container">
                        <div class="p-md-12"><h3>{{item.title}}</h3></div>
                        <div class="p-md-12">{{item.text}}</div>
                        <div class="p-md-12"><button class="mainBtn">探索更多</button></div>
                    </div>
                </div>
            </Slide>
            <template #addons>
                <Pagination />
            </template>
        </Carousel>
    </div>
    <IndexSec/>
</template>
<script>
// import axios from 'axios'
import IndexSec from '@/components/IndexSec'
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { onMounted, ref } from "vue";
export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        IndexSec
    },
    setup(){
        const imgItem = ref([
            {
                title:'What Hi-Fi? Awards 2021',
                text:'年度產品大獎',
                bgi:'carousel-1.jpg'
            },{
                title:'DALI OPTICON2',
                text:'',
                bgi:'carousel-2.jpg'
            },{
                title:'KLIPSCH THE FIVES',
                text:'',
                bgi:'carousel-3.jpg'
            }])

        onMounted(()=>{
            const optionsTwo = {
                root: document.getElementById('carou'),
                rootMargin: "100% 0px 100% 0px",
                threshold: 0.01
            }
            const watcher = new IntersectionObserver(onEnterView, optionsTwo)
            let lazyImages= document.querySelectorAll('.lazy')
            for (let image of lazyImages) {
                watcher.observe(image) // 開始監視
            }
        })

        function onEnterView(entries, observer) {
            for (let entry of entries) {
                if (entry.isIntersecting) {
                    // 監視目標進入畫面
                    const img = entry.target
                    img.setAttribute('style', `${img.dataset.src}`) // 把值塞回 src
                    img.removeAttribute('data-src')
                    observer.unobserve(img) // 取消監視
                }
            }
        }

        function inlineBgImage(image) {
            let bgImage = require('@/assets/img/' + image)
            return `background-image: url("${bgImage}")`
            
        }

        return {inlineBgImage,imgItem}
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

.carousel__item {
    min-height: 200px;
    width: 100%;
    height: 100vh;
    color:  var(--vc-clr-white);
    font-size: 20px;
    font-family: Charcoal;
    border-radius: 8px;
    position: relative;
    background-position: center;
    background-attachment:fixed;
    background-size: cover;
    background-repeat:no-repeat;
}

.container{
    position: relative;
    z-index: 3;
}

.carousel__item:after {
    content: "";
    background: rgb(0, 0, 0);
    opacity: .5;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 2;
    transition: all .3s ease;
}

.mainBtn{
    background: transparent;
    color: white;
    border: 1px solid rgb(243, 243, 243);
    padding: 14px 40px;
    font-size: 16px;
}

::v-deep(.carousel__pagination-button){
    display: none;
}

@media (max-width: 900px) {

}
</style>
