<template>
    <div id="multi">
        <div class="mb-5">
            <h4>選擇品牌</h4>
            <button @click="goSearch()" class="mr-5">搜尋</button>
            <MultiSelect v-model="selectedBrand" :options="brands" @change="changeBrand($event)" optionLabel="name" placeholder="Select Brand" display="chip" />
            <MultiSelect v-model="selectCate" :options="category" @change="changeCate($event)" optionLabel="cate" placeholder="Select category" display="chip" />
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
                {name: 'Edifier', code: '11', cate:[]},
                {name: 'Kef', code: '22', cate:[]},
                {name: 'Dali', code: '33', cate:[]},
                {name: 'Klipsch', code: '41', cate:[]}
            ],
            category:[
                {cate: '落地喇叭', code: '10'},
                {cate: '藍芽喇叭', code: '50'},
                {cate: '墊材', code: '60'},
                {cate: '書架喇叭', code: '80'}
            ],
            productList:[],
            searchBack:[],
        }
    },
    methods: {
        changeBrand(event) {
            event.value.forEach(item=>{
                // 非重複品項才會新增到productList
                if(this.productList.indexOf(item)==-1){
                    this.productList.push(item)
                }
            })
            // needToDel = productList比event.value多出來的品項
             const needToDel = this.productList.filter(value =>{
                        return  event.value.indexOf(value) === -1
                    });
                    console.log('needToDel',needToDel)
                    // index = 找出productList比event.value多出來的品項"索引"
                    needToDel.forEach(item=>{
                        const index =  this.productList.map(el=>el.name).indexOf(item.name)
                         this.productList.splice(index,1)
                    })
        },
        changeCate(event){
            event.value.forEach(eleVal=>{
                this.productList.forEach((item)=>{
                    if(item.cate.indexOf(eleVal.cate)==-1){
                        item.cate.push(eleVal.cate)
                    }           
                })
            })
            const needToDel = this.productList[0].cate.filter(value=>{
                    return event.value.map(ele=>ele.cate).indexOf(value)===-1
                })
            // const needToDel =  this.productList.map(item=>item.cate.filter(cate=>event.value.map(ele=>ele.cate).indexOf(cate)===-1))
            console.log('needToDel',needToDel)
            needToDel.forEach(item=>{
                    console.log('item type',typeof item)
                    const index =  this.productList[0].cate.indexOf(item)           
                    console.log('index',index)
                    this.productList.forEach(item=>item.cate.splice(index,1))
                })
            console.log('productList綜合',this.productList)
        },
        goSearch(){
                  const config = {
                            headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    }
                  }
                axios.post(`https://x-home.pcpogo.com/homex/multi.php?RDEBUG=andrewc`,this.productList,config)
                    .then(response => {           
                            response.data.forEach(product=>{
                                product.image = JSON.parse(product.image)
                                this.searchBack.push(product)
                                console.log('this.searchBack',this.searchBack)
                            })          
                        })      
         
           
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