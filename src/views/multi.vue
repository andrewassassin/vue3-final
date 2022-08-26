<template>
    <div>
        <InputText v-model="debouncedInput" @input="debouncedFunc" min="1" max="90000" placeholder="商品價格" type="text"/>
    </div>
    <div class="cn-wrapper">
        <ul>
            <li v-for="(item,idx) in workbrench" class=" p-mr-2" :key="idx" style="cursor:pointer;">
                <i class="pi round p-d-flex p-ai-center p-jc-center" :class="item.name" style="font-size: 1.5rem"></i>
            </li>
        </ul>
    </div>
    <div class="bigr">
        <div class="shadow"></div>
        <img src="../assets/img/oberon-grille-closeup.jpg" class="testImg" alt="">
    </div>
</template>
<script>
import axios from "axios";
import {  onMounted,ref } from "vue";
export default {
    setup(){
        onMounted(()=>{
            console.log()
        })

        const workbrench = ref([
            {name:'pi-heart-fill'},
            {name:'pi-moon'},
            {name:'pi-github'},
            {name:'pi-facebook'},
            {name:'pi-google'}
        ])

        const debouncedInput = ref("")
        const debounce = (func, delay = 300) => {
            let timeout = null;
            
            return (...args) => {
                const later = () => {
                    timeout = null;
                    func(...args);
                };
                console.log('ji')
                clearTimeout(timeout);
                timeout = setTimeout(later, delay);
            };
        };
        const DELAYED_TIME = 300;
        // console.log('12345657890')

        function displayDebouncedResult(){
            const sendData = debouncedInput.value
            const options = {
                method: 'get',
                url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
                params: {
                    cmd: 'webSearch',
                    data: sendData
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
            axios(options)
                .then((res) => {
                    console.log('res',res)
                });
        }

        const debouncedFunc = debounce(displayDebouncedResult, DELAYED_TIME);

        return{
            workbrench,
            debouncedInput,
            debouncedFunc
        }
    }
}
</script>
<style scoped>
.cn-wrapper{
    width: 26em;
    height: 26em;
    overflow: hidden;
    position: fixed;
    z-index: 10;
    bottom: -13em;
    left: 50%;
    border-radius: 50%;
}

li{
    position:static;
    float:left;
    font-size:1em;
    /* height:5em;
    width:5em; */
    background-color: #eee;
    text-align:center;
    /* line-height:5em; */
}


li:first-child {
    transform: rotate(-10deg);
}

li:nth-child(2) {
    transform: rotate(30deg);
}

li:nth-child(3) {
    transform: rotate(70deg);
}
li:nth-child(4) {
    transform: rotate(110deg);
}

.bigr{
    position: relative;
    width: 300px;
    height: 300px;
}
.testImg{
    position: absolute;
    width: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.shadow{
    position: absolute;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>