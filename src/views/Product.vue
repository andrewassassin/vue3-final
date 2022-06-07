<template>
    <div>
        <section class="p-d-flex p-flex-wrap p-jc-center">
            <div class="p-xl-7 p-lg-8 p-md-12 p-sm-12 p-col-12">
            <h2 class="p-text-center p-mb-2">產品列表</h2>
                <SelectButton v-model="orderSort" :options="options" class="p-mt-5 p-mb-3" />
                <div class="p-d-flex p-flex-wrap">
                    <div class="p-col-12 p-xl-4 p-lg-6 p-md-6 p-sm-12 person" v-for="(product,index) in threeList" :key="index">
                        <div class="p-my-5 p-mx-3">
                            <div class="slide-img">
                                <img :src="require(`../assets/img/${product.image[0][0]}`)">       
                                <div class="overlay p-d-flex p-jc-center p-ai-center">
                                    <a :id="`${product.id}`" @click="goToProduct($event)" class="buy-btn">Buy Now</a>	
                                </div>
                            </div>
                            <div>
                                <h4>{{product.name}}</h4>
                                <Badge :value="product.category" class="p-mt-2" size="large" severity="info"></Badge>
                                <p> $ {{product.price}} NTD</p>               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { watch,onMounted,onBeforeUnmount,reactive,ref  } from 'vue';
import store from "@/store";
import { useRouter } from "vue-router";
import SelectButton from 'primevue/selectbutton';
import axios from 'axios'
import Item from '@/views/Item'
export default {
    name: 'Product',
    components: {
        SelectButton
    },
    setup () {
        store.state.src='carousel-3.jpg'
        const router = useRouter();
        const orderSort = ref('最新上架')
        const productList = ref([])
        const threeList = ref([])
        const options = ref(['價格由低至高', '最新上架','熱門排行'])
        const sortKey = reactive({name:""})
        const cmd =ref('')
        const count = ref(0)
        const showTop = ref(false)
     
        count.value = 0
        cmd.value = 'searchNew'
        showPrdApi()
        onMounted(()=>{
            window.addEventListener("scroll", scroll);
        })

        onBeforeUnmount(()=>{
            window.removeEventListener('scroll',scroll);
        })
        function scroll() {   
            let isLoading = false
            // 距離底部200px加載一次
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 400
            if (bottomOfWindow && isLoading == false) {
                showTop.value=true
                isLoading = true
                count.value += 6
                showPrdApi()
                isLoading = false
            }               
        }

        async function showPrdApi(){
            const options = {
                method: 'get',
                url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
                params: {
                    cmd: cmd.value,
                    count:count.value.toString()
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
            await axios(options)
                .then(response => {
                    productList.value = response.data
                    productList.value.splice(0,6).forEach(item=>{
                        item.image = JSON.parse(item.image);
                        threeList.value.push(item)
                    })
                })        
        }

        function goToProduct(event){   
            const id = event.currentTarget.id
            router.push({
                path: `/product/${id}`,
                component: Item,
            })    
        }

        watch(orderSort, function (newVal) {
            threeList.value=[]
            sortKey.name  = newVal
            if(sortKey.name=="價格由低至高"){
                cmd.value = 'sortByPrice'
            }else if(sortKey.name=="最新上架"){
                cmd.value = 'searchNew'
            }
            count.value = 0
            showPrdApi()
        });

        return {
            orderSort,
            productList,
            threeList,
            options,
            sortKey,
            cmd,
            count,
            showTop,
            goToProduct,
        }
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
    opacity: 0;
    transition: .1s opacity ease-in;
}
.buy-btn{
    cursor: pointer;
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