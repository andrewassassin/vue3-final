<template>
    <div class="itemBar p-d-flex p-flex-wrap">   
        <section class="p-md-6">
            <div class="p-mr-3 close-btn">
                <Button @click="closeLeftMenu" icon="pi pi-times" class="p-button-rounded p-button-plain p-button-text" />  
            </div> 
            <h2 class="p-mt-5 p-md-6 p-col-12">代理品牌</h2>
            <hr size="8px" align="center" width="400px" class="p-my-4 p-mx-3">  
            <div class="p-mt-4 bar-list">              
                <ul class="p-mt-2 p-d-flex p-flex-wrap p-md-6 p-col-12">
                    <li class="p-md-12 p-col-12">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem;"></i> DALI</a>
                    </li>
                    <li @mouseover="changeBackground('029.jpg')" class="p-md-12 p-col-12 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> KLIPSCH</a>
                    </li>
                    <li class="p-md-12 p-col-12  p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> EDIFIER</a>
                    </li>
                </ul>
                <ul class="p-mt-2 p-d-flex p-flex-wrap p-md-6 p-col-12">
                    <li class="p-md-12 p-col-12">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> KEF</a>
                    </li>
                    <li class="p-md-12 p-col-12 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> WHARFEDALE</a>
                    </li>
                    <li class="p-md-12 p-col-12 p-mt-3">
                        <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> YAMAHA</a>
                    </li>            
                </ul>
            </div>
        </section>
        <section class="theme-page p-md-6" :style="inlineBgImage(src)"></section>
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
        },
        closeLeftMenu(){
            this.$emit("closeItem");
        }
    },
}
</script>

<style scoped>
.itemBar{
    background:rgb(3, 8, 53);
    top: 55px;
    left: 0px;
    z-index: 5;
    width: 900px;
    height: 400px;
    border-radius: 10px;
}

.theme-page{
    border-radius: 10px;
    background-position: center;
    background-size: cover;
    background-repeat:no-repeat;
    transition: .3s ease;
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

.bar-list li{
    text-align: left;
    list-style-type:none;
}

.bar-list a{
    text-decoration: none;
    color: rgb(240, 232, 232);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.close-btn{
    display: none;
}

@media(max-width:600px){
    .itemBar{
        background:rgb(255, 255, 255);
        width: 100vw;
        height: 100vh;
        border-radius: 0px;
    }

    .itemBar h2 {
        color: black;
        text-align: left;
        margin-left: 40px;
    }

    .bar-list li{
        text-align: left;
    }

    .bar-list a{
        text-align: center;
        color: black;
        font-size: 24px;
    }
    .theme-page{
        display: none;
    }
    
    .close-btn{
        display: block;
        position: relative;
        left: 200px;
        top: 10px;
        height: 50px;
    }
}
</style>