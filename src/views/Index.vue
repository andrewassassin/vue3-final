<template >
    <div>
        <Carousel :autoplay="3000" :wrap-around="true">
            <Slide v-for="item in imgItem" :key="item">
                <div class="carousel__item" :style="inlineBgImage(item.bgi)">
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
    <section id="introSection" class="p-d-flex p-ai-center p-jc-center p-flex-wrap" >
        <div class="top-sec" id="topSec">
            <div class="top-sec-img" :class="{show:showTopImg}">
                <img src="../assets/img/oberon-grille-closeup.jpg" alt="">
            </div>
            <div class="top-sec-text" :class="{show:showTopText}">
                <h4>CABINET DESIGN</h4>
                <p>The rigid cabinet construction is important to optimize the working environment for both woofers and tweeter. The organically shaped design increases overall rigidity and severely reduces cabinet resonances. Furthermore standing waves are practically eliminated as there are no parallel surfaces reflecting sound waves. The EPICON cabinet consists of real wood veneer which is lacquered of a total of 10 times. Each layer is hand polished to ensure a deep, high gloss and elegant surface. 10 times of lacquer also ensures a sturdy finish with a thickness of almost 2 mm.</p>
            </div>
        </div>
        <div class="pro-sec" id="proSec">
            <div class="pro-sec-text" :class="{show:showPro}">
                <h4>A SPEAKER FOR EVERY USE</h4>
                <p>The OBERON series presents a ‘speaker for every use’ line-up of models. With two compact stand-mounts, an on-wall, two floor-standing and a centre channel, the OBERON range has something for every need. Every speaker model is perfect for stereo use and is able to fill everything from small apartments to large living rooms with high-quality sound.</p>
            </div>
            <div class="pro-sec-img" :class="{show:showPro}">
                <img src="../assets/img/pro-sec-img.jpg" alt="">
            </div>
        </div>
        <div class="ad-sec">
            <div class="ad-sec-img">
                <img src="../assets/img/cabinet-design.jpg" alt="">
            </div>
            <div class="ad-sec-text">
                <h4>CABINET DESIGN</h4>
                <p>The rigid cabinet construction is important to optimize the working environment for both woofers and tweeter. The organically shaped design increases overall rigidity and severely reduces cabinet resonances. Furthermore standing waves are practically eliminated as there are no parallel surfaces reflecting sound waves. The EPICON cabinet consists of real wood veneer which is lacquered of a total of 10 times. Each layer is hand polished to ensure a deep, high gloss and elegant surface. 10 times of lacquer also ensures a sturdy finish with a thickness of almost 2 mm.</p>
            </div>
        </div>
        <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br> debitis? Non ratione porro excepturi autem debitis distinctio rerum id, inventore, quisquam quibusdam itaque nam voluptas eos hic pariatur at. Veniam.</p>
        </div>
        <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br> debitis? Non ratione porro excepturi autem debitis distinctio rerum id, inventore, quisquam quibusdam itaque nam voluptas eos hic pariatur at. Veniam.</p>
        </div>
    </section>
</template>

<script>
// import axios from 'axios'
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { ref, onMounted,onBeforeUnmount } from "vue";
export default {
    components: {
        Carousel,
        Slide,
        Pagination,
    },
    setup(){
        window.addEventListener("scroll", handleScroll);
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

        const showTopImg = ref(false)
        const showTopText= ref(false)
        const showPro = ref(false)
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
                offHeight:Number
            }
        ])

        function inlineBgImage(image) {
            let bgImage = require('@/assets/img/' + image)

            return {
                backgroundImage: `url("${bgImage}")`,
            }
        }

        function handleScroll(){
            let st = window.scrollY
            const slideInAt = (window.scrollY + window.innerHeight) 
            if (slideInAt> position.value[0].top + position.value[0].offHeight && st<position.value[0].btm) { 
                showTopText.value = true
                setTimeout(function() {
                    showTopImg.value = true
                },400)
            } else {
                showTopImg.value = false
                showTopText.value = false
            }
            if (slideInAt> position.value[1].top + position.value[1].offHeight && st<position.value[1].btm) {
                showPro.value = true
            } else {
                showPro.value = false
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
        })

        onBeforeUnmount(()=>{
            window.removeEventListener("scroll", handleScroll)
        })
        
        return {inlineBgImage,imgItem,showTopImg,showTopText,showPro}
    }
}
</script>

<style scoped>
.img-head{
    overflow: hidden;
    width: 100%;
}

.img-head img{
    height: 85vh;
}

.ad-sec{
    display: flex;
    width: 100%;
    height: 600px;
    background: black;
    align-items: center;
}

.ad-sec-img{
    display: flex;
    flex: 0 0 50%;
    align-items: center;
    /* justify-content: center; */
}

.ad-sec-img img{
    max-width: 100%;
    height: auto;
    padding: 150px;
}

.ad-sec-text{
    position: relative;
    color: aliceblue;
    margin-right: 200px;
    font-family: 'Courier New','Helvetica', sans-serif;
}

.ad-sec h4 {
    font-weight: 900;
}

.ad-sec p{
    margin-top:18px ;
    word-wrap: break-word;
    /* display: block; */
    text-align: left;
}

.pro-sec{
    display: flex;
    width: 100%;
    height: 600px;
    background: rgb(255, 255, 255);
    align-items: center;
    margin: 50px 0;
}

.pro-sec-text{
    position: relative;
    left: 50%;
    transform: translateX(-140%);
    opacity: 0;
    flex: 0 0 35%;
    align-items: center;
    margin-left:160px ;
    transition: all .5s ease-in;
}


.pro-sec-text.show{
    opacity: 1;
    transform: translateX(-135%);
}

.pro-sec-img img{
    position: relative;
    left: 50%;
    transform: translateX(-40%);
    opacity: 0;
    max-width: 100%;
    height: auto;
    padding: 180px;
    transition: all .5s ease-in;
}

.pro-sec-img.show img{
    opacity: 1;
    transform: translateX(-45%);
}


.pro-sec h4 {
    font-weight: 900;
}

.pro-sec p{
    margin-top:18px ;
    word-wrap: break-word;
    /* display: block; */
    text-align: left;
    font-weight: 500;
    line-height:1.5; 
    font-family: 'Arial',Charcoal,'Helvetica', 'sans-serif';
}


.top-sec{
    display: flex;
    width: 100%;
    height: 600px;
    background: rgba(238, 238, 238, 0.863);
    align-items: center;
    margin: 20px 0;
}

.top-sec-img{
    display: flex;
    flex: 0 0 50%;
    align-items: center;
    /* justify-content: center; */
}

.top-sec-img img{
    max-width: 100%;
    height: auto;
    padding: 150px;
    position: relative;
    opacity: 0;
    left: 50%;
    transform: translateX(-55%);
    transition: all .5s ease-in;
}

.top-sec-img.show img{
    opacity: 1;
    transform: translateX(-50%);
}

.top-sec-text{
    position: relative;
    left: 50%;
    transform: translateX(-100%);
    opacity: 0;
    color: rgb(0, 0, 0);
    margin-right: 200px;
    font-family: 'Arial',Charcoal,'Helvetica', 'sans-serif';
    line-height:1.5; 
    transition: all .5s ease-in;
}

.top-sec-text.show{
    opacity: 1;
    transform: translateX(-110%);
}

.top-sec h4 {
    font-weight: 900;
}



.top-sec p{
    margin-top:18px ;
    word-wrap: break-word;
    /* display: block; */
    text-align: left;
}


ul {
    list-style-type: none;
    padding: 0;
}


.money{
    color: rgb(248, 7, 7);
    font-size: 12px;
    font-weight:bold;
}

.badge{
    color: rgb(248, 7, 7);
    display:inline;
    vertical-align:baseline ; 
    font-size: 18px;
}

.carousel__item {
    min-height: 200px;
    width: 100%;
    height: 100vh;
    color:  var(--vc-clr-white);
    font-size: 20px;
    font-family: Charcoal;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
