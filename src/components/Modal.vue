<template>
    <div id="modal">
        <div class="DivOverlapMask">
            <div class="DivDialog p-md-6 p-col-12">
                <header class="p-d-flex p-jc-between p-ai-center">
                    <h2 class="p-ml-3">
                        購物車
                    </h2>
                    <div class="p-mr-3">
                        <Button @click="closeBtn" icon="pi pi-times"  class="p-button-rounded p-button-plain p-button-text" />
                    </div>
                </header>
                <ScrollPanel class="custombar1">
                    <div v-if="cartNoItem" class="cart-empty">
                        <h6>購物車無商品</h6>
                        <button class="general-btn" @click="startShop">開始選購</button>
                    </div>
                    <div v-for="(item, idx) in itemList" class="cart-body" :key="item.key">
                        <div class="item-top-bar" :class="{ active: inputTag.indexOf(idx)!==-1}"></div>
                        <div class="item-body" :class="{ active:  inputTag.indexOf(idx)!==-1}">
                            <div class="p-field-checkbox">
                                <Checkbox :id="idx" :checked="true" :value="idx" v-model="inputTag" :disabled="inputTag.length>=3"/>
                            </div>
                            <div class="item-img">
                                <img
                                    v-if="!preLoad"
                                    :src="require(`../assets/img/${item.image}`)"
                                />
                                <Skeleton v-show="preLoad" width="150px" height="150px" class="skeleton-img" />
                            </div>
                            <div class="item-content">
                                <p>{{ item.name }}</p>
                            </div>
                            <div class="item-price">
                                $ {{ item.price }}
                            </div>
                            <div> 
                                <i class="pi pi-minus-circle" @click="minusItem($event)" :id="`${idx}`" style="fontsize: 1rem" type="button"></i>
                                    {{ item.amount }}
                                <i class="pi pi-plus-circle" @click="plusItem($event)" :id="`${idx}`" style="fontsize: 1rem" type="button"></i>
                            </div>
                        </div>
                    </div>
                </ScrollPanel>
                <footer class="p-d-flex p-flex-wrap p-mt-2">
                    <div class="p-d-flex p-ai-center p-jc-center p-md-12 p-xl-4 p-lg-12 p-sm-12 p-col-12">
                        <div class="p-mr-2">總金額</div>
                        <div> $ {{ getCartValue }}</div>
                    </div>
                    <div class="p-d-flex p-flex-wrap p-jc-center p-ai-center p-xl-8 p-lg-12 p-md-12 p-sm-12 p-col-12">
                        <button @click="buyItem" type="button" class="general-btn p-md-3 p-col-12 p-mx-2 p-my-1">
                            購買所選品項
                        </button>
                        <button @click.prevent="deleteSelected($event)" type="button" class="general-btn p-md-3 p-col-12 p-mx-2 p-my-1">
                            刪除所選品項
                        </button>
                        <Button class="p-md-2 p-col-12 p-button-error p-mx-2 p-my-1" @click.prevent="cancelCheck($event)" label="取消選擇" />
                    </div> 
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
import Order from '@/views/Order'
import Product from '@/views/Product'
export default {
    data() {
        return {
            key: "cart",
            inputTag: [],
            isShowImg: false,
            cartNoItem:true,
            preLoad:true
        };
    },
    methods: {
        minusItem(event) {
            const idx = event.currentTarget.id;
            if (this.itemList[idx].amount > 1) {
                this.itemList[idx].amount -= 1;
            }
            this.updateDataToStorage();
            this.$store.dispatch("productToData");
        },
        plusItem(event) {
            const idx = event.currentTarget.id;
            if (this.itemList[idx].amount < 10) {
                this.itemList[idx].amount += 1;
            }
            this.updateDataToStorage();
            this.$store.dispatch("productToData");
        },
        closeBtn() {
            this.$emit("closeBtn");
        },
        cancelCheck() {       
            this.inputTag = []
        },
        updateDataToStorage() {
            const itemListStr = JSON.stringify(this.itemList);
            localStorage.setItem(this.key, itemListStr);
        },
        deleteSelected() {
            this.inputTag.forEach((item) => {
                console.log(item)
                const index = this.itemList.map((el,idx) => idx).indexOf(item)
                console.log('index',index)
                this.itemList.splice(index, 1);
            });
            this.inputTag = [];
            this.updateDataToStorage();
            this.$store.dispatch("productToData");
        },
        startShop(){
            this.$router.push({
                path: `/product`,
                component: Product,
            })  
            this.$emit("closeBtn");
        },
        buyItem(){
            const buyItem = this.itemList.filter((item,idx)=>this.inputTag.indexOf(idx)!==-1)
            this.$store.state.orderList = buyItem
            // this.$store.dispatch("createOrder");
            this.$router.push({
                path: `/Order`,
                component: Order,
            }) 
            this.$emit("closeBtn");
        }
    },
    async mounted() {
        await this.$store.dispatch("DataGetCart");
        this.preLoad = false;
        
        // this.preLoad = false;
        if(this.itemList.length!==0){
            this.cartNoItem = false
            this.inputTag.push(0)   
        }
        // const itemListStr = localStorage.getItem(this.key);
        // const defaultList = JSON.parse(itemListStr);
        // this.$store.state.itemList = defaultList || [];
    },
    computed: {
        itemList() {
            return this.$store.state.itemList;
        },
        getCartValue() {
            return this.itemList.reduce((cartValue, item) => {
                const itemValue = item.price * item.amount;
                return cartValue + itemValue;
            }, 0);
        },
    },
    watch: {
        inputTag: function () {
            console.log('input tag',this.inputTag)
        },
        itemList: {
            handler: function () {
                if(this.itemList.length!==0){
                    this.cartNoItem = false
                }else{
                    this.cartNoItem = true
                }
            },
            deep: true,
        },
    },
};
</script>
<style scoped>
#modal {
    position: fixed;
    z-index: 51;
    margin: 0;
    box-sizing: border-box;
    /* overflow-y: hidden; */
}

.DivOverlapMask {
    z-index: 51;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: fixed;
    /* margin-top: 175px; */
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    background: rgba(32, 32, 32, 0.7);
}

/* Modal Dialog 層 */
.DivDialog {
    position: relative;
    height: 800px;
    margin: 0;
    padding: 0 30px;
    background-color: #ffffff;
    border-radius: 10px;
}

.p-scrollpanel .p-scrollpanel-content{
    padding: 0;
}

.cart-body{
    margin: 20px 0;
    width: 98%;
}

.item-top-bar{
    margin: 0 10px;
    height: 40px;
}

.item-body{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 10px;
    padding: 5px 20px;
    position: relative;
}

.item-top-bar.active{
    background:lightseagreen ;
}

.item-body.active{
    border: lightseagreen 2px solid; 
}

.item-img{
    width: 150px;
    margin: 0 50px;
}

.item-img img{
    width: 150px;
    /* height: 150px; */
    /* object-fit: cover; */
    box-sizing: border-box;
}

.item-content{
    text-align: left;
    width: 250px;
}

.item-price{
    margin: 0 20px;
}

.pi-plus-circle,
.pi-minus-circle {
    transition: 0.2s ease;
    border: none;
    overflow: auto;
}

.pi-plus-circle:hover,
.pi-minus-circle:hover {
    color: #fff;
    background: rgb(17, 17, 17);
    border-radius: 50%;

}

.p-scrollpanel{
    width: 100%;
    height: 630px;
}


.cart-empty{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 100px;
}

.general-btn{
    width: 150px; 
    height: 40px;
}

@media (max-width: 900px) {
    .DivDialog {
        position: fixed;
        /* width: 500px; */
        height: 700px;
        margin: 0;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
    }
    .p-scrollpanel{
        height: 330px;
    }

}
</style>
