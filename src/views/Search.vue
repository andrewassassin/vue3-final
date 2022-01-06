<template>
    <div class="p-my-5">
        <aside class="multi">
            <h5 class="p-mb-4 badge badge-secondary">進階搜尋</h5>
            <div>
                <h6>喇叭品牌</h6>
                <MultiSelect v-model="selectedBrand" :options="brands" optionLabel="name" placeholder="Select Brand" display="chip" />
            </div>
            <div class="p-mt-5">
                <h6>喇叭類別</h6>
                <MultiSelect v-model="selectCate" :options="category" optionLabel="category" placeholder="Select category" display="chip" />
            </div>
            <button @click="goMultiSearch" class="p-mt-5 btn btn-info">搜尋</button>
        </aside>
        <section class="p-mt-2" id="section">
            <h4 class="p-text-left">搜尋: {{ itemName }}</h4>
            <div class="row">
                <div class="p-md-4 person" v-for="(product, index) in threeList" :key="index">
                    <div class="card p-my-5 p-mx-2">
                        <div class="slide-img">
                            <img :src="require(`../assets/img/${product.image[1]}`)" class="card-img-top"/>
                            <div class="overlay">
                                <a :id="`${product.id}`" @click="goToProduct($event)" class="buy-btn">Buy Now</a>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">{{ product.name }}</h4>
                            <h4>
                                <span class="badge badge-info">
                                    {{ product.category }}
                                </span>
                            </h4>
                            <p class="card-text">$ {{ product.price }} NTD</p>
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
import { ref, onMounted, watch } from "vue";
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
        const api = ref("search");
        const selectedBrand = ref();
        const selectCate = ref();
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
            { category: "藍芽喇叭", code: "50" },
            { category: "墊材", code: "60" },
            { category: "書架喇叭", code: "80" },
            { category: "腳架", code: "80" },
        ]);
        const brandList = ref([]);
        const cateList = ref([]);
        watch(id.value, async () => {
            itemName.value = id.value.id;
            threeList.value = [];
            api.value = "search";
            await axios.post(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`, id.value.id)
                .then((response) => {
                    productList.value = response.data;
                    productList.value.forEach((item) => {
                        item.image = JSON.parse(item.image);
                        threeList.value.push(item);
                    });
                });
        });

        watch(selectedBrand, function (newVal) {
            // console.log("newVal: ", newVal);
            brandList.value = newVal;
            console.log("brandList: ", brandList.value);
        });
        watch(selectCate, function (newVal) {
            cateList.value = newVal;
            console.log("cateList: ", cateList.value);
        });

        onMounted(async () => {
            itemName.value = id.value.id;
            await axios
                .post(
                    `https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`,
                    id.value.id
                )
                .then((response) => {
                    productList.value = response.data;
                    productList.value.forEach((item) => {
                        item.image = JSON.parse(item.image);
                        threeList.value.push(item);
                    });
                });
        });
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
            console.log(" id.value", id.value);
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            const product = {
                name: brandList.value,
                category: cateList.value,
            };
            // console.log('product~',product)
            api.value = "multi";
            axios
                .post(
                    `https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`,
                    product,
                    config
                )
                .then((response) => {
                    // console.log("res", response.data);
                    productList.value = response.data;
                    productList.value.forEach((item) => {
                        item.image = JSON.parse(item.image);
                        threeList.value.push(item);
                    });
                });
        }
        return {
            productList,
            threeList,
            brandList,
            cateList,
            goToProduct,
            selectedBrand,
            selectCate,
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

#section {
    width: 60%;
}

.multi {
    margin-top: 80px;
    width: 30%;
}

.p-multiselect {
    width: 20rem;
}

.slide-img {
    height: 250px;
    position: relative;
}
.slide-img img {
    width: 50%;
    height: 100%;
    object-fit: cover;
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
    border-radius: 2px;
    margin: 0 auto 15px auto;
    padding: 15px;
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

.goBackBtn {
    background: rgba(170, 100, 9, 0.904);
    width: 40px;
    height: 40px;
    border: none;
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 1000;
    border-radius: 50%;
    cursor: pointer;
}
</style>