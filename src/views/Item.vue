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
                <h2 class="card-title">{{product.name}}</h2>
                  <h4>
                    <span class="badge badge-info">
                      {{product.category}}
                    </span>
                  </h4>
                <h4 class="card-text mt-3">TWD ${{product.price}}</h4>
                <div class="mt-5 form-group formGroup">
                    <label>購買數量</label>
                    <input v-model="amount" class="form-control input-box" type="number" min="1" max="20" required>
                </div>
                <div class="mt-5 form-group">
                    <button class="btn btn-primary"  type="submit">
                      加入購物車
                    </button>
                    <button class="ml-4 btn btn-outline-danger" @click="deleteBtn()" type="click">
                      刪除商品
                    </button>
                </div> 
              </form>          
            </div>
          </div>
    </section>
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
            key:'cart',
            spin: true,
        }
    },
    mixins: [counter],
    methods: {
      addItem() {
        const item = {
              ...this.product,
              amount: this.amount,
              uid: this.$store.state.user.id
        }
        // console.log('item new',item)
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
              // console.log('this.$store.state.itemList',this.$store.state.itemList)
              this.productDatabase()
      },
      productDatabase(){
        const itemListStr = JSON.stringify(this.$store.state.itemList);
        localStorage.setItem(this.key, itemListStr);
        console.log('itemListStr',itemListStr)
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


.input-box{
  width: 300px;
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
