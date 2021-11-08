<template>
  <div class="item">
    <header class="py-3">
          <div class="row align-items-center">
            <div class="slide">
              <div class="showImg">
                <img v-if="showImg" :src="require(`../assets/img/${itemObj[focusIndex]}`)" alt="">
              </div>
              <div class="slide-item">
                <transition-group name="flip-list" tag="ul" class="slide-list">
                  <li v-for="(item,index) in slideData" :key="item.id">                   
                      <img :src="require(`../assets/img/${itemObj[item.ref]}`)" :name="`${itemObj[item.ref]}`" :id="`${index}`"  @click="clickImg($event,index)" alt="">          
                  </li>
                </transition-group>
              </div>
              <div class="slide-ctrl">
                <div class="slide-prev" @click="slideCtrl(1)">Prev</div>
                <div class="slide-next" @click="slideCtrl(-1)">Next</div>
              </div>
            </div>
            <div class="list-sec">
              <form v-on:submit.prevent="addItem($event)" class="mt-3 card-body">
                <h2 class="card-title">{{product.name}}</h2>
                <h4 class="mt-3">
                  <span class="badge badge-info">
                    {{product.category}}
                  </span>
                </h4>
                <h4 class="card-text mt-3">TWD ${{product.price}}</h4>
                <div class="mt-5 form-group amount-buy">
                    <label>購買數量</label>
                    <input v-model="amount" class="form-control input-box" type="number" min="1" max="20" required>
                </div>
                <div class="mt-5 form-group">
                    <button class="btn add-cart"  type="submit">
                      加入購物車
                    </button>
                </div> 
              </form>          
            </div>
          </div>
    </header>
    <section class="my-5">
      <h3>商品介紹</h3>
      <div class="top-sec">
        <div class="top-sec-img">
          <img src="../assets/img/item-info.jpg" alt="">
        </div>
        <div class="top-sec-text">
          <h4>CABINET DESIGN</h4>
          <p>The rigid cabinet construction is important to optimize the working environment for both woofers and tweeter. The organically shaped design increases overall rigidity and severely reduces cabinet resonances. Furthermore standing waves are practically eliminated as there are no parallel surfaces reflecting sound waves. The EPICON cabinet consists of real wood veneer which is lacquered of a total of 10 times. Each layer is hand polished to ensure a deep, high gloss and elegant surface. 10 times of lacquer also ensures a sturdy finish with a thickness of almost 2 mm.</p>
        </div>
    </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import slider from "../mixin/slider";
export default {
    data () {
        return {
            product:{},
            amount:'',
            key:'cart',
            spin: true,
        }
    },
    mixins: [slider],
    methods: {
      addItem() {
        const item = {
              ...this.product,
              amount: this.amount,
        }
           const already = this.$store.state.itemList.find(item => {
              return item.id === this.product.id
            })
            if (already) {
              // 最後的數量= 已經擁有的數量+現在使用者輸入的數量
              already.amount = parseInt(already.amount) + parseInt(this.amount)
              this.product = already
            } else{
              this.$store.commit("itemList",item);
            }
              this.productDatabase()
      },
      productDatabase(){
        const itemListStr = JSON.stringify(this.$store.state.itemList);
        localStorage.setItem(this.key, itemListStr);
        this.$store.dispatch("productToData");
      },
      loaded() {
        this.spin = false
      }
    }, 
    async created() {
            this.$store.dispatch("DataGetCart");
            // const itemListStr = localStorage.getItem(this.key);
            // const defaultList = JSON.parse(itemListStr);
            // this.$store.state.itemList = defaultList || []; 
            await axios.get("https://x-home.pcpogo.com/homex/product.php?RDEBUG=andrewc")
        .then(response => {
            const item = response.data.find(item=>{
              return item.id == this.id
            })
            if(item){
                this.itemObj  = JSON.parse(item.image)   
                this.product = item
                // console.log('item',item)
            }
            this.spin = false
        })
        .catch(error => {
          console.log('err',error);
        });
        if(this.itemObj.length!==0){
          this.showImg = true
        }
        for (let i = 0; i < this.itemObj.length * 5; i++) {
          let obj = {};
          obj.id = i;
          // length除以i的餘數， 如果length=25，代表ref到24之後會重輪一次
          obj.ref = i % this.itemObj.length;
          this.slideData.push(obj);
        }
    },

  props: {
    id: {
      type: String,
      default: ""
    }
  }
    
}
</script>
<style scoped>
.item{
  margin: 40px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
/* slide ctrl */
.slide{
  width: 800px;
  margin-left:200px;
}

.slide-prev,
.slide-next {
  user-select: none;
  width: 50px;
  display: inline-block;
  background-color: #000;
  color: #fff;
  margin: 0 10px;
  padding: 5px 15px;
  border-radius: 50px;
  cursor: pointer;
}

.slide-prev{
   position: relative;
  right:410px;
  bottom: 100px;

}

.slide-next{
  position: relative;
  left: 350px;
  bottom: 100px;
}

.slide-prev:hover,
.slide-next:hover {
  color: #ff0;
}
/* slide */
.slide-item{
  width:680px;
  height: 163px;
  margin: 20px 0 0 60px;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
}

.slide-list {
  display: flex;
  margin: 10px 0px;
  padding: 5px 0px;
  height: 150px;
}
.slide-list li {
  position: relative;
  flex: 1 0 0;
  left:calc(-100% /5.3 * 5);
  opacity: 0.3;
  margin: 15px;
}

.slide-list li:nth-child(8) {
  opacity: 1;
  border: black 4px solid;
  z-index: 5;
}

.slide-list li:nth-child(1),
.slide-list li:nth-child(2),
.slide-list li:nth-child(14),
.slide-list li:nth-child(15){
  z-index: 0;
  opacity: 0;
} 

.slide-list img{
  width: 100px;
  height: 100px;
}

.flip-list-move {
  transition: 0.7s;
}

.list-sec{
  width: 700px;
}

.card-title{
  font-weight: 900;
}

.amount-buy{
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.amount-buy label{
  font-size: 10px;
  position: absolute;
  bottom: 40px;
  left: 350px;
}


.input-box{
  width: 150px;
  position: relative;
  /* left: 36%; */
}

.spinner{
  position: relative;
  left: 200px;
  z-index: 5;
}

.showImg img{
  width:400px;
 height:400px;
}

.add-cart{
  width: 350px;
  height: 55px;
  border:1px #000000 solid;
  border-radius: 0;
  font-weight:bold;
}

.add-cart:hover{
  background: black;
  color: #fff;
}

.top-sec{
  display: flex;
  width: 100%;
  height: 600px;
  background: rgba(238, 238, 238, 0.863);
  align-items: center;
  margin: 50px 0;
  overflow: hidden;
}

.top-sec:hover img{
  transform: scale(1.1);
}

.top-sec-img{
  position: relative;
  height: 600px;
  display: flex;
  flex: 0 0 40%;
  align-items: center;
  overflow: hidden;
}

.top-sec-img img{
  position: absolute;
  left: 0;
  top: 0;
  max-width: 100%;
  height: 600px;
  /* padding: 150px; */
  transition: transform 0.5s ease;
}


.top-sec-text{
  position: relative;
  color: rgb(0, 0, 0);
  margin:0 200px;
  font-family: 'Helvetica';
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

</style>
