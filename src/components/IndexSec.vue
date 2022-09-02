<template>
    <section class="p-d-flex p-ai-center p-jc-center p-flex-wrap p-mt-0" >
        <div class="top-sec" id="topSec">
            <div class="top-sec-img" :class="{bigsize:showTop}">
                <div class="shadow" :class="{bigsize:showTop}" ></div>
                <div class="shadow-ring" :class="{bigsize:showTop}" ></div>
                <img src="../assets/img/oberon-grille-closeup.jpg" alt="">
            </div>
            <div class="top-sec-text" :class="{show:showTop}">
                <h4>{{mainList[0].title}}</h4>
                <p>{{mainList[0].content}}</p>
            </div>
        </div>
        <div class="pro-sec" id="proSec">
            <div class="pro-sec-img" :class="{show:showPro}">
                <img src="../assets/img/pro-sec-img.jpg" alt="">
            </div>
            <div class="pro-sec-text" :class="{show:showPro}">
                <h4>{{mainList[1].title}}</h4>
                <p>{{mainList[1].content}}</p>
            </div>
        </div>
        <div class="ad-sec" id="adSec">
            <div class="ad-sec-img" :class="{show:showAd}">
                <img src="../assets/img/cabinet-design.jpg" alt="">
            </div>
            <div class="ad-sec-text" :class="{show:showAd}">
                <h4>{{mainList[0].title}}</h4>
                <p>{{mainList[0].content}}</p>
            </div>
        </div>
    </section>
</template>
<script>
import { mainText } from "@/js/mainText.js";
import { ref, onMounted,onBeforeUnmount,computed } from "vue";
export default {
    setup(){
        window.addEventListener("scroll", handleScroll);
        const mainList = ref(mainText)
        const showTop= ref(false)
        const showPro = ref(false)
        const showAd = ref(false)
        const position = ref([
            {
                name:'topsec',
                top:Number,
                btm:Number,
                offHeight:Number,
            },
            {
                name:'prosec',
                top:Number,
                btm:Number,
                offHeight:Number,
            },
            {
                name:'adsec',
                top:Number,
                btm:Number,
                offHeight:Number,
            }
        ])
        const isMobile = computed(()=>{
            return screen.width <= 900 ?  true : false
        })
        async function handleScroll(){
            let st = window.scrollY
            const slideInAt = (window.scrollY + window.innerHeight) 
            if (slideInAt> position.value[0].top + position.value[0].offHeight && st<position.value[0].btm) { 
                showTop.value = true
            } else {
                showTop.value = false
            }
            if (slideInAt> position.value[1].top + position.value[1].offHeight && st<position.value[1].btm) {
                showPro.value = true
            } else {
                showPro.value = false
            }
            if (slideInAt> position.value[2].top + position.value[2].offHeight && st<position.value[2].btm) {
                showAd.value = true
            } else {
                showAd.value = false
            }
        }

        function animation(idName,idx){
            const item =  document.getElementById(idName)
            position.value[idx].top = item.offsetTop
            position.value[idx].btm = position.value[idx].top + item.offsetHeight;
            position.value[idx].offHeight = item.offsetHeight/ 2
        }

        onMounted(()=>{
            animation('topSec',0)
            animation('proSec',1)
            animation('adSec',2)
        })

        onBeforeUnmount(()=>{
            window.removeEventListener("scroll", handleScroll)
        })
        
        return{mainList,showTop,showPro,showAd,isMobile}
    }
}
</script>
<style scoped src="../assets/styles/indexSec.css"></style>
<style scoped>
@media (min-width: 760px) and (max-width: 991px){
    .top-sec,.ad-sec,.pro-sec{
        justify-content: center;
        height: 800px;
    }
}
@media(max-width:760px){
    .top-sec,.ad-sec,.pro-sec{
        display: flex;
        justify-content: center;
        height: auto;
    }

    .ad-sec-text,.top-sec-text,.pro-sec-text{
        width: 80%;
    }

    .top-sec-text.show,.ad-sec-text.show,.pro-sec-text.show{
        transform: translateX(0%);
    }

    .top-sec-img{
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
    .top-sec-img img{
        transform: translateX(0%);
        max-width: 240px;
        height: 230px;
    }
    .pro-sec-img img{
        max-width: 100%;
    }
    .pro-sec-img.show img, .ad-sec-img.show img{
        transform: translateX(0%);
    }
    .shadow,.shadow-ring{
        transform: translateX(0%);
        max-width: 255px;
        height: 250px;
        border: rgba(238, 238, 238, 1) solid 70px;
    }

    .shadow-ring.bigsize{
        transition-delay: .2s;
        max-width: 120px;
        height: 120px;
        border: rgba(238, 238, 238, 0.83) solid 20px;
        transform: translateX(-90%);
    }
}
</style>