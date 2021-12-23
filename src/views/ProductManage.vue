<template>
    <div class="p-mt-5 p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12">
            <h2>商品管理</h2>
        </div>
        <div class="p-md-12">
            <Button @click="filterGo" label="篩選" class="p-ml-3 p-btn-warn"/>
            <Button @click="deleteSelect" label="刪除所選品項" class="p-ml-3 p-btn-warn"/>
        </div>
        <section class="p-md-12 p-d-flex p-jc-center">
            <table class="pro-table" >
                <thead style="display:block;">
                    <tr class="p-text-left" >
                        <th class="">
                            <Checkbox  :value="1" @click="checkAll()" :checked="true" v-model="selectAllCheck" />
                        </th>
                        <th v-for="(item,idx) in productTitle" :key="item.key" :style="idx===3?'width:14rem;':'width:12rem;'">{{item}}</th>
                        <th class="">
                            <Button @click="selected === idx? saveBtn(idx):editBtn(idx)" :label="(selected === idx?'儲存':'編輯')" />
                        </th>
                    </tr>
                </thead>
                <ScrollPanel style="width: 100%; height: 600px">
                    <tbody >      
                        <tr class="product-list"  v-for="(item,idx) in filterList" :key="item">
                            <td >
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
                            <td >
                                <Button @click="selected === idx? saveBtn(idx):editBtn(idx)" :label="(selected === idx?'儲存':'編輯')" />
                            </td>     
                        </tr>         
                    </tbody>
                </ScrollPanel>
            </table>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import { ref,onMounted,watch } from 'vue';
export default {
    setup(){
        const selected = ref();
        const selectAllCheck= ref([]);
        const ifAllCheck = ref(false);
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
                `https://x-home.pcpogo.com/px/productManege.php?PDEBUG=andrewc`, manageList.value[idx],config)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log("err", error);
                });
        }
        function filterGo(){
            filterList.value = manageList.value.sort((a,b)=>a.price-b.price)
        }

        function checkAll(){
            if(ifAllCheck.value===false){
                manageList.value.forEach(item=>{
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

        return{manageList,editBtn,productTitle,selected,saveBtn,sellings,filterGo,inputTag,checkAll,selectAllCheck,ifAllCheck,
        deleteSelect,filterList}
    }
}
</script>
<style scoped>
.pro-table{
    border-top:1px rgb(211, 210, 210) solid;
    border-collapse: collapse;
}


th{
    height: 70px;
    padding: 10px;
}

td{
    height: 40px;
    padding: 10px;
}
.product-list{
    border-top:1px rgb(211, 210, 210) solid;
    border-bottom:1px rgb(211, 210, 210) solid;
}

.selectedClass{
    display: none;
}

</style>