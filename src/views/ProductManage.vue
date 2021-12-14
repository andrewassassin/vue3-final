<template>
    <div class="p-mt-5 p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12">
            <h2>商品管理</h2>
        </div>
        <section class="p-md-12 p-d-flex p-jc-center">
            <table class="pro-table p-md-8 p-col-12">
                <thead >
                    <tr class="p-text-right">
                        <th v-for="item in productTitle" :key="item.key" class="text-right">{{item}}</th>
                    </tr>
                </thead>
                <tbody id="cartTableBody" v-for="(item,idx) in manageList" :key="item.key">      
                    <tr class="product-list">
                        <td v-for="(column,order) in item" :key="column">                                      
                            <p :class="{'selectedClass': selected === idx}"  class="p-m-0 p-text-right p-p-2">{{column}}</p>
                            <InputText :style="(selected === idx?'display:block;':'display:none;')" class="p-md-12"  :v-model="manageList[idx][order]" :value="manageList[idx][order]" type="text" /> 
                        </td> 
                        <td>
                            <Button @click="selected = idx;editBtn(idx)" :label="(selected === idx?'儲存':'編輯')"  class="p-ml-3"/>
                        </td>     
                    </tr>         
                </tbody>
            </table>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import { ref,onMounted} from 'vue';
export default {
    setup(){
        const selected = ref();
        const api = ref('product')
        const editLabel = ref('編輯')
        const manageList = ref([]);
        const productTitle=  ref([]);

        function editBtn(){
            console.log('idx',selected.value)
            if(editLabel.value==='儲存'){
                console.log('安安')
                // selected.value=1
            }

        }
        onMounted(() => {
            axios.get(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`)
                .then((response) => {
                console.log("res  ", response);
                response.data.forEach(item => {
                    delete item["specification"]
                    delete item["createdAt"]
                    productTitle.value.push(Object.keys(item))
                    manageList.value.push(Object.values(item))
                   
                });
                productTitle.value = productTitle.value[0]
                 console.log('productTitle.value',productTitle.value)
                 console.log('manageList.value',manageList.value)
                })
                .catch((error) => {
                console.log("err", error);
                });
			
		});

        return{manageList,editBtn,productTitle,selected,editLabel}
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