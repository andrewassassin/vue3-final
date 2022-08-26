<template>
    <div class="p-my-5 p-d-flex p-flex-wrap p-jc-center">
        <aside class="p-mt-2 p-md-12 p-xl-3 p-lg-3 p-sm-12">
            <h3 class="p-mb-4 badge badge-secondary">進階搜尋</h3>
            <div>
                <h4>喇叭品牌</h4>
                <MultiSelect v-model="selectedBrand" :options="brands" optionLabel="name" placeholder="Select Brand" display="chip" />
            </div>
            <div class="p-mt-5">
                <h4>喇叭類別</h4>
                <MultiSelect v-model="selectCate" :options="category" optionLabel="category" placeholder="Select category" display="chip" />
            </div>
            <div class="p-mt-5">
                <h4>喇叭價格</h4>
                <InputText v-model="selectPrice.from" style="max-width:9rem;" class="p-mr-1"/>
                –
                <InputText v-model="selectPrice.to" style="max-width:9rem;" class="p-ml-1"/>
            </div>
            <Button @click="goMultiSearch" label="搜尋" class="p-mt-5 p-btn-info"/>
        </aside>
        <section class="p-mt-2 p-xl-9 p-lg-12 p-md-12 p-sm-12">
            <h2 class="p-text-left">搜尋: {{ itemName }}</h2>
            <div class="p-d-flex p-flex-wrap p-px-4">
                <div class="p-xl-4 p-lg-4 p-md-6 p-sm-12 p-col-12 person" v-for="(product, index) in threeList" :key="index">
                    <div class="p-my-5 p-d-flex p-flex-wrap p-jc-center">
                        <div class="slide-img p-d-flex p-jc-center p-ai-center p-mx-3 p-md-8">
                            <img :src="require(`../assets/img/${product.image[0][0]}`)" class=""/>
                            <div class="overlay">
                                <a :id="`${product.id}`" @click="goToProduct($event)" class="buy-btn">Buy Now</a>
                            </div>
                        </div>
                        <div class="p-md-12 p-col-12">
                            <h4>{{ product.name }}</h4>
                            <Badge :value="product.category" class="p-mt-2" size="large" severity="info"></Badge>
                            <p>$ {{ product.price }} NTD</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import MultiSelect from "primevue/multiselect";
import { ref,reactive, onMounted, watch } from "vue";
import Item from "@/views/Item";
import { useRouter } from "vue-router";
export default {
    components: {
        MultiSelect,
    },
    props: ["id"],
    setup(props) {
        const id = ref(props, "id");
        const itemName = ref("");
        const selectedBrand = ref();
        const selectCate = ref();
        const selectPrice = reactive({
            from:'',
            to:''
        });
        const router = useRouter();
        const productList = ref([]);
        const threeList = ref([]);
        const brands = ref([
            { name: "Edifier", code: "11" },
            { name: "Kef", code: "22" },
            { name: "Dali", code: "33" },
            { name: "Klipsch", code: "41" },
        ]);
        const category = ref([
            { category: "落地喇叭", code: "10" },
            { category: "便攜式喇叭", code: "50" },
            { category: "重低音", code: "60" },
            { category: "書架喇叭", code: "80" },
        ]);
        const brandList = ref([]);
        const cateList = ref([]);
        watch(id.value, async () => {
            threeList.value = [];
            searchApi()
        });

        watch(selectedBrand, function (newVal) {
            brandList.value = newVal;
        });
        watch(selectCate, function (newVal) {
            cateList.value = newVal;
        });

        onMounted(async () => {
            searchApi()
        });

        async function searchApi(){
            itemName.value = id.value.id;
            const options = {
                method: 'get',
                url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
                params: {
                    cmd: 'webSearch',
                    data: id.value.id
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
            await axios(options)
                .then((response) => {
                    productList.value = response.data;
                    productList.value.forEach((item) => {
                        item.image = JSON.parse(item.image);
                        threeList.value.push(item);
                    });
                });
        }
        
        function goToProduct(event) {
            const id = event.currentTarget.id;
            router.push({
                path: `/product/${id}`,
                component: Item,
            });
        }

        function goMultiSearch() {
            threeList.value = [];
            itemName.value = "";
            const product = {
                name: brandList.value,
                category: cateList.value,
                price: selectPrice
            };

            const options = {
                method: 'get',
                url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
                params: {
                    cmd: 'multi',
                    data: product
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
            axios(options)
                .then((response) => {
                    productList.value = response.data;
                    productList.value.forEach((item) => {
                        item.image = JSON.parse(item.image);
                        threeList.value.push(item);
                    });
                });
        }
        return {
            itemName,
            productList,
            threeList,
            brandList,
            cateList,
            goToProduct,
            selectedBrand,
            selectCate,
            selectPrice,
            goMultiSearch,
            brands,
            category,
        };
    },
};
</script>
<style scoped>
header {
    display: flex;
}

.p-multiselect {
    width: 20rem;
}

.slide-img {
    height: 400px;
    /* width: 80%; */
    position: relative;
}
.slide-img img {
    height: 300px;
    /* object-fit: cover; */
    box-sizing: border-box;
}

.overlay {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(58, 53, 53, 0.6);
    display: flex;
    justify-content: center;
    opacity: 0;
    align-items: center;
    transition: 0.1s opacity ease-in;
}
.buy-btn {
    width: 160px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: #252525;
    font-weight: 700;
    letter-spacing: 1px;
    font-family: calibri;
    border-radius: 20px;
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.2);
    text-decoration: none;
}
.buy-btn:hover {
    color: #ffffff;
    background-color: #2164e0;
    transition: all ease 0.3s;
}

.slide-img:hover .overlay {
    transition: 0.4s opacity ease-out;
    opacity: 1;
}

.fone-de {
    position: absolute;
    left: 50px;
}

.person {
    animation: fade 2s;
}

@keyframes fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>