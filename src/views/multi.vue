<template>
    <div id="multi">
        <div class="mb-5">        
            <div>
                <h6>喇叭品牌</h6>
                <MultiSelect v-model="selectedBrand" :options="brands" optionLabel="name" placeholder="Select Brand" display="chip" />
            </div>
            <div class="mt-5">
                <h6>喇叭類別</h6>
                <MultiSelect v-model="selectCate" :options="category" optionLabel="category" placeholder="Select category" display="chip" />
            </div>
            <button @click="goMultiSearch()" class="mt-5 btn btn-info">搜尋</button>
        </div>
        <section class="py-3 ">
            <div class="container mt-5">
                <h2 class="text-center mb-2">搜尋結果</h2>
                <h4 class="text-left">搜尋:</h4>
                <div class="row">
                    <div class="col-md-4 person" v-for="(product,index) in searchBack" :key="index">
                    <div class="card my-5 mx-2">
                        <div class="slide-img">
                        <img :src="`../assets/img/${product.image[1]}`" class="card-img-top">       
                            <div class="overlay">
                                <a :id="`${product.id}`" class="buy-btn">Buy Now</a>	
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
    </div>
</template>

<script>
import axios from 'axios'
import MultiSelect from 'primevue/multiselect';
export default {
    components:{
        MultiSelect
    },
    data() {
        return {
            selectedBrand: null,
            selectCate:null,
            brands: [
                {name: 'Edifier', code: '11'},
                {name: 'Kef', code: '22'},
                {name: 'Dali', code: '33'},
                {name: 'Klipsch', code: '41'}
            ],
            category:[
                {category: '落地喇叭', code: '10'},
                {category: '藍芽喇叭', code: '50'},
                {category: '墊材', code: '60'},
                {category: '書架喇叭', code: '80'},
                {category: '腳架', code: '80'}
            ],
            brandList:[],
            cateList:[],
            searchBack:[],
        }
    },
    methods: {
        goMultiSearch(){
                const config = {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                }    
                const product={
                    name: this.brandList,
                    category: this.cateList
                }
                axios.post(`https://x-home.pcpogo.com/px/multi.php?PDEBUG=andrewc`,product,config)
                    .then(response => {      
                            console.log('res',response.data)
                            this.searchBack = response.data
                            this.searchBack.forEach(item=>{
                                item.image = JSON.parse(item.image);
                            })
                    })           
        }
    },
    watch:{
       selectedBrand:function(newVal){
            console.log('newVal: ',newVal)
            this.brandList = newVal
            console.log('brandList: ',this.brandList)
       },
       selectCate:function(newVal){
           this.cateList = newVal
           console.log('cateList: ',this.cateList)
       }
     }
}
</script>

<style  scoped>
#multi{
    margin-top: 50px;
}

.p-multiselect {
    width: 22rem;
}

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

</style>