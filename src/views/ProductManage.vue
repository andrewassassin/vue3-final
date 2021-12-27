<template>
    <div class="p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12 p-col-12">
            <h2>商品管理</h2>
        </div>
        <div class="p-md-12 p-col-12">
            <Button @click="deleteSelect" label="刪除所選品項" class="p-ml-3 p-btn-warn filter-icon"/>
        </div>
        <FilterPage @closeBtn="closeBtn" @apply="applyFilter" :class="{active: isActive}" class="filter-page" />
        <section class="p-md-12 p-col-12 p-d-flex p-jc-center">
            <table class="pro-table">
                <thead class="p-md-12 p-col-10" style="display:block;">
                    <tr class="p-text-left" >
                        <th class="">
                            <Checkbox :value="1" @click="checkAll()" :checked="true" v-model="selectAllCheck" />
                        </th>
                        <th v-for="(item,idx) in productTitle" :key="item.key" :style="idx===3?'width:14rem;':'width:12rem;'">
                            <div class="p-d-flex p-jc-between " style="cursor:pointer;">
                                <div @click="idx===2?filterPriceDown():none" class="p-d-flex p-ai-center">
                                    {{item}}                    
                                    <i v-show="idx===2" :class="{'pi-sort-amount-down': priceLow === true,'pi-sort-amount-up-alt': priceLow === false}" class="pi p-ml-2" style="font-size: 1rem;"></i>
                                </div>
                                <Button @click="priceFilter" icon="pi pi-filter" class="p-button-rounded p-button-text p-button-plain filter-icon"/>
                            </div>
                        </th>
                    </tr>
                </thead>    
                    <tbody class="p-md-12 p-col-10">      
                        <tr class="product-list" v-for="(item,idx) in filterList" :key="item">
                            <td>
                                <div class="p-field-checkbox p-m-0">
                                    <Checkbox :id="idx" :checked="true" :value="item.id" v-model="inputTag" />
                                </div>
                            </td>               
                            <td v-for="(column,order) in item" :key="order" style="width:12rem;max-width:14rem;">  
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
                                <Button @click="selected === idx? saveBtn(idx):editBtn(idx)" :label="(selected === idx?'儲存':'編輯')" />
                            </td>     
                        </tr>         
                    </tbody>
     
            </table>
        </section>
    </div>
</template>
<script>
import FilterPage from '@/components/FilterPage.vue'
import axios from "axios";
import { ref,onMounted,watch } from 'vue';
export default {
    components: {
      FilterPage
    },
    setup(){
        const selected = ref();
        const selectAllCheck= ref([]);
        const ifAllCheck = ref(false);
        const isActive = ref(false);
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
        function editBtn(idx){
            selected.value =idx
        }
        function saveBtn(idx){
            console.log('安安')
            selected.value = -10
            console.log('new value',manageList.value[idx])
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            axios.post(
                `https://x-home.pcpogo.com/px/productManege.php?PDEBUG=andrewc`, filterList.value[idx],config)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log("err", error);
                });
        }
        function filterPriceDown(){
            if(priceLow.value===false){
                filterList.value = filterList.value.sort((a,b)=>a.price-b.price)
                priceLow.value=true
            }else{
                filterList.value.reverse()
                priceLow.value=false
            }
        }

        function priceFilter(){
            isActive.value = true
        }

        function checkAll(){
            if(ifAllCheck.value===false){
                filterList.value.forEach(item=>{
                    if(inputTag.value.indexOf(item.id)===-1){
                        inputTag.value.push(item.id)
                    }
                    console.log('all new',inputTag.value)
                })
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
            console.log('res',res.formData.count)
            // const equal = res.formData.ifEqual
            if(res.formData.ifEqual==="b"){
                filterList.value = manageList.value.filter(item=>item.price>parseInt(res.formData.count))
            }else if(res.formData.ifEqual==="s"){
                filterList.value = manageList.value.filter(item=>item.price<parseInt(res.formData.count))
            }else{
                filterList.value = manageList.value.filter(item=>item.price==parseInt(res.formData.count))
            }
            // isActive.value = true
            
        }
        onMounted(() => {
            axios.get(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`)
                .then((response) => {
                console.log("res  ", response);
                response.data.forEach(item => {
                    delete item["specification"]
                    delete item["createdAt"]
                    productTitle.value.push(Object.keys(item))
                    manageList.value.push(item)
                   
                });
                productTitle.value = productTitle.value[0]
                filterList.value = [...manageList.value]
                })
                .catch((error) => {
                console.log("err", error);
                });
			
		});

        watch(inputTag, function (newVal) {
            console.log("newVal: ", newVal);
        });

        return{manageList,editBtn,productTitle,selected,saveBtn,sellings,filterPriceDown,inputTag,checkAll,selectAllCheck,
        deleteSelect,filterList,priceFilter,priceLow,isActive,closeBtn,applyFilter}
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
    overflow-y:auto;
    height:600px;
    display:block;
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
    left: 940px;
    top: 337px;
    height: 0px;
    opacity: 0;
    transition: all .3s ease;
    z-index: 5;
    overflow: hidden;
}

.filter-page.active{
    opacity: 1;
    height: 250px;
}

@media(max-width:600px){
    tbody{
        overflow-y:visible; 
        height: 500px;
    }

    .filter-page{
        left: 25%;
        top: 25%;
    }
}


</style>