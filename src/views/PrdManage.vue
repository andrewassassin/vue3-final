<template>
    <div class="ManagePage p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12 p-col-12">
            <h2>商品管理</h2>
        </div>
        <section class="p-md-8 p-col-12 p-d-flex p-jc-center">
            <DataTable :value="products" :paginator="true" class="p-md-12 p-col-12" :rows="10"
                dataKey="id" :rowHover="true" v-model:selection="selectedItem" v-model:filters="filters" filterDisplay="menu" :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                :globalFilterFields="['name','country.name','representative.name','status']"
                responsiveLayout="scroll">
                <template #header>
                    <div class="p-d-flex p-flex-wrap p-jc-center p-ai-center">
                        <h5 class="p-mx-3">搜尋產品</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        </span>
                        <Button type="click" @click.prevent="deleteItem()" label="刪除所選品項"  class="p-ml-5 p-button-info"/>
                    </div>
                </template>
                <template #empty>
                    No products found.
                </template>
                <template #loading>
                    Loading products data. Please wait.
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name">
                    <template #body="{data}">
                        <div v-if="selected !== data.id">{{data.name}}</div>
                        <InputText v-model="data.name" v-if="selected === data.id" style="max-width:8rem;"/>
                    </template>
                </Column>
                <Column field="price" header="Price" sortable dataType="numeric">
                    <template #body="{data}">
                        <div v-if="selected !== data.id">{{data.price}}</div>
                        <InputText v-model="data.price" v-if="selected === data.id" style="max-width:8rem;"/>
                    </template>
                    <template #filter="{filterModel}">
                        <InputNumber v-model="filterModel.value" />
                    </template>
                </Column>
                <Column field="image" header="Image" sortable>
                    <template #body="{data}">
                        <div v-if="selected !== data.id">{{data.image}}</div>
                        <InputText v-model="data.image" v-if="selected === data.id" style="width:24rem;"/>
                    </template>
                    <template #filter="{filterModel}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by Image"/>
                    </template>
                </Column>
                <Column field="category" header="Category">
                    <template #body="{data}">
                        <div v-if="selected !== data.id">{{data.category}}</div>
                        <Dropdown v-model="data.category" v-if="selected === data.id" :options="sellings" optionLabel="name"
                            optionValue="code" />
                    </template>
                </Column>
                <Column field="action" header="Action">
                    <template #body="{data}">   
                        <Button @click="selected === data.id? saveBtn(data.id):editBtn(data.id)" :label="selected === data.id?'Save':'Edit'" type="button" class="p-mr-2 p-button-outlined p-button-secondary" style="width:8rem"></Button>
                    </template>
                </Column>
            </DataTable>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import { ref,onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
    components: {
    },
    setup(){
        const products = ref();
        const selectedItem = ref();
        const selected = ref();
        const loading = ref(true);
        onMounted(() => {
            const options = {
				method: 'get',
				url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
				params: {
					cmd: 'show',
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				}
			}
            axios(options)
				.then(function (res) {
					console.log(res)    
                    products.value =res.data
                    loading.value = false; 
				})
				.catch(error => {
					console.log(error);
				})
			
		});
        const filters = ref({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            price: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            image: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
        });

        const sellings =ref([
            { name: '書架喇叭', code: '書架喇叭' },
            { name: '擴大機', code: '擴大機' },
            { name: '便攜式喇叭', code: '便攜式喇叭' },
            { name: '落地喇叭', code: '落地喇叭' },
        ])

        function editBtn(pid){
            selected.value = pid
        }

        async function saveBtn(pid){
            selected.value = 10000
            const product = JSON.stringify(products.value.filter(item=>item.id===pid)[0])
            const options = {
				method: 'get',
				url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
				params: {
					cmd: 'save',
                    data: product
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				}
			};
			await axios(options)
				.then(function (res) {
                    res.data.st==='OK'?console.log('修改成功'):1
				})
				.catch(error => {
					console.log(error);
				})
        }

        function deleteItem(){
            // console.log('selectedItem',selectedItem.value)
            selectedItem.value.forEach(item => {
                const index = products.value.map(ele=>ele.id).indexOf(item.id)
                products.value.splice(index,1)
            });
            selectedItem.value=[]
        }


        return{products,selectedItem,filters,loading,selected,sellings,editBtn,saveBtn,deleteItem}
    }
}
</script>
<style scoped>
.ManagePage{
    margin: 200px 0 50px 0;
}
@media(max-width:600px){
    .ManagePage{
        margin: 150px 0 50px 0;
    }
}


</style>