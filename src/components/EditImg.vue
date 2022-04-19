<template>
    <div id="modal">
        <div class="DivOverlapMask">
            <div class="DivDialog p-md-4 p-col-12">
                <header class="p-d-flex p-jc-end p-mt-3">
                    <div class="p-mr-3">
                        <Button @click="closeBtn" icon="pi pi-times"  class="p-button-rounded p-button-plain p-button-text" />
                    </div>
                </header>
                <section class="edit-img-dialog">
                    <div class="p-md-12 p-col-12">
                        <h3>現在圖片</h3>
                        <div>{{prd.image}}</div>
                    </div>
                    <div class="p-md-12 p-col-12">
                        <h3>現在顏色</h3>
                        <div>{{prd.color}}</div>
                    </div>
                    <div class="p-md-12 p-col-12">
                        <h3>選擇顏色數量</h3>
                        <InputText v-model="colorNum" style="max-width:8rem;" class="p-mr-3"/>
                        <Button @click="testImg" label="套用" type="button" class="p-mr-2 p-button-info" style="width:8rem"/>
                    </div>
                    <div class="p-md-12 p-col-12">
                        <h3>每個顏色各有幾張</h3>
                        <div v-for="(list,idx) in imgName" class="p-my-3" :key="list">
                            <InputText v-model="list.name" style="max-width:8rem;" :id="idx" class="p-mr-3"/>
                            <InputText v-model="list.cnt" style="max-width:8rem;" :id="idx" class="p-mr-3"/>
                            <InputText v-model="list.color" style="max-width:8rem;" :id="idx" class="p-mr-3"/>
                            <Button @click="sendColor(idx)" label="送出顏色" type="button" class="p-mr-2 p-mt-3 p-button-info" style="width:8rem"/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import { ref,onMounted } from 'vue';
// import axios from "axios";
export default {
    props: {
        product: Object,
	},
    setup(props, { emit }){
        const colorNum = ref()
        const arr = ref([])
        const color = ref([])
        const imgName = ref([])
        const prd = ref({})
        onMounted(() => {
            prd.value = props.product
            console.log('id',prd.value)			
		});
        function testImg(){
            for(let i=0;i < colorNum.value;i++ ){
                imgName.value.push({})
                arr.value.push([])
            }
        }

        function getImg(jpg,n,iidx){
            for(let i =0;i<iidx;i++){
                let string = `${jpg}-`
                if(i===0) {
                i=''
                string= `${jpg}`
                }
                arr.value[n].push(`${string}${i}.jpg`)
            }
        }

        function sendColor(idx){
            getImg(imgName.value[idx].name,idx,imgName.value[idx].cnt)
            color.value.push(imgName.value[idx].color)
            prd.value.color = JSON.stringify( color.value)
            console.log('idx',idx)
            console.log('arr.value',arr.value)
            // prd.value.color = JSON.stringify(prd.value.color)
            prd.value.image = JSON.stringify(arr.value)
        }

        function closeBtn(){
            emit("closeModal");
        }

        return{colorNum,testImg,imgName,sendColor,closeBtn,prd}
    }
};
</script>
<style scoped>
#modal {
    position: fixed;
    z-index: 51;
    margin: 0;
    box-sizing: border-box;
    overflow-y: hidden;
}

.DivOverlapMask {
    z-index: 51;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: fixed;
    /* margin-top: 175px; */
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    background: rgba(32, 32, 32, 0.7);
}

/* Modal Dialog 層 */
.DivDialog {
    position: relative;
    height: 600px;
    margin: 0;
    padding: 0 30px;
    background-color: #ffffff;
    border-radius: 10px;
}

.edit-img-dialog{
    height: 500px;
    overflow-y: auto;
}


@media (max-width: 900px) {
    .DivDialog {
        position: fixed;
        /* width: 500px; */
        height: 600px;
        margin: 0;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
    }
    .p-scrollpanel{
        height: 330px;
    }

}
</style>
