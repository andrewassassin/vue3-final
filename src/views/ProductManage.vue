<template>
    <div class="p-mt-5 p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12">
            <h2>商品管理</h2>
        </div>
        <section class="p-md-12 p-d-flex p-jc-center">
            <table class="pro-table p-md-8 p-col-12">
                <thead style="display:block;">
                    <tr class="p-text-left">
                        <th style="width:14rem" v-for="item in productTitle" :key="item.key" >{{item}}</th>
                    </tr>
                </thead>
                <ScrollPanel style="width: 100%; height: 600px">
                    <tbody id="cartTableBody">      
                        <tr class="product-list"  v-for="(item,idx) in manageList" :key="item">
                            <td v-for="(column,order) in item" :key="order" style="width:14rem">  
                                <div class="p-text-left">                                  
                                    <p :class="{'selectedClass': selected === idx}" class="p-m-0">{{column}}</p>
                                </div>  
                                <div class="p-d-flex p-jc-end">
                                    <InputText style="max-width:12rem" :style="(selected === idx?'display:block;':'display:none;')" v-model="item[order]" :value="item[order]" type="text" />  
                                </div>  			
                            </td>
                            <td>
                                <Button @click="selected === idx? saveBtn(idx):editBtn(idx)" :label="(selected === idx?'儲存':'編輯')" class="p-ml-3"/>
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
import { ref,onMounted } from 'vue';
export default {
    setup(){
        const selected = ref();
        const api = ref('product')
        const manageList = ref([]);
        const productTitle=  ref([]);
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

        return{manageList,editBtn,productTitle,selected,saveBtn}
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