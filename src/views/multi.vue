<template>
    <div>
        <InputText v-model="debouncedInput" @input="debouncedFunc" min="1" max="90000" placeholder="商品價格" type="text"/>
    </div>
    <Button @click="changeStyle" icon="pi" label="變色"  class=""/>
    <div class="bigr">
        <div class="shadow" :class="{bigsize:changeSize}" ></div>
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
        const changeSize = ref(false)

        const debouncedInput = ref("")
        const debounce = (func, delay = 300) => {
            let timeout = null;
            
            return (...args) => {
                const later = () => {
                    timeout = null;
                    func(...args);
                };
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

        function changeStyle(){
            changeSize.value = true
        }

        const debouncedFunc = debounce(displayDebouncedResult, DELAYED_TIME);

        return{
            debouncedInput,
            debouncedFunc,
            changeStyle,
            changeSize
        }
    }
}
</script>
<style scoped>

.bigr{
    position: relative;
    width: 300px;
    height: 300px;
}
.testImg{
    position: absolute;
    z-index: 80;
    width: 250px;
    height: 250px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 50%;
}
.shadow{
    position: absolute;
    z-index: 90;
    width: 260px;
    height: 260px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: white solid 60px;
    border-radius: 50%;
    transition: all .5s ease-out;
}

.shadow.bigsize{
    border: white solid 0px;
}
</style>