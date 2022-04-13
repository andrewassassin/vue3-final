<template>
        <div class="Dialog p-d-flex p-flex-wrap">   
            <section class="p-md-6">
                <div class="p-mr-3 close-btn">
                    <Button @click="closeLeftMenu" icon="pi pi-times" class="p-button-rounded p-button-plain p-button-text" />  
                </div> 
                <h2 class="p-mt-5 p-md-6 p-col-12">{{navTitle}}</h2>
                <hr size="8px" align="center" width="400px" class="p-my-4 p-mx-3">  
                <div class="p-mt-4 bar-list">              
                    <ul class="p-mt-2 p-d-flex p-flex-wrap p-md-6 p-col-12">
                        <li v-for="item in navList1" :key="item" @mouseover="changeBackground(item.bg)" class="p-md-12 p-col-12 p-mt-3 link">
                            <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> {{item.name}}</a>
                        </li>
                    </ul>
                    <ul class="p-mt-2 p-d-flex p-flex-wrap p-md-6 p-col-12">
                        <li v-for="item in navList2" :key="item" @mouseover="changeBackground(item.bg)" class="p-md-12 p-col-12 p-mt-3 link">
                            <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> {{item.name}}</a>
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
            src:'033.jpg',
            navTitle:'',
            navList1:[],
            navList2:[]
        }
    },
    props:{
        navObj: Object
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
        },
    },
    watch:{
        navObj: {
            immediate: true,
            deep: true,
            handler(newValue) {
                this.navTitle = newValue.title
                this.navList1 = newValue.content.slice(0,3)
                this.navList2 = newValue.content.slice(3,6)
                // this.src = this.navList1[0].bg
                this.navList1.forEach((item,idx)=>{
                    idx===0 ?this.src = item.bg:1
                })
                // console.log('this.src',this.src)
                // console.log('navList1 content  ',this.navList1[0])
            }
        }
    }
    
}
</script>

<style scoped>

.Dialog{
    width: 900px;
    height: 400px;
    background: #ffffff;
}

.theme-page{
    border-radius: 10px;
    background-position: center;
    background-size: cover;
    background-repeat:no-repeat;
    transition: .3s ease;
}

hr{
    background: rgb(0, 0, 0);
    float: left;
    margin-left:40px ;
}

.itemBar h2 {
    color: rgb(0, 0, 0);
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
    color: rgb(0, 0, 0);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.close-btn{
    display: none;
}

.pi-caret-right{
    visibility: hidden;
    opacity: 0;
    transition: all .3s ease;
    
}

.link:hover .pi-caret-right{
    visibility: visible;
    opacity: 1;
}

@media(max-width:900px){
    .Dialog h2 {
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