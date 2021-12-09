<template>
    <div class="p-mt-5 p-d-flex p-flex-wrap p-jc-center">
        <div class="p-md-12">
            <h2>商品管理</h2>
        </div>
        <!-- <section class="p-md-10">
            <DataTable :value="manageList" :paginator="true" :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave">
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="price" header="Price"></Column>
                <Column field="image" header="Image"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="" header="">
                    <template #body>
                        <Button type="button" class="" label="Edit" />
					</template>
                </Column>
                <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" class="p-button-text" />
                </template>
                <template #paginatorend>
                    <Button type="button" icon="pi pi-cloud" class="p-button-text" />
                </template>
            </DataTable>    
        </section> -->
        <section class="p-md-10">
        <DataTable :value="manageList" editMode="row" dataKey="name" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="scroll">
                <Column field="id" header="ID" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="name" header="Name" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="price" header="Price" style="width:20%">
                <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="image" header="Image" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="category" header="Category" style="width:20%">
                <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
            </DataTable>
        </section>
    </div>
</template>
<script>
import axios from "axios";
import { ref,onMounted} from 'vue';
export default {
    setup(){
        const api = ref('product')
        const manageList = ref();
        const editingRows = ref([]);
        const onRowEditSave = (event) => {
            let { newData, index } = event;

            manageList.value[index] = newData;
        };
        onMounted(() => {
            axios.get(`https://x-home.pcpogo.com/px/${api.value}.php?PDEBUG=andrewc`)
                .then((response) => {
                console.log("res  ", response);
                manageList.value = response.data;
                })
                .catch((error) => {
                console.log("err", error);
                });
			
		});

        return{manageList,editingRows,onRowEditSave}
    }
}
</script>