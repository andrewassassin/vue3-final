<template>
    <div id="modal" class="container">
        <div class="DivOverlapMask">
            <div class="DivDialog">
                <div class="row justify-content-between">
                    <h5 class="ml-3">
                        <i class="fas fa-shopping-cart"></i> 購物車
                    </h5>
                    <button
                        type="button"
                        v-on:click.prevent="closeBtn()"
                        class="close mb-3 mr-3"
                    >
                        &times;
                    </button>
                </div>
                <div>
                    <ScrollPanel
                        style="width: 100%; height: 600px"
                        class="custombar1"
                    >
                        <table class="table table-border">
                            <thead>
                                <tr>
                                    <th class="text-center"></th>
                                    <th class="text-center">產品名稱</th>
                                    <th class="text-right">單價</th>
                                    <th class="text-right">數量</th>
                                    <th class="text-right">總計</th>
                                </tr>
                            </thead>

                            <tbody
                                id="cartTableBody"
                                v-for="(item, idx) in itemList"
                                :key="item.key"
                            >
                                <tr>
                                    <td>
                                        <div
                                            class="
                                                d-flex
                                                row
                                                justify-content-center
                                            "
                                        >
                                            <Checkbox
                                                class="mr-2 mt-2"
                                                :value="item.id"
                                                v-model="inputTag"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <p class="m-0">{{ item.name }}</p>
                                        <img
                                            v-if="isShowImg"
                                            class="item-img"
                                            :src="
                                                require(`../assets/img/${item.image[1]}`)
                                            "
                                            alt=""
                                        />
                                    </td>
                                    <td class="text-right">
                                        $ {{ item.price }}
                                    </td>
                                    <td class="text-right">
                                        <i
                                            class="pi pi-minus-circle"
                                            @click="minusItem($event)"
                                            :id="`${idx}`"
                                            style="fontsize: 1rem"
                                            type="button"
                                        ></i>
                                        {{ item.amount }}
                                        <i
                                            class="pi pi-plus-circle"
                                            @click="plusItem($event)"
                                            :id="`${idx}`"
                                            style="fontsize: 1rem"
                                            type="button"
                                        ></i>
                                    </td>
                                    <td class="text-right">
                                        $ {{ item.price * item.amount }}
                                    </td>
                                </tr>
                            </tbody>

                            <tfoot id="cartTableFoot">
                                <tr>
                                    <th colspan="4" class="text-right">
                                        總金額
                                    </th>
                                    <td class="text-right">
                                        $ {{ getCartValue }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </ScrollPanel>
                </div>
                <div class="text-right">
                    <button
                        @click.prevent="delSelected($event)"
                        type="button"
                        class="delete-cart"
                    >
                        刪除所選品項
                    </button>
                    <button
                        id="clearCartBtn"
                        @click.prevent="clearBtn($event)"
                        type="button"
                        class="btn btn-danger ml-3"
                    >
                        <i class="fas fa-trash-alt"></i> 清空購物車
                    </button>
                    <button
                        type="button"
                        @click.prevent="closeBtn()"
                        class="btn btn-secondary ml-3"
                    >
                        <i class="fas fa-times"></i> 關閉
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ScrollPanel from "primevue/scrollpanel";
export default {
    data() {
        return {
            key: "cart",
            checkBox: [],
            inputTag: [],
            isShowImg: false,
        };
    },
    components: {
        ScrollPanel,
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
        clearBtn() {
            this.$store.state.itemList = [];
            this.updateDataToStorage();
            this.$store.dispatch("productToData");
        },
        updateDataToStorage() {
            const itemListStr = JSON.stringify(this.itemList);
            localStorage.setItem(this.key, itemListStr);
        },
        delSelected() {
            this.checkBox.forEach((item) => {
                const index = this.itemList.map((el) => el.id).indexOf(item);
                this.itemList.splice(index, 1);
            });
            this.inputTag = [];

            this.updateDataToStorage();
            this.$store.dispatch("productToData");
        },
    },
    async created() {
        await this.$store.dispatch("DataGetCart");
        this.isShowImg = true;

        console.log("itemList modal", this.itemList);
        // const itemListStr = localStorage.getItem(this.key);
        // const defaultList = JSON.parse(itemListStr);
        // this.$store.state.itemList = defaultList || [];
    },
    computed: {
        // 2. 將 state 中的 Loaded 用 computed 抓出來給 userLoaded 做使用
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
        inputTag: function (newval) {
            this.checkBox = newval;
            console.log("checkBox watch", this.checkBox);
        },
        itemList: {
            handler: function () {
                // console.log('itemList Change',newval)
                // console.log('length',newval.length)
                console.log("length", this.$store.getters.changeCartNum);
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
    position: fixed;
    width: 800px;
    height: 800px;
    margin: 0;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
}

.close {
    transform: scale(1.5);
}

.item-img {
    width: 100px;
    height: 100px;
}

.pi-plus-circle,
.pi-minus-circle {
    transition: 0.2s ease;
    border: none;
}

.pi-plus-circle:hover,
.pi-minus-circle:hover {
    color: #fff;
    background: rgb(17, 17, 17);
    border-radius: 40%;
}

.delete-cart {
    width: 150px;
    height: 40px;
    border: 1px #000000 solid;
    background: rgb(255, 255, 255);
    border-radius: 0;
    font-weight: bold;
    transition: 0.3s ease;
}

.delete-cart:hover {
    background: black;
    color: #fff;
}

@media (max-width: 600px) {
    .DivDialog {
        position: fixed;
        width: 500px;
        height: 600px;
        margin: 0;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
    }
}
</style>
