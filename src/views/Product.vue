<template>
    <header class="my-2">
      <section class="py-3">
      <div class="container">
        <h2 class="text-center mb-2">產品列表</h2>
         <SelectButton v-model="orderSort" :options="options" @click="orderFocus($event)" class="mt-5 mb-3" />
          <div class="row">
            <div class="col-md-4 person" v-for="(product,index) in threeList" :key="index">
              <div class="card my-5 mx-2">
                <div class="slide-img">
                  <img  class="card-img-top">       
                    <div class="overlay">
                      <a :id="`${product.id}`" @click="goToProduct($event)" class="buy-btn">Buy Now</a>	
                    </div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">{{product.name}}</h4>
                  <h4>
                    <span class="badge badge-info">
                    {{product.category}}
                    </span>
                  </h4>
                  <p class="card-text"> $ {{product.price}} NTD</p>               
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
     <button @click="topFunction()" class="goBackBtn">
        <i class="fas fa-chevron-up"></i>
    </button>
</header>


</template>

<script>
import product from "../mixin/product";
import SelectButton from 'primevue/selectbutton';
import axios from 'axios'
import Item from '@/views/Item'
export default {
  name: 'Product',
  data () {
    return {
      orderSort: '',
      productList:[],
      threeList: [],
      options: ['價格由低至高', '最新上架','熱門排行'],
      sortKey:''
    }
  },
  mixins:[product],
  components: {
    SelectButton
  },
  beforeMount() {
    // 在頁面開啟前發出請求
    this.getInitialUsers()
  },
  mounted(){
    this.scroll()    
  },
  methods:{
    getInitialUsers() {  
      const count = "0"
      axios.post(`https://x-home.pcpogo.com/homex/product.php?RDEBUG=andrewc`,count)
        .then(response => {      
              this.productList = response.data
              console.log(response.data)
              this.productList.splice(0,6).forEach(item=>{
                item.image = JSON.parse(item.image);
                this.threeList.push(item)
              })
            }      
        )       
    },
    goToProduct(event){   
      const id = event.currentTarget.id
      this.$router.push({
          path: `/product/${id}`,
          component: Item,
        })    
    },
    scroll() {
     
        let isLoading = false
        var count = 0

        var that = this
        window.onscroll = async function() {
          // 距離底部200px加載一次
          let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
          // let height = document.documentElement.offsetHeight - document.documentElement.scrollTop
          // console.log('bottomOfWindow',height - window.innerHeight)
          if (bottomOfWindow && isLoading == false) {
              isLoading = true
              count += 6
            await axios.post(`https://x-home.pcpogo.com/homex/product.php?RDEBUG=andrewc`, count)
                .then(
                  response => {
                    that.productList = response.data
                    that.productList.splice(0,6).forEach(item=>{
                      item.image = JSON.parse(item.image);
                      that.threeList.push(item)
                    })            
                  }      
                )        
              isLoading = false
          }         
       }
      },
      topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      },
      orderFocus(event){
        if(this.orderSort==event.target.ariaLabel){
          console.log('可以切換')
        }
        console.log('event.target.value',event.target.ariaLabel)
        console.log('sortKey: ',this.sortKey)
   
      } 
  },
  watch:{
      orderSort:function(newVal){
          this.threeList=[]
          this.sortKey  = newVal
           console.log('sortKey: ',this.sortKey)
          console.log('newVal: ',newVal)
          const count = "0"
          axios.post(`https://x-home.pcpogo.com/homex/sortBy.php?RDEBUG=andrewc`,count)
                  .then(response => {      
                        this.productList = response.data
                        console.log(response.data)
                        this.productList.splice(0,6).forEach(item=>{
                          item.image = JSON.parse(item.image);
                          this.threeList.push(item)
                        })
                  })    
      },
    }
}

</script>
<style scoped>


.slide-img{
	height: 450px;
	position:relative;
}
.slide-img img{
	width:100%;
	height: 100%;
	object-fit: cover;
	box-sizing: border-box;
}

.overlay{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	width:100%;
	height: 100%;
	background-color: rgba(58, 53, 53, 0.6);
	display: flex;
	justify-content: center;
  opacity: 0;
	align-items: center;
  transition: .1s opacity ease-in;
}
.buy-btn{
	width:160px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
	color:#252525;
	font-weight: 700;
	letter-spacing: 1px;
	font-family: calibri;
	border-radius: 20px;
	box-shadow: 2px 2px 30px rgba(0,0,0,0.2);
  text-decoration: none;
}
.buy-btn:hover{
	color:#FFFFFF;
	background-color: #2164e0;
	transition: all ease 0.3s;
}

.slide-img:hover .overlay{
  transition: .4s opacity ease-out;
  opacity: 1;
}

.fone-de{
  position: absolute;
  left: 50px;
}

.person {
  border-radius: 2px;
  margin: 0 auto 15px auto;
  padding: 15px;
  animation:fade 2s;
}

@keyframes fade {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

.goBackBtn {
    background:  rgba(170, 100, 9, 0.904);
    width: 40px;
    height: 40px;
    border:none;
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 1000;
    border-radius: 50%;
    cursor: pointer;
}

 
</style>