<template>
    <div class="p-md-12 p-col-12 colorSec p-d-flex p-flex-wrap p-jc-center">
        <h3>填入數量與顏色</h3>
        <div v-for="(list,idx) in imgList" class="p-d-flex p-ai-center p-my-2" :key="list">
            <div class="p-mr-3">{{list.name}}</div>
            <div>
                <InputText v-model="list.cnt" style="max-width:8rem;" :id="idx" class="p-mr-3 p-md-2" placeholder="數量" />
                <InputText v-model="list.color" style="max-width:8rem;" :id="idx" class="p-mr-3" placeholder="顏色" />
            </div>
        </div>
        <Button @click="sendColor()" label="送出顏色" type="button" class="p-m-2 p-button-info" style="width:8rem"/>
    </div>
</template>
<script>
import { ref,onMounted } from "vue";
export default {    
    props: {
        product: Object,
	},
    setup(props,{emit}){
        const imgList = ref([])
        const nameArr = ref([])
        const colorArr = ref([])
        onMounted(()=>{
            imgList.value = props.product
            imgList.value.forEach(item=>{
                console.log(item)
                nameArr.value.push([])
            })
        })

        function getImg(jpg,cnt,iidx){
            jpg = jpg.replace(".jpg","")
            for(let i =0;i<cnt;i++){
                let string = `${jpg}-`
                if(i===0) {
                    i=''
                    string= `${jpg}`
                }
                nameArr.value[iidx].push(`${string}${i}.jpg`)
            }
        }

        function sendColor(){
            imgList.value.forEach((item,idx)=>{
                getImg(imgList.value[idx].name,imgList.value[idx].cnt,idx)
                colorArr.value.push(item.color)
            })
            console.log('nameArr',nameArr.value,'   colorArr',colorArr.value)
            emit("updColor",nameArr.value,colorArr.value);
        }
        return {imgList,sendColor}
    }
}
</script>
<style scoped>
.colorSec{
    border: 1px solid black;
}
</style>