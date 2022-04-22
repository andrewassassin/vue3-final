<template>
    <section id="introSection" class="p-d-flex p-ai-center p-jc-center p-flex-wrap" >
        <div class="top-sec" id="topSec">
            <div class="top-sec-img" :class="{show:showTop}">
                <img src="../assets/img/oberon-grille-closeup.jpg" alt="">
            </div>
            <div class="top-sec-text" :class="{show:showTop}">
                <h4>{{mainList[0].title}}</h4>
                <p>{{mainList[0].content}}</p>
            </div>
        </div>
        <div class="pro-sec" id="proSec">
            <div class="pro-sec-text" :class="{show:showPro}">
                <h4>{{mainList[1].title}}</h4>
                <p>{{mainList[1].content}}</p>
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
                <h4>{{mainList[0].title}}</h4>
                <p>{{mainList[0].content}}</p>
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
import { mainText } from "@/js/mainText.js";
import { ref, onMounted,onBeforeUnmount } from "vue";
export default {
    setup(){
        window.addEventListener("scroll", handleScroll);
        const mainList = ref(mainText)
        const showTop= ref(false)
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
        async function handleScroll(){
            console.log('scroll index')
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
        
        return{mainList,showTop,showPro}
    }
}
</script>
<style scoped>
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
    font-family: 'Segoe UI','Arial',Charcoal,'Helvetica', 'sans-serif';
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
    transition-delay: .3s;
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
    font-family:'Segoe UI','Arial',Charcoal,'Helvetica', 'sans-serif';
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
    transition-delay: .3s;
}

.top-sec-text{
    position: relative;
    left: 50%;
    transform: translateX(-100%);
    opacity: 0;
    color: rgb(0, 0, 0);
    margin-right: 200px;
    font-family: 'Segoe UI','Arial',Charcoal,'Helvetica', 'sans-serif';
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
    text-align: left;
}
</style>