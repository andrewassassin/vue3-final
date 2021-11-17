<template >
  <section id="introSection" class="row" >
    <div class="img-head">
      <img src="" class="col-md-12 mb-2 px-0" alt="">
      <button @click="scroll()" class="mt-2 mb-5 btn btn-info">往下</button>
    </div>
     <div class="slide" id="slide">
      <div class="slide-item">
        <transition-group :name="transitionSwiper" tag="ul" class="slide-list">
          <li v-for="(item,index) in slideData" :key="item.id">                   
              <img :src="require(`../assets/img/${item.image}`)" :id="`${index}`" alt="">    
              <p class="">{{item.name}}</p> 
              <p class="money">TWD$ <span class="badge">{{item.price}}</span></p>   
          </li>
        </transition-group>
      </div>
      <div class="slide-ctrl">
        <i v-if="prevBtn" @click="slideCtrl(1)" class="slide-prev pi pi-angle-double-left" style="fontSize: 2rem" type="button"></i>
        <i v-if="nextBtn" @click="slideCtrl(-1)" class="slide-next pi pi-angle-double-right" style="fontSize: 2rem" type="button"></i>
      </div>
    </div>
    <div class="top-sec">
      <div class="top-sec-img">
        <img src="../assets/img/oberon-grille-closeup.jpg" alt="">
      </div>
      <div class="top-sec-text">
        <h4>CABINET DESIGN</h4>
        <p>The rigid cabinet construction is important to optimize the working environment for both woofers and tweeter. The organically shaped design increases overall rigidity and severely reduces cabinet resonances. Furthermore standing waves are practically eliminated as there are no parallel surfaces reflecting sound waves. The EPICON cabinet consists of real wood veneer which is lacquered of a total of 10 times. Each layer is hand polished to ensure a deep, high gloss and elegant surface. 10 times of lacquer also ensures a sturdy finish with a thickness of almost 2 mm.</p>
      </div>
    </div>
    <div class="pro-sec">
      <div class="pro-sec-text">
        <h4>A SPEAKER FOR EVERY USE</h4>
        <p>The OBERON series presents a ‘speaker for every use’ line-up of models. With two compact stand-mounts, an on-wall, two floor-standing and a centre channel, the OBERON range has something for every need. Every speaker model is perfect for stereo use and is able to fill everything from small apartments to large living rooms with high-quality sound.</p>
      </div>
      <div class="pro-sec-img">
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
import axios from 'axios'
import { ref, onMounted } from "vue";
export default {
  setup(){
    const slideData = ref([]);
    const shiftItem = ref([]);
    const timer = ref({});
    const clickWait = ref(false);
    const prevBtn = ref(false);
    const nextBtn = ref(true);
    const transitionSwiper = ref("");
    const count = ref("");
    const api = ref("tab2");
  
    onMounted(async()=>{
      const count = "0"
       await axios.post(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`,count)
          .then(response => {
            console.log('response',response)
              response.data.forEach(element => {
                element.image = JSON.parse(element.image)[1]
                slideData.value.push(element)
              }); 
          })
          .catch(error => {
            console.log('err',error);
          });
    })

    function scroll(){
       document.getElementById('slide').scrollIntoView({
  behavior: "smooth",
  block: "center",
  inline: "nearest",
});
    }

    function setTime(){
      timer.value = setTimeout(() => {
            clickWait.value = false;
          }, 500);
    }

    function stopTime(){
      window.clearInterval(timer);
    }

    async function slideCtrl(slidesToShow=1){
        if (clickWait.value) {
            return;
          }
          stopTime();
          clickWait.value = true;
          if (slidesToShow > 0) {
              prevBtn.value = false 
              nextBtn.value = true  
              transitionSwiper.value="slidePrev"
              // 移除最後一個
              slideData.value =[...shiftItem.value,...slideData.value]
              slideData.value.splice(-5);
              setTime();
              return;
          }
          if (slidesToShow < 0) {  
              prevBtn.value = true 
              nextBtn.value= false   
              transitionSwiper.value="slide" 
              count.value="5"
              await axios.post(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`,count.value)
                .then(response => {
                    response.data.forEach(element => {
                      element.image = JSON.parse(element.image)[1]
                      slideData.value.push(element)
                    }); 
                })
                .catch(error => {
                  console.log('err',error);
                });
              shiftItem.value = slideData.value.splice(0,5)
              setTime();
              return;
          }
    }
     return {
      clickWait,
      timer,
      slideData,
      shiftItem,
      count,
      transitionSwiper,
      prevBtn,
      nextBtn,
      slideCtrl,
      stopTime,
      setTime,
      scroll,
      api
      }
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
  font-family: 'Helvetica', sans-serif;
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
  flex: 0 0 35%;
  align-items: center;
  margin-left:160px ;
}

.pro-sec-img img{
  max-width: 100%;
  height: auto;
  padding: 180px;
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
}

.top-sec-text{
  position: relative;
  color: rgb(0, 0, 0);
  margin-right: 200px;
  font-family: 'Helvetica', sans-serif;
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




#introSection{
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
}

ul {
  list-style-type: none;
  padding: 0;
}

.slide-prev,
.slide-next {
  position: relative;
  width: 25px;
  height: 25px;
  display: inline-block;
  border-radius: 50%;
  cursor: pointer;
  transition: .2s ease;
  transform: scale(.8);
}


.slide-prev{
  position: relative;
  right:55%;
  bottom:240px;

}

.slide-next{
  position: relative;
  left: 60%;
  bottom: 240px;
}

.slide-prev:hover,
.slide-next:hover {
  transform: scale(1);
}
/* slide */
.slide-item{
  width:900px;
  height: 363px;
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
}

.slide-list {
  /* position: relative; */
  display: flex;
  padding: 5px 0px;
  height: 2000px;
}
.slide-list li {
  /* display: inline-block; */
  /* position: relative; */
  flex: 1 0 0;
  left:calc(-100% /260 * 5);
  margin: 15px;
  
}

.slide-list img{
  width: 150px;
  height: 150px;
}

/* .flip-list-move {
  transition: transform 0.6s;
} */

.slide-leave-active,
.slide-enter-active,
.slidePrev-leave-active,
.slidePrev-enter-active{
  transition:all .5s;
  /* position: absolute; */
}

.slidePrev-leave-to{
  transform: translate(-1000%, 0);
}
/* 
.slidePrev-leave{
  transform: translate(2000%, 0);
} */


.slide-leave-to {
  transform: translate(1000%, 0);
}

/* .slide-move,
.slidePrev-move{
   transition:all .3s;
} */

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
</style>