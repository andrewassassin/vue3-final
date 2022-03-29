<template>
    <div class="p-d-flex p-flex-wrap">
        <section class="section p-d-flex p-flex-wrap">
            <div class="p-md-4"></div>
            <div class="p-md-7 p-col-12">
                <div class="p-text-left leftSide p-px-0"><i class="pi pi-apple" style="fontSize: 2.5rem;cursor:pointer;"></i></div>
                <form class="p-text-left">
                    <div class="p-d-flex p-ai-center" style="height:2.5rem;">
                        <label class="p-md-2 formText">聯絡</label>
                        <label class="formText" >{{user.username}}</label>
                    </div>
                    <div class="p-d-flex p-ai-center userData" style="height:2.5rem;">
                        <label class="p-md-2 formText">電話</label>
                        <label class="formText">{{user.phone}}</label>
                    </div>
                    <div class="p-d-flex p-ai-center userData" style="height:2.5rem;">
                        <label class="p-md-2 formText">名字</label>
                        <label class="formText">{{user.first_name}}</label>
                    </div>
                </form>
                <div class="p-mt-5 p-mb-3 title p-text-left">付款方法</div>
                <form class="p-text-left cForm p-p-0">
                    <div class="p-ml-2 p-md-10 p-py-3 formText p-d-flex p-jc-between">信用卡<i class="pi pi-credit-card"></i></div>
                    <div class="p-d-flex p-flex-wrap p-ai-center card-content p-p-2">
                        <div class="p-md-12 p-pb-0"><InputText placeholder="卡號" class="p-md-12" style="height:3rem;border-radius: 5px;"/></div>
                        <div class="p-md-12 p-pb-0"><InputText placeholder="持卡人姓名" class="p-md-12" style="height:3rem; border-radius: 5px;"/></div>
                        <div class="p-md-12"><InputText placeholder="MM/YY" class="p-md-12" style="height:3rem; border-radius: 5px;"/></div>
                    </div>
                </form>
            </div>
            <div class="p-md-1"></div>
        </section>
        <aside class="aside">
            <div class="container p-md-6 p-px-0">
                <div v-for="item in orderList" class="item-body p-my-3" :key="item.key">
                    <div class="item-img p-mr-3">
                        <img :src="require(`../assets/img/${item.image[1]}`)"/>
                        <Badge :value="item.amount" severity="secondary" class="item-cnt p-badge-secondary"></Badge>
                    </div>
                    <div class="item-content">
                        {{ item.name }}
                    </div>
                    <div class="item-price">
                        $ {{ item.price }}
                    </div>
                </div>
            </div>
            <div class="p-d-flex container2 p-md-6">
                <InputText id="productPrice" min="1" max="90000" placeholder="優惠代碼" class="p-md-8" type="text" style="width:16.5rem;height:3rem"/>
                <Button @click.prevent="" label="使用優惠代碼" class="p-button-secondary p-md-4 p-ml-3" style="height:3rem"/>
            </div>
            <div class="p-d-flex p-flex-wrap container2 p-md-6">
                <div class="p-d-flex p-jc-between p-md-12 p-ai-center" style="height:2rem">
                    <p class="priceText">小計</p>
                    <p class="priceText">$ {{getAllPrice}}</p>
                </div>
                <div class="p-d-flex p-jc-between p-md-12 p-ai-center" style="height:2rem">
                    <p class="priceText">送貨</p>
                    <p class="priceText">免費</p>
                </div>
            </div>
            <div class="p-d-flex p-flex-wrap container3 p-md-6">
                <div class="p-d-flex p-jc-between p-md-12 p-ai-center" style="height:2rem">
                    <p class="totalPrice">總額</p>
                    <p class="totalPrice">$ {{getAllPrice}}</p>
                </div>
            </div>
        </aside>
    </div>
</template>
<script>
import { computed, onMounted } from 'vue';
import store from "@/store";
  export default {
    setup () {
        const user = computed(()=>{
            return store.state.user;
        })
        const orderList = computed(()=>{
            return store.state.orderList;
        })

        const getAllPrice= computed(()=>{
            return orderList.value.reduce((totalValue, item) => {
                const itemValue = item.price * item.amount;
                return totalValue + itemValue;
            }, 0);
        })
        
        onMounted(()=>{
            console.log('store list',store.state.orderList)
        })

        return {
            user,orderList,getAllPrice
        }
    }
}
</script>
<style scoped>
.section{
    background: white;
    height: 100%;
    width: 55%;
    margin-top: 30px;
}

.aside{
    width: 45%;
    position: relative;
    border-left: 1px solid rgb(204, 203, 203) ;
    height: 100vh;
    background: rgb(245, 245, 245);
}


.cForm{
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    /* margin-right: 60px; */
}

.title{
    margin-right: 60px;
}

.cardSec{
    margin-right: 60px;
}

.leftSide{
    margin: 20px 60px 20px 0;
}

.userData{
    display: flex;
    align-items: center;
    border-top: 1px solid #d9d9d9;
}

.formText{
    font-weight: 500;
    font-size: 14px;
    font-family: 'Segoe UI';
}

.container{
    margin-top: 40px;
    margin-left: 40px;
    border-bottom: 1px solid rgb(204, 203, 203) ;
}

.container2{
    margin-left: 40px;
    padding: 20px 0;
    border-bottom: 1px solid rgb(204, 203, 203) ;
}

.container3{
    margin-left: 40px;
    padding: 20px 0;
}


.item-body{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0px;
    position: relative;
}

.item-content {
    position: absolute;
    left: 125px;
    font-weight: 500;
    font-size: 16px;
    font-family: 'Segoe UI';
}

.item-img{
    position: relative;
}

.item-img img{
    width: 80px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
}

.item-cnt{
    position: absolute;
    top: -5px;
    right: -5px;
}

.item-price{
    font-weight: 500;
    font-size: 16px;
    font-family: 'Segoe UI';
}

.priceText{
    font-weight: 500;
    font-size: 14px;
    font-family: 'Segoe UI';
}

.totalPrice{
    font-weight: 500;
    font-size: 18px;
    font-family: 'Segoe UI';
}

.card-content{
    border-top: 1px solid rgb(204, 203, 203);
    background: rgb(245, 245, 245);
}

@media(max-width:600px){
    .section{
        width: 100%;
    }

    .aside{
        width: 100%;
    }

    .cForm{
        width:100%;
    }
}

</style>