<template>
    <div class="price-filter p-d-flex p-flex-wrap p-jc-center p-pb-2">
        <!-- <slot name="title">
          <InputText style="width:10rem;max-width:14rem;"> 
          </InputText>
        </slot> -->
        <div class="p-col-12 p-md-12 p-d-flex p-ai-center p-jc-center">
            <Dropdown
                v-model="big"
                :options="options"
                optionLabel="name"
                optionValue="code"
                class="p-text-left"
                style="width:12rem;"
                />
        </div>
        <div class="p-col-12 p-md-12 p-mt-2 p-d-flex p-ai-center p-jc-center">
            <InputText v-model="price" id="productPrice" min="1" max="90000" placeholder="商品價格" type="text" style="width:12rem;" required/>
        </div>
        <div class="p-col-12 p-md-12 p-d-flex p-jc-between p-ai-center p-px-0" style="width:12rem;">
            <Button type="submit" label="Clear"  class="p-button-sm"/>
            <Button type="submit" @click="apply" label="Apply" class="p-button-sm"/>
        </div>
    </div>
</template>
<script>
import { ref,watch } from 'vue';
export default {
    setup(props, target){
        const options = ref([
            { name: '大於', code: 'b' },
            { name: '等於', code: 'e' },
            { name: '小於', code: 's' },
        ]);
        const big = ref("b")
        const price = ref("")

        function apply(){
            const ifEqual = big.value
            const count  = price.value
            target.emit('apply', {
                formData: { 
                    ifEqual,
                    count
                }
            });
        }

        watch(big, function (newVal) {
            console.log("newVal: ", newVal);
        });

        return{options,big,price,apply}

    }
}
</script>
<style scoped>
.price-filter{
    width: 300px;
    border: 1px rgb(190, 190, 190) solid;
}

.close-btn{
    position: relative;
    margin-top: 10px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    transition: .3s ease;
}

.close{
    position: absolute;
    top: 20%;
    left: 51%;
    transform: translate(-50%,-50%);
}

.close-btn:hover{
    background: rgb(224, 224, 224);
}
</style>