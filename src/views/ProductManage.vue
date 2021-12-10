<template>
    <div class="p-mt-5 p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12">
            <h2>商品管理</h2>
        </div>
        <section>
            <table class="table table-border p-md-6">
                <thead >
                    <tr>
                    <th v-for="item in productTitle" :key="item.key" class="text-right">{{item}}</th>
                    </tr>
                </thead>
                <tbody id="cartTableBody" v-for="item in specification" :key="item.key">      
                    <tr>
                    <td v-for="column in item" :key="column.key">                                      
                        <p class="m-0 text-right">{{column}}</p> 
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
        const changeEdit= ref(false);
        const api = ref('product')
        const manageList = ref(null);
        const productTitle=  ref([]);


        function editBtn(){
            changeEdit.value=true
        }
        onMounted(() => {
            axios.get(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`)
                .then((response) => {
                console.log("res  ", response);
                response.data.forEach(item => {
                    // console.log('key',Object.keys(item))
                    productTitle.value.push(Object.keys(item))
                   
                });
                productTitle.value = productTitle.value[0]
                 console.log('productTitle.value',productTitle.value)
                manageList.value = response.data;
                
                })
                .catch((error) => {
                console.log("err", error);
                });
			
		});

        return{manageList,changeEdit,editBtn,productTitle}
    }
}
</script>