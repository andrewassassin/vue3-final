<template>
    <section class="p-p-3 section p-d-flex p-flex-wrap">
        <div class="p-md-6 p-col-12 p-d-flex p-flex-wrap p-jc-center">
            <div class="showImg p-md-12 p-col-12 p-d-flex p-jc-center">
                <!-- <img v-if="!preLoad" :src="require(`../assets/img/${focusIndex}`)" alt=""> -->
                <Image v-if="!preLoad" :src="require(`../assets/img/${focusIndex}`)" alt="Image" width="400" preview />
                <Skeleton v-if="preLoad" width="400px" height="400px" class="skeleton-img" />   
            </div>
            <div class="p-d-flex p-ai-center p-md-12 p-jc-center">
                <div class="slide-prev p-d-flex p-ai-center">
                    <i @click="slideCtrl(1)" class="pi pi-chevron-left" style="font-size: 2rem"></i>
                </div>
                <div class="slide-item p-md-8 p-col-8 p-d-flex p-jc-start p-mr-3">
                    <div id="slideList" class="slide-list p-d-flex p-jc-center p-my-1">
                        <li 
                            v-for="(item,index) in slideData" :key="item.id"  
                            @click="clickImg(index)" 
                            :class="{box:chooseImg==index}"
                            class="p-d-flex p-jc-center p-ai-center p-mx-3">                   
                            <img v-if="!preLoad" :src="require(`../assets/img/${item}`)" :id="`${index}`" alt="">
                            <Skeleton v-if="preLoad" width="100px" height="100px" class="skeleton-img" />      
                        </li>
                    </div>
                </div>
                <div class="slide-prev p-d-flex p-ai-center">
                    <i @click="slideCtrl(-1)" class="pi pi-chevron-right" style="font-size: 2rem"></i>
                </div>
            </div>
        </div>
        <div class="p-mt-md-5 p-md-5 p-col-12 p-d-flex p-jc-center">
            <form @submit.prevent="addItem($event)" class="p-md-7 p-col-12 p-text-left">
                <h1 class="card-title p-mb-2">{{product.name}}</h1>
                <Badge :value="product.category" size="large" severity="info" class="p-mt-0"></Badge>
                <h2 class="p-mt-3">TWD ${{product.price}}</h2>
                <div class="p-d-flex p-jc-between p-ai-center p-mt-4">
                    <div>
                        <div class="textHeader">COLOR</div>
                        <div class="p-d-flex">
                            <label v-for="item in colorGroup" :key="item" class="colorBox p-mt-3 p-mr-1" :class="`${item}`"></label>
                        </div>
                    </div>
                    <div class="p-d-flex p-flex-wrap p-md-4 p-px-0">
                        <div class="p-md-12 p-col-12 amount-buy p-px-0">購買數量</div>
                        <div class="p-md-12 p-col-12 p-px-0">
                            <input v-model="amount" class="input-box p-md-12 p-col-12" type="number" min="1" max="20" required>
                        </div>
                    </div>
                </div>
                <div class="p-mt-5 p-md-12 p-px-0">
                    <button class="general-btn p-md-12 p-col-12" type="submit">
                    加入購物車
                    </button>
                </div>
            </form>
        </div>
    </section>
    <article class="p-my-5">
        <div class="top-sec p-d-flex p-flex-wrap p-md-12 p-p-0">
            <div class="top-sec-img p-md-5 p-col-12 p-p-0">
                <img src="../assets/img/carousel-4.jpg" alt="">
            </div>
            <div class="top-sec-text p-md-7 p-col-12 p-d-flex p-ai-center">
                <div class="">
                    <h4>CABINET DESIGN</h4>
                    <p>The rigid cabinet construction is important to optimize the working environment for both woofers and tweeter. The organically shaped design increases overall rigidity and severely reduces cabinet resonances. Furthermore standing waves are practically eliminated as there are no parallel surfaces reflecting sound waves. The EPICON cabinet consists of real wood veneer which is lacquered of a total of 10 times. Each layer is hand polished to ensure a deep, high gloss and elegant surface. 10 times of lacquer also ensures a sturdy finish with a thickness of almost 2 mm.</p>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        id: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            product:{},
            amount:'',
            key:'cart',
            api:'product',
            columnCnt:[],
            clickWait: false,
            timer: {},
            slideData: [],
            colorGroup:[],
            focusIndex:'',
            preLoad:true,
            chooseImg:0,
            cntR:0,
        }
    },
    async created() {
        this.$store.dispatch("DataGetCart");
        const options = {
            method: 'get',
            url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
            params: {
                cmd: 'show',
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
        // const itemListStr = localStorage.getItem(this.key);
        // const defaultList = JSON.parse(itemListStr);
        // this.$store.state.itemList = defaultList || []; 
        axios(options)
            .then(response => {
                const item = response.data.find(item=>{
                    return item.id == this.id
                })
                if(item){
                    this.slideData = JSON.parse(item.image)
                    this.colorGroup = JSON.parse(item.color)
                    this.product = item
                    // this.specification = JSON.parse(item.specification)
                    // this.columnCnt = this.specification[0]
                    // this.specification.splice(0,1)
                }
                this.focusIndex = this.slideData[0]
                this.preLoad = false
            })
            .catch(error => {
                console.log('err',error);
            });
    },
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
        setTime() {
            this.timer = setTimeout(() => {
                this.clickWait = false;
            }, 500);
        },
        stopTime() {
            window.clearInterval(this.timer);
        },
        slideCtrl(slidesToShow=1) {
            if (slidesToShow > 0) {
                let ul  = document.getElementById("slideList")
                if(ul.style.transform!=='translateX(0%)'){
                    this.cntR-=30
                    ul.style.transform = "translateX(-" + this.cntR + "%)";
                    this.setTime();
                    console.log('ul',ul.style.transform)
                    return;
                }
            }
            if (slidesToShow < 0) {
                let ul  = document.getElementById("slideList")
                if(ul.style.transform!=='translateX(-60%)'){
                    this.cntR+=30
                    ul.style.transform = "translateX(-" + this.cntR + "%)";
                    console.log('ul',ul.style.transform)
                    this.setTime();
                    return;
                }
            }
        },
        clickImg(index) {
            this.chooseImg=index
            this.focusIndex = this.slideData[index]
        }
    }
}
</script>
<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}
a {
    color: #42b983;  
}
/* slide ctrl */
.section{
    margin-top: 180px;
}

/* slide */
.slide-item{
    background-color: rgb(255, 255, 255);
    overflow: hidden;
}

.slide-list{
    transform: translateX(0%);
    cursor: pointer;
    transition: all .3s ease;
    position: relative; 
}

.slide-list li {
    opacity: 0.3;
}

.slide-list li.box{
    opacity: 1;
    border: black 4px solid;
}

.slide-prev{
    height: 100px;
    width: 30px;
    background: transparent;
    cursor: pointer;
}

::v-deep(.p-image-mask .p-component-overlay){
    position: relative;
    z-index: 999999;
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
    font-size: 30px;
    font-weight: 900;
}


.amount-buy {
    font-size: 10px;
}

.textHeader{
    font-size: 12px;
    font-weight: 500;
    font-family: "Lato", "HelveticaNeue", "Helvetica Neue", sans-serif;
}

.input-box{
    height:40px;
    position: relative;
    /* left: 36%; */
}

.showImg img{
    width:400px;
    height:400px;
}

.general-btn{
    /* width: 350px; */
    height: 55px;
}

.add-cart:hover{
    background: black;
    color: #fff;
}

.top-sec{
    background: rgba(238, 238, 238, 0.863);
    align-items: center;
    margin: 50px 0;
    overflow: hidden;
}

.top-sec:hover img{
    transform: scale(1.1);
}

.top-sec-img{
    display: flex;
    align-items: center;
    overflow: hidden;
}

.top-sec-img img{
    max-width: 100%;
    height: 600px;
    transition: transform 0.5s ease;
}


.top-sec-text{
    color: rgb(0, 0, 0);
    line-height:1.5; 
    font-weight: 500;
    font-size: 16px;
    font-family: 'Segoe UI';
    padding: 0 80px;
    height: 400px;
}

.top-sec h4 {
    font-weight: 900;
}

.top-sec p{
    margin-top:18px ;
    word-wrap: break-word;
    text-align: left;
}

.specification{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.specification h3{
    width: 100%;
    margin-bottom: 30px;
}

@media(max-width:600px){
    .section{
        margin-top: 130px;
    }
    .slide-list img{
        width: 50px;
        height: 50px;
    }

    .top-sec-img img{
        height: 400px;
    }

}
</style>
