<template>
    <div class="flex justify-middle" style="width: 100%">
        <div class="page-controller flex">
            <button
                class="icon-button icon-button--left"
                @click="addPage(-10)"
                v-if="btnShow(-10)"
            >
                {{ prevTen }}
            </button>
            <button
                class="icon-button icon-button--left"
                @click="addPage(-1)"
                v-if="btnShow(-1)"
            >
                {{ prevOne }}
            </button>
            <button
                v-for="p in pageArray"
                :key="p"
                :class="pageStyle(p)"
                @click="toPage(p)"
            >
                {{ p }}
            </button>
            <button
                class="icon-button icon-button--right"
                @click="addPage(1)"
                v-if="btnShow(1)"
            >
                後一頁 >
            </button>
            <button
                class="icon-button icon-button--right"
                @click="addPage(10)"
                v-if="btnShow(10)"
            >
                後十頁 >>
            </button>
        </div>
    </div>
</template>


<script>
import { computed, toRefs, watch } from "@vue/runtime-core";
export default {
    name: "Pagination",

    props: {
        currentPage: Number,
        totalPage: Number,
    },

    emits: ["toPage", "newTenPage"],

    setup(props, { emit }) {
        let { currentPage, totalPage } = toRefs(props);

        const prevTen = computed(() => {
            return "<< 前十頁";
        });
        const prevOne = computed(() => {
            return "< 前一頁";
        });

        const pageArray = computed(() => {
            let tmpPage = [];
            let i = Math.floor((currentPage.value - 1) / 10) * 10 + 1;
            for (let index = 0; index <= 9; index++) {
                if (i > totalPage.value) break;
                tmpPage.push(i);
                i++;
            }
            return tmpPage;
        });

        //當前頁數超過最大頁數時，設為最後一頁
        watch(
            () => currentPage.value,
            (val) => {
                if (!pageArray.value.includes(val)) {
                    const page = pageArray.value[pageArray.value.length - 1];
                    toPage(page);
                }
            }
        );

        function pageStyle(page) {
            return page === currentPage.value
                ? "button-solid button-solid-primary"
                : "button-no-outline";
        }

        function btnShow(p) {
            switch (p) {
                case -10:
                    if (pageArray.value[0] === 1) return false;
                    else return true;
                case -1:
                    if (currentPage.value === 1) return false;
                    else return true;
                case 10:
                    if (
                        totalPage.value <=
                        pageArray.value[pageArray.value.length - 1]
                    )
                        return false;
                    else return true;
                case 1:
                    if (totalPage.value <= currentPage.value) return false;
                    else return true;
                default:
                    return false;
            }
        }

        function toPage(p) {
            emit("toPage", p);
        }

        function addPage(num) {
            const nextPage = currentPage.value + num;

            if (
                Math.floor((nextPage - 1) / 10) !==
                Math.floor((currentPage.value - 1) / 10)
            ) {
                let i = Math.floor((nextPage - 1) / 10) * 10;
                emit("newTenPage", i);
            }
            emit("toPage", nextPage);
        }

        return {
            pageArray,

            //computed
            prevTen,
            prevOne,

            //function
            pageStyle,
            btnShow,
            toPage,
            addPage,
        };
    },
};
</script>

<style scoped>
</style>