<template>
    <div class="p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12 p-col-12">
            <h2>商品管理</h2>
        </div>
        <div class="p-md-12 p-col-12">
            <Button @click="deleteSelect" label="刪除所選品項" class="p-ml-3 p-btn-warn filter-icon"/>
        </div>
        <section class="p-md-12 p-col-12 p-d-flex p-jc-center">
            <table :data="showList" class="pro-table">
                <thead class="p-md-12 p-col-10 p-py-0">
                    <tr class="p-text-left">
                        <th class="">
                            <Checkbox :value="1" @click="checkAll()" :checked="true" v-model="selectAllCheck" />
                        </th>
                        <th v-for="(item,idx) in productTitle" :key="item.key" :style="idx===3?'width:12rem;min-width:14rem;':'min-width:12rem;'">
                            <div class="p-d-flex p-jc-between filter-icon" style="cursor:pointer;">
                                <div @click="idx===2?filterPriceDown():none" class="p-d-flex p-ai-center">
                                    {{item}}                    
                                    <i v-show="idx===2" :class="{'pi-sort-amount-down': priceLow === true,'pi-sort-amount-up-alt': priceLow === false}" class="pi p-ml-2" style="font-size: 1rem;"></i>
                                </div>
                                <Button :id="idx" @click="priceFilter(idx)" icon="pi pi-filter" class="p-button-rounded p-button-text p-button-plain "/>
                                <transition>                           
                                    <FilterPage v-click-outside="closeBtn" v-if="isActive===idx" @apply="applyFilter" class="filter-page" />
                                </transition>
                            </div>
                        </th>
                    </tr>
                </thead>    
                <tbody class="p-md-12 p-col-10 p-pt-0" >      
                    <tr class="product-list" v-for="(item,idx) in showList" :key="item">
                        <td>
                            <div class="p-field-checkbox p-m-0">
                                <Checkbox :id="idx" :checked="true" :value="item.id" v-model="inputTag" />
                            </div>
                        </td>               
                        <td v-for="(column,order) in item" :key="order" style="min-width:12rem;max-width:14rem;" >  
                            <div class="p-text-left">                                  
                                <p :class="{'selectedClass': selected === idx}" class="p-m-0">{{column}}</p>
                            </div>  
                            <div class="p-d-flex p-jc-start">
                                <InputText v-show="selected === idx && order !== 'category'" style="width:10rem;max-width:14rem;" v-model="item[order]" :value="item[order]" type="text" />  
                            </div>  
                            <div class="p-d-flex p-jc-start">
                                <Dropdown
                                    v-show="selected === idx && order === 'category'"
                                    v-model="item[order]"
                                    :options="sellings"
                                    optionLabel="name"
                                    optionValue="code"
                                    style="width:10rem;max-width:12rem;"
                                    placeholder="商品分類" /> 
                            </div> 			
                        </td>
                        <td>
                            <Button @click="selected === idx? saveBtn(idx):editBtn(idx)" :label="(selected === idx?'儲存':'編輯')"/>
                        </td>     
                    </tr>         
                </tbody>
            </table>
        </section>
        <div style="margin-top: 15px">
                <Pagination
                    :currentPage="pageInfo.current"
                    :totalPage="pageInfo.totalPage"
                    @toPage="toPage"/>
			</div>
    </div>
</template>
<script>
import FilterPage from '@/components/FilterPage.vue'
import Pagination from '@/components/Pagination.vue';
import axios from "axios";
import { ref,onMounted,watch,reactive,computed } from 'vue';
import store from "@/store";
export default {
    components: {
      FilterPage,
      Pagination
    },
    setup(){
        store.state.src="carousel-2.jpg"
        const selected = ref();
        const selectAllCheck= ref([]);
        const ifAllCheck = ref(false);
        const isActive = ref();
        const priceLow = ref(false);
        const api = ref('product')
        const manageList = ref([]);
        const filterList = ref(null);
        const inputTag = ref([]);
        const productTitle=  ref([]);
        const sellings = ref([
			{ name: '書架喇叭', code: '書架喇叭' },
			{ name: '腳架', code: '腳架' },
			{ name: '墊材', code: '墊材' },
            { name: '藍芽喇叭', code: '藍芽喇叭' },
			{ name: '落地喇叭', code: '落地喇叭' },
        ]);
        const showList = computed(() => {
			const pageIndex = Math.floor(pageInfo.current % 10) === 0 ? 10 : Math.floor(pageInfo.current % 10);
			const first = pageIndex + 9 * (pageIndex - 1) - 1;
			const last = Math.min(pageIndex + 9 * pageIndex - 1, manageList.value.length - 1);
			// const pageMag = Math.floor((pageInfo.current - 1) / 10);

			let tmp = [];
			for (let index = first; index <= last; index++) {
				let tmpres = JSON.parse(JSON.stringify(manageList.value));
				// tmpres[index]['index'] = index + 1 + pageMag * 200;
				tmp.push(tmpres[index]);
			}
            console.log('tmp',tmp)
			return tmp;
		});

        const pageInfo = reactive({
			current: 1,
			total: 0,
			totalPage: 0,
		});

		function toPage(p) {
			document.body.scrollTop = 0;
			pageInfo.current = p;
		}

        function editBtn(idx){
            selected.value =idx
        }
        function saveBtn(idx){
            selected.value = -10
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            axios.post(`https://x-home.pcpogo.com/px/productManege.php?PDEBUG=andrewc`, showList.value[idx],config)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log("err", error);
                });
        }
        function filterPriceDown(){
            if(priceLow.value===false){
                showList.value = showList.value.sort((a,b)=>a.price-b.price).reverse()
                priceLow.value=true
            }else{
                showList.value.reverse()
                priceLow.value=false
            }
        }

        function priceFilter(idx){
            isActive.value = idx
        }

        function checkAll(){
            if(ifAllCheck.value===false){
                inputTag.value = showList.value.map(item=>item.id)
                ifAllCheck.value=true
            }else{
                inputTag.value=[]
                ifAllCheck.value=false
            }
        }

        function deleteSelect(){
            inputTag.value.forEach((item) => {
                const index = manageList.value.map((el) => el.id).indexOf(item);
                manageList.value.splice(index, 1);
            });
            inputTag.value = [];
        }

        function closeBtn(){
            isActive.value=false
        }

        function applyFilter(res){
            if(res.formData.ifEqual==="b"){
                showList.value = manageList.value.filter(item=>item.price>parseInt(res.formData.count))
            }else if(res.formData.ifEqual==="s"){
                showList.value = manageList.value.filter(item=>item.price<parseInt(res.formData.count))
            }else{
                showList.value = manageList.value.filter(item=>item.price==parseInt(res.formData.count))
            }        
        }
        onMounted(() => {
            pageInfo.current = 1;
            axios.get(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`)
                .then((response) => {
                    console.log("res  ", response);
                    response.data.forEach(item => {
                        delete item["specification"]
                        delete item["createdAt"]
                        productTitle.value.push(Object.keys(item))
                        manageList.value.push(item)

                        pageInfo.totalPage = 4;
                    
                    });
                    productTitle.value = productTitle.value[0]
                    showList.value = [...manageList.value]
                    pageInfo.total =showList.value.length;
                })
                .catch((error) => {
                    console.log("err", error);
                });
			
		});

        watch(inputTag, function (newVal) {
            console.log("newVal: ", newVal);
        });

        return{manageList,editBtn,productTitle,selected,saveBtn,sellings,filterPriceDown,inputTag,checkAll,selectAllCheck,
        deleteSelect,filterList,priceFilter,priceLow,isActive,closeBtn,applyFilter,
        toPage,pageInfo,showList}
    }
}
</script>
<style scoped>
.pro-table{
    border-top:1px rgb(211, 210, 210) solid;
    border-collapse: collapse;
    overflow-x: auto;
    white-space: nowrap; 
    display: block;
}

th{
    height: 70px;
    padding: 10px;
}

th:hover{
    background: rgb(230, 232, 238);
}

td{
    height: 40px;
    padding: 10px;
}

tbody{
    /* height:1000px; */
}

tbody tr:hover{
    background: rgb(230, 232, 238);
}
.product-list{
    border-top:1px rgb(211, 210, 210) solid;
    border-bottom:1px rgb(211, 210, 210) solid;
}

.selectedClass{
    display: none;
}

.filter-icon{
    position: relative;
}

.filter-page{
    position: absolute;
    background: white;
    left: 140px;
    top: 54px;
    height: 250px;
    z-index: 5;
    overflow: hidden;
}

.v-enter-active,
.v-leave-active {
    transition: all .1s ease;
}

.v-enter-from,
.v-leave-to {
    height: 0;
    opacity: 0;
}

.v-enter-to,
.v-leave-from {
    height: 250px;
    opacity: 1;
}

@media(max-width:600px){
    tbody{
        overflow-y:visible; 
        height: 500px;
    }


    .filter-icon{
        position: static;
    }


    .filter-page{
        left: -0px;
        top: 40%;
    }
}


</style>