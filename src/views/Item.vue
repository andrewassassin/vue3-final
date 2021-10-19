<template>
  <div class="hello">
    <section class="py-3">
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
            <div class="card-body">
              <form v-on:submit.prevent="addItem($event)" class="mt-3 card-body">
                <h3 class="card-title">{{product.name}}</h3>
                  <h2>
                    <span class="badge badge-info">
                      {{product.category}}
                    </span>
                  </h2>
                <h3 class="card-text">商品價格  $ {{product.price}} NTD</h3>
                <div class="mt-5 form-group formGroup">
                    <label>購買數量</label>
                    <input v-model="amount" class="form-control input-box" type="number" min="1" max="20" required>
                </div>
                <div class="mt-5 form-group">
                    <button class="btn btn-primary"  type="submit">
                        加入購物車
                    </button>
                </div> 
              </form>   
                <div class="mt-5 form-group">
                  <button class="btn btn-primary" @click="deleteBtn()" type="click">
                      刪除商品
                  </button>
                </div>            
            </div>
          </div>
    </section>
    <!-- <ItemTab/> -->
  </div>
</template>
<script>
import axios from 'axios'
import counter from "../mixin/counter";
export default {
    data () {
        return {
            product:{},
            amount:'',
            key:'',
            spin: true,
        }
    },
    mixins: [counter],
    methods: {
      addItem() {
        const item = {
              ...this.product,
              amount: this.amount,
              uid: this.$store.state.userId
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
              console.log('this.$store.state.itemList',this.$store.state.itemList)
              this.productDatabase()
      },
      productDatabase(){
        const itemListStr = JSON.stringify(this.$store.state.itemList);
        localStorage.setItem(this.key, itemListStr);
         axios.post("https://x-home.pcpogo.com/homex/create.php?RDEBUG=andrewc",itemListStr)
          .then(res => {
                console.log(res)
              })
          .catch(error => {
            console.log('err',error);
          });
      },
      loaded() {
        this.spin = false
      },
      deleteBtn(){
        axios.post("https://x-home.pcpogo.com/homex/delete.php?RDEBUG=andrewc",this.id)
          .then(res => {
                console.log(res)
              })
              // console.log('product內',this.product)
          .catch(error => {
            console.log('err',error);
          });
      },
    }, 
    async created() {
        const itemListStr = localStorage.getItem(this.key);
            const defaultList = JSON.parse(itemListStr);
            this.$store.state.itemList = defaultList || []; 
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
h3 {
  margin: 40px 0 0;
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
  margin-left:120px;
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
  width:700px;
  height: 163px;
  margin-top: 20px;
  background-color: rgb(241, 240, 241);
  overflow: hidden;
}

.slide-list {
  display: flex;
  margin: 10px 0px;
  padding: 5px 0px;
  height: 100px;
  /* overflow: hidden; */
}
.slide-list li {
  position: relative;
  flex: 1 0 0;
  left:calc(-100% /5.7 * 5);
  opacity: 0.3;
  margin: 15px;
}

.slide-list li:nth-child(8) {
      opacity: 1;
      transform: scale(1.3);
      z-index: 2;
    }


.slide-list li:nth-child(1),
.slide-list li:nth-child(2),
.slide-list li:nth-child(14),
.slide-list li:nth-child(15)
{
  z-index: 0;
  opacity: 0;
} 

.slide-list img{
  width: 100px;
  height: 100px;
}

.flip-list-move {
  transition: transform 0.8s;
}


.input-box{
  width: 300px;
   /* float: left; */
   position: relative;
   left: 36%;
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
</style>
