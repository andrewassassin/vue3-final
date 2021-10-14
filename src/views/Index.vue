
<template >
  <section id="introSection" >
    <div class="slide">
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
        <div v-if="prevBtn" class="slide-prev" @click="slideCtrl(1)"><i class="fas fa-angle-double-left"></i></div>
        <div v-if="nextBtn" class="slide-next" @click="slideCtrl(-1)"><i class="fas fa-angle-double-right"></i></div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from "vue";
export default {
  data(){
    return{

    }
  },
  setup(){
    const slideData = ref([]);
    const shiftItem = ref([]);
    const timer = ref({});
    const clickWait = ref(false);
    const prevBtn = ref(false);
    const nextBtn = ref(true);
    const transitionSwiper = ref("");
    const count = ref("");
  
    onMounted(async()=>{
      const count = "0"
       await axios.post("https://x-home.pcpogo.com/homex/tab2.php?RDEBUG=andrewc",count)
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
              await axios.post("https://x-home.pcpogo.com/homex/tab2.php?RDEBUG=andrewc",count.value)
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
      setTime
      }
  }

    
   
}
</script>

<style scoped>
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
  /* user-select: none; */
  width: 25px;
  height: 25px;
  display: inline-block;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.slide-prev i,
.slide-next i{
  position: absolute;
  top: 50%;
  left: 50%;
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
  color: #ff0;
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