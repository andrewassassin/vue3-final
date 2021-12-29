<template>
    <div class="itemBar" :style="inlineBgImage(src)">
        <h2 class="p-mt-5">代理品牌</h2>
        <hr size="8px" align="center" width="400px" class="p-my-4">
        <div class="p-mt-4 bar-list">              
                <ul class="p-mt-2 p-d-flex p-flex-wrap">
                    <li class="p-mr-6 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem;"></i> DALI</a>
                    </li>
                    <li @mouseover="changeBackground('029.jpg')" class="p-mr-5 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> KLIPSCH</a>
                    </li>
                        <li class="p-mr-5 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> EDIFIER</a>
                    </li>
                </ul>
                <ul class="p-mt-2">
                    <li class="p-mr-5 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> KEF</a>
                    </li>
                    <li class="p-mr-5 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> WHARFEDALE</a>
                    </li>
                    <li class="p-mr-5 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> YAMAHA</a>
                    </li>            
                </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            src:'033.jpg'
        }
    },
    methods: {
        inlineBgImage(image) {
            let bgImage = require('@/assets/img/' + image)

            return {
                backgroundImage: `url("${bgImage}")`,
            }
        },
        changeBackground(image){
            this.src = image
        }
    },
}
</script>

<style scoped>
.itemBar{
    background:rgb(3, 8, 53);
    background-position:62% 60px;
    background-attachment:fixed;
    background-repeat:no-repeat;
    background-size:460px 450px;
    position: fixed;
    top: 75px;
    left: 450px;
    z-index: 5;
    width: 900px;
    height: 400px;
    border-radius: 10px;
}

hr{
    background: blanchedalmond;
    float: left;
    margin-left:40px ;
}

.itemBar h2 {
    color: rgb(255, 255, 255);
    text-align: left;
    margin-left: 40px;
}

.bar-list {
    display: flex;
    flex-wrap: wrap;
    width: 480px;
}

.bar-list ul {
    width: 240px;
}

.bar-list li{
    float: left;
    list-style-type:none;
}

.bar-list a{
    color: rgb(240, 232, 232);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

</style>