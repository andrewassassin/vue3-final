<template>
    <div id="modal">
        <div class="DivOverlapMask">
            <div class="DivDialog p-md-6 p-col-12">
                <div class="p-d-flex p-jc-between">
                    <h2 class="p-ml-3">
                         購物車
                    </h2>
                    <div v-on:click.prevent="closeBtn()" class="close-btn p-mr-3">
                        <i style="fontSize: 1.3rem" class="p-mt-3 pi pi-times close"></i>      
                    </div>
                </div>
                <ScrollPanel class="custombar1">
                    <div v-if="cartNoItem" class="cart-empty">
                        <h6>購物車無商品</h6>
                        <button class="general-btn" @click="startShop">開始選購</button>
                    </div>
                    <div v-for="(item, idx) in itemList" class="cart-body" :key="item.key">
                        <div class="item-top-bar" :class="{ active: inputTag.indexOf(item.id)!==-1}"></div>
                        <div class="item-body" :class="{ active:  inputTag.indexOf(item.id)!==-1}">
                            <div class="p-field-checkbox">
                                <Checkbox :id="idx" :checked="true" :value="item.id" v-model="inputTag" />
                            </div>
                            <div class="item-img">
                                <img
                                    v-if="isShowImg"
                                    :src="require(`../assets/img/${item.image[1]}`)"
                                />
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
                <footer class="cart-footer p-mt-2">
                    <div class="cart-total-money">
                        <p>總金額</p>
                        <div> $ {{ getCartValue }}</div>
                    </div>
                    <div class="p-d-flex p-ai-center">
                        <button type="button" class="general-btn p-mr-3">
                            購買所選品項
                        </button>
                        <button @click.prevent="deleteSelected($event)" type="button" class="general-btn">
                            刪除所選品項
                        </button>
                        <Button class="p-mx-3 p-button-info" @click.prevent="selectAll($event)" label="全選" />
                        <Button @click.prevent="closeBtn" label="關閉" />
                    </div> 
                </footer>
            </div>
        </div>
    </div>
</template>
<script>
import Product from '@/views/Product'
export default {
    data() {
        return {
            key: "cart",
            inputTag: [],
            isShowImg: false,
            cartNoItem:true
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
        selectAll() {       
            this.inputTag = this.itemList.map(item=>item.id)
        },
        updateDataToStorage() {
            const itemListStr = JSON.stringify(this.itemList);
            localStorage.setItem(this.key, itemListStr);
        },
        deleteSelected() {
            this.inputTag.forEach((item) => {
                const index = this.itemList.map((el) => el.id).indexOf(item);
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
        }
    },
    async created() {
        await this.$store.dispatch("DataGetCart");
        this.isShowImg = true;
        if(this.itemList.length!==0){
            // this.cartNoItem = false
            this.inputTag.push(this.itemList[0].id)   
        }
        // const itemListStr = localStorage.getItem(this.key);
        // const defaultList = JSON.parse(itemListStr);
        // this.$store.state.itemList = defaultList || [];
    },
    computed: {
        itemList() {
            console.log("vuex itemList ", this.$store.state.itemList);
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
<style >
#modal {
    position: fixed;
    z-index: 500000;
    margin: 0;
    box-sizing: border-box;
}

.DivOverlapMask {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: rgba(32, 32, 32, 0.7);
}

/* Modal Dialog 層 */
.DivDialog {
    position: relative;
    /* width: 850px; */
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
    height: 150px;
}

.item-content{
    text-align: left;
    width: 250px;
}

.item-price{
    margin: 0 20px;
}

.close-btn{
    position: relative;
    margin-top: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: .3s ease;
}

.close{
    position: absolute;
    top: 10%;
    left: 51%;
    transform: translate(-50%,-50%);
}

.close-btn:hover{
    background: rgb(224, 224, 224);
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

.general-btn {
    width: 150px;
    height: 40px;
    border: 1px #000000 solid;
    background: rgb(255, 255, 255);
    border-radius: 0;
    font-weight: bold;
    font-size: 16px;
    transition: 0.3s ease;
    cursor: pointer;
}

.general-btn:hover {
    background: black;
    color: #fff;
}

.cart-footer{
    display: flex;
    margin: 0px 0;
}

.cart-total-money{
    width: 300px;
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

@media (max-width: 600px) {
    .DivDialog {
        position: fixed;
        /* width: 500px; */
        height: 600px;
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
