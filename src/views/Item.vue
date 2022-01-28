<template>
    <section class="p-py-3">
        <div class="p-d-flex p-flex-wrap p-ai-center">
            <div class="slide p-md-6 p-col-12">
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
            <div class="p-md-5 p-col-12">
            <form v-on:submit.prevent="addItem($event)" class="p-mt-3">
                <h1 class="card-title">{{product.name}}</h1>
                <Badge :value="product.category" class="p-mt-2" size="large" severity="info"></Badge>
                <h2 class="p-mt-3">TWD ${{product.price}}</h2>
                <div class="p-mt-5 amount-buy">
                    <label>購買數量</label>
                    <input v-model="amount" class="input-box" type="number" min="1" max="20" required>
                </div>
                <div class="p-mt-5">
                    <button class="general-btn" type="submit">
                    加入購物車
                    </button>
                </div> 
            </form>          
            </div>
        </div>
    </section>
    <article class="my-5">
        <h3>商品介紹</h3>
        <div class="top-sec">
            <div class="top-sec-img">
            <img src="../assets/img/carousel-4.jpg" alt="">
            </div>
            <div class="top-sec-text">
            <h4>CABINET DESIGN</h4>
            <p>The rigid cabinet construction is important to optimize the working environment for both woofers and tweeter. The organically shaped design increases overall rigidity and severely reduces cabinet resonances. Furthermore standing waves are practically eliminated as there are no parallel surfaces reflecting sound waves. The EPICON cabinet consists of real wood veneer which is lacquered of a total of 10 times. Each layer is hand polished to ensure a deep, high gloss and elegant surface. 10 times of lacquer also ensures a sturdy finish with a thickness of almost 2 mm.</p>
            </div>
        </div>
    </article>
    <section class="specification">
        <h3>產品規格</h3>
        <table class="table table-border p-md-6">
            <thead >
                <tr>
                <th v-for="item in columnCnt" :key="item.key" class="text-right">{{item}}</th>
                </tr>
            </thead>
            <tbody id="cartTableBody" v-for="item in specification" :key="item.key">      
                <tr>
                <td v-for="column in item" :key="column.key">                                      
                    <p class="m-0 text-right">{{column}}</p> 
                </td>      
                </tr>         
            </tbody>
        </table>
    </section>
</template>
<script>
import axios from 'axios'
import slider from "../mixin/slider";
export default {
    mixins: [slider],
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
            spin: true,
            api:'product',
            specification:[],
            columnCnt:[]
        }
    },
    async created() {
        this.$store.dispatch("DataGetCart");
        // const itemListStr = localStorage.getItem(this.key);
        // const defaultList = JSON.parse(itemListStr);
        // this.$store.state.itemList = defaultList || []; 
        await axios.get(`https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`)
            .then(response => {
                const item = response.data.find(item=>{
                return item.id == this.id
                })
                if(item){
                    this.itemObj  = JSON.parse(item.image)   
                    this.product = item
                    this.specification = JSON.parse(item.specification)
                    this.columnCnt = this.specification[0]
                    this.specification.splice(0,1)
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
    bottom: 45px;
    left: 390px;
}


.input-box{
    width: 150px;
    height:40px;
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

.general-btn{
    width: 350px;
    height: 55px;
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

.specification{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.specification h3{
    width: 100%;
    margin-bottom: 30px;
}

</style>
