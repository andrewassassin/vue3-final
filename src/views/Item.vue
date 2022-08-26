<template>
    <section class="p-p-3 section p-d-flex p-flex-wrap">
        <ItemGallery :slideList="slideList" ref="child" :preLoad="preLoad"/>
        <div class="p-mt-md-5 p-md-5 p-col-12 p-d-flex p-jc-center">
            <form @submit.prevent="addItem($event)" class="p-md-7 p-col-12 p-text-left">
                <h1 class="card-title p-mb-2">{{product.name}}</h1>
                <Badge :value="product.category" size="large" severity="info" class="p-mt-0"></Badge>
                <h2 class="p-mt-3">TWD ${{product.price}}</h2>
                <div class="p-d-flex p-jc-between p-ai-center p-mt-4">
                    <div>
                        <div class="textHeader">COLOR</div>
                        <div class="p-d-flex">
                            <label v-for="(item,idx) in colorGroup" :key="item" 
                            @click="colorScroll(idx,item)" 
                            @mouseenter="showColor=idx" 
                            @mouseleave="showColor=false" 
                            class="colorBox p-mt-3 p-mr-1" 
                            :style="{ cursor: idx==3?'not-allowed':'pointer'}"
                            :class="item">
                                <div v-show="showColor===idx" class="dialog">
                                    <p>{{item}}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="p-d-flex p-flex-wrap p-md-4 p-px-0">
                        <div class="p-md-12 p-col-12 amount-buy p-px-0">購買數量</div>
                        <div class="p-d-flex">
                            <div @click="amount>0?amount--:1" class="minus p-d-flex p-ai-center p-jc-center">-</div>
                            <input class="inputK" v-model="amount" oninput="if(value>10)value=10;if(value.length>1)value=value.slice(0,1)" type="text">
                            <div @click="amount<9?amount++:1" class="plus p-d-flex p-ai-center p-jc-center">+</div>
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
    <div class="p-p-3 tech-area p-d-flex p-jc-center p-ai-center" style="cursor:pointer" >
        <div @click="showDetail=!showDetail" class="p-d-flex p-md-10 p-jc-between p-ai-center">
            <h1>技術規格</h1>
            <i class="pi pi-plus" :class="{rotate:showDetail}" style="fontSize: 2.5rem;"></i>
        </div>
    </div>
    <transition name="collapse">
        <PrdDetail v-if="showDetail" />
    </transition>
    <article class="p-d-flex p-jc-center">
        <div class="top-sec p-d-flex p-flex-wrap p-md-10 p-p-0">
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
import PrdDetail from '@/components/PrdDetail'
import ItemGallery from '@/components/ItemGallery'
export default {
    components:{
        PrdDetail,
        ItemGallery
    },
    props: {
        id: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            product:{},
            amount:0,
            key:'cart',
            columnCnt:[],
            slideList: [],
            colorGroup:[],
            preLoad:true,
            showColor:false,
            showDetail:false,
        }
    },
    created() {
        // console.log('id now',this.id)
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
        const itemListStr = localStorage.getItem(this.key);
        const defaultList = JSON.parse(itemListStr);
        this.$store.state.itemList = defaultList || []; 
        // console.log('資料庫的',this.$store.state.itemList)
        axios(options)
            .then(response => {
                const item = response.data.find(item=>{
                    return item.id == this.id
                })
                if(item){
                    this.slideList = JSON.parse(item.image)
                    this.colorGroup = JSON.parse(item.color)
                    this.product = item
                    this.product.color = ''
                    this.preLoad = false
                }         
            })
            .catch(error => {
                console.log('err',error);
            });
    },
    methods: {
        addItem() {
            if(this.product.color==='') alert('請選顏色')
            const item = {
                ...this.product,
                amount: this.amount,
            }
            const already = this.$store.state.itemList.find(item => {
                return item.id === this.product.id && item.color === this.product.color
            })
            if (already) {
                // 最後的數量= 已經擁有的數量+現在使用者輸入的數量
                already.amount = parseInt(already.amount) + parseInt(this.amount)
                // this.product = already
            } else{
                this.$store.commit("itemList",item);
                console.log('pizza',this.$store.state.itemList)
            }
            this.productDatabase()
        },
        productDatabase(){
            const itemListStr = JSON.stringify(this.$store.state.itemList);
            localStorage.setItem(this.key, itemListStr);
            this.$store.dispatch("productToData");
        },
        colorScroll(idx,item){
            this.$refs.child.parentMsg(idx);
            this.product.color = item
        },
    }
}
</script>
<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

.section{
    margin-top: 180px;
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

.minus,.plus{
    width:28px;
    height: 42px;
    background: rgb(243, 242, 242);
    cursor: pointer;
    color: rgb(151, 151, 151);
    font-size: 18px;
}

.inputK{
    width:28px;
    height: 42px;
    background: rgb(243, 242, 242);
    border: 1.5px solid rgb(224, 224, 224);
    border-top: none;
    border-bottom: none;
    padding: 5px;
    text-align: center
}

.general-btn{
    height: 55px;
}

.add-cart:hover{
    background: black;
    color: #fff;
}

.top-sec{
    background: rgba(238, 238, 238, 0.863);
    align-items: center;
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
    height: 500px;
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

.dialog{
    position: absolute;
    text-align: center;
    border-radius: 6px;
    opacity: .8;
    top: 40px;
    left: 50%;
    transform: translate(-50%,0%);
    width: 40px;
    background: rgb(44, 44, 44);
    box-shadow:  0 0 5px #a7a7a7;
}

.dialog p{
    color: white;
    font-size: 6px;
}

.pi-plus{
    transition: all .3s ease;
}

.pi-plus.rotate {
    transform: rotateZ(45deg);
}

.tech-area{
    border: 1px solid rgb(204, 203, 203);
    border-left: none;
    border-right: none;
}

.collapse-enter-active,
.collapse-leave-active {
    transition: all .3s ease;
}

.collapse-enter-from,
.collapse-leave-to {
    height: 0px;
    opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
    height: 620px;
    opacity: 1;
}

@media(max-width:600px){
    .section{
        margin-top: 130px;
    }

    .top-sec-img img{
        height: 400px;
    }
}
</style>