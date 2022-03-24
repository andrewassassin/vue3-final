<template>
    <div class="p-d-flex">
        <section class="p-d-flex section">
            <div class="p-md-3"></div>
            <form class="p-text-left p-md-9 p-jc-end cForm">
                <div class="p-d-flex p-ai-center">
                    <label class="p-md-2 p-text-bold">聯絡</label>
                    <label>{{user.username}}</label>
                </div>
                <div class="p-d-flex p-ai-center userData">
                    <label class="p-md-2 p-text-bold">電話</label>
                    <label>{{user.phone}}</label>
                </div>
                <div class="p-d-flex p-ai-center userData">
                    <label class="p-md-2 p-text-bold">名字</label>
                    <label>{{user.first_name}}</label>
                </div>
            </form>
        </section>
        <aside class="aside">
            <div class="container p-md-7 p-px-0">
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
            <div>
                
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
        onMounted(()=>{
            console.log('store list',store.state.orderList)
        })


        return {
            user,orderList,
        }
    }
}
</script>
<style scoped>
.cForm{
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    width: 60%;
}

.section{
    background: white;
    height: 100%;
    width: 55%;
}

.aside{
    width: 45%;
    position: relative;
    border-left: 1px solid rgb(204, 203, 203) ;
    height: 100vh;
    background: rgb(245, 245, 245);
}

.userData{
    display: flex;
    align-items: center;
    border-top: 1px solid #d9d9d9;
}

.container{
    margin-top: 40px;
    margin-left: 40px;
    border-bottom: 1px solid rgb(204, 203, 203) ;
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

</style>