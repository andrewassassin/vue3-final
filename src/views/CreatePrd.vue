<template>
    <div class="createPage">
        <h2>建立商品</h2>
        <section class="p-fluid p-d-flex p-jc-center section">
            <form class="p-md-6 p-xl-3 p-lg-6 p-sm-12 p-col-12">
                <div class="p-field p-grid">
                    <label for="productName" class="p-col-12 p-md-12 p-mb-md-0">
                        商品名稱
                    </label>
                    <div class="p-col-12 p-md-12 p-mt-2">
                        <InputText id="productName" v-model="product.name" placeholder="商品名稱" type="text" />
                    </div>
                </div>
                <div class="p-field p-grid">
                    <label for="productPrice" class="p-col-12 p-md-12 p-mb-md-0">
                        商品價格
                    </label>
                    <div class="p-col-12 p-md-12 p-mt-2">
                        <InputText id="productPrice" v-model="product.price" min="1" max="90000" placeholder="商品價格" type="text"/>
                    </div>
                </div>
                <div class="p-field p-grid p-p-2">
                    <label class="p-col-12 p-md-12 p-mb-md-0 p-p-0">
                        商品圖片
                    </label>
                    <div class="upload p-col-12 p-md-12 p-p-0 p-mt-2">
                        <div class="upload-head p-d-flex p-flex-wrap p-jc-center p-ai-center">
                            <Button class="p-d-flex p-jc-center p-p-0" :class="{'p-disabled':Notupload}">
                                <label class="p-button-primary p-md-12 p-sm-12 p-col-12 choose-label" style="cursor:pointer">
                                    <input id="upload_img" style="display:none;" accept="image/*" @change="previewImage" type="file" multiple />
                                    選擇圖片
                                </label>
                            </Button>
                            <Button @click.prevent="importImg" :label="!Notupload?'匯入':'匯入完畢'" :class="{'p-disabled':Notupload}" class="p-ml-3"/>
                            <Button @click.prevent="removeAllImg" label="取消"  :class="{'p-disabled':Notupload}" class="p-ml-3 "/>
                        </div>
                        <div class="upload-img p-d-flex p-jc-center">
                            <table id="cartTableBody" class="p-md-12 p-p-0">
                                <ScrollPanel class="scroll-panel">
                                    <tr v-for="(item, index) in preview" :key="index" class="p-d-flex p-ai-center">
                                        <td class="p-text-left p-md-3 p-col-3">
                                            <img :src="item" class="" alt="圖片未顯示" />
                                        </td>
                                        <td class="p-ml-2 p-text-left p-md-3 p-col-3">
                                            {{ imgList[index].name }}
                                        </td>
                                        <td class="p-text-left p-md-2 p-col-3">                                  
                                            {{ Math.round((imgList[index].size / 1024) * 10) / 10 }}KB
                                        </td>
                                        <td class="p-md-4 p-col-3 p-d-flex p-jc-center p-ai-center">
                                            <Button v-if="!Notupload" @click.prevent="deleteItem(index)" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"/>
                                        </td>
                                    </tr>
                                </ScrollPanel>
                            </table>
                        </div>
                    </div>
                </div>    
                <transition name="collapse">
                    <ImgColor v-if="showDetail" :product="product.image" @updColor="updColor"/>
                </transition>
                <div class="p-field p-grid p-mt-3">
                    <label class="p-col-12 p-mb-2 p-md-12 p-mb-md-0 ">
                        商品分類
                    </label>
                    <div class="p-col-12 p-md-12 p-mt-2">
                        <Dropdown
                            v-model="product.category"
                            :options="sellings"
                            optionLabel="name"
                            optionValue="code"
                            placeholder="商品分類" />
                    </div>
                </div>
                <div class="p-field p-grid">
                    <div class="p-col-12 p-md-12">
                        <Button class="p-d-flex p-jc-center p-p-0">
                            <label class="p-button-info p-md-12" style="cursor:pointer">
                                <input id="upload_img" style="display:none;" accept="image/*" @change="chooseExcel" type="file" multiple />
                                上傳產品規格
                            </label>
                        </Button>
                    </div>
                </div>
                <div class="p-field p-grid p-d-flex p-jc-center">
                    <div class="p-col-12 p-md-3">
                        <Button type="submit" @click.prevent="createForm($event)" label="Submit"  class=""/>
                    </div>
                </div>
            </form>
        </section>
    </div>
    <Toast baseZIndex=99 position="top-center" /> 
</template>

<script>
import axios from "axios";
import ImgColor from '@/components/ImgColor'
export default {   
    components:{
        ImgColor
    },
    data() {
        return {
            preview: [],
            disable:false,
            Notupload:false,
            imgList: [],
            speciTable: [],
            product: {
                name: "",
                price: "",
                image: [],
                category: "",
                color:[]
            },
            api: "product",
            sellings :[
                { name: '書架喇叭', code: '書架喇叭' },
                { name: '重地音', code: '重地音' },
                { name: '便攜式喇叭', code: '便攜式喇叭' },
                { name: '落地喇叭', code: '落地喇叭' },
            ],
            showDetail:false,
        };
    },
    methods: {
        async createForm() {
            if(this.product.category.length===0){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:'請選擇分類', life: 3000});
                return;
            }else if(this.product.image.length===0){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:'未上傳圖片', life: 3000});
                return;
            }else if(this.product.name===""){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:'未填寫名稱', life: 3000});
                return;
            }else if(this.product.price===""){
                this.$toast.add({severity:'error', summary: 'Error Message', detail:'未填寫價格', life: 3000});
                return;
            }
            this.imgList = [];
            this.preview = [];
            const product = {
                name: this.product.name,
                price: this.product.price,
                image: this.product.image,
                color:this.product.color,
                category: this.product.category,
                createdAt: new Date().getTime(),
                specification: this.speciTable,
            };
            const options = {
				method: 'get',
				url: `https://x-home.pcpogo.com/px/product.php?PDEBUG=andrewc`,
				params: {
					cmd: 'createPrd',
                    data:product
				},
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				}
			}
            axios(options)
                .then(response => {      
                    console.log("res  ", response);
                    this.$toast.add({severity:'success', summary: 'Success Message', detail:'上傳成功', life: 5000});
                    // location.reload()
                })    
                .catch((error) => {
                    console.log("err", error);
                });   
        },
        previewImage(event) {
            let input = event.target;
            let that = this
            for(let i = 0; i < input.files.length; i ++){
                let reader = new FileReader();       
                reader.onload = (e) => {
                    that.preview.push( e.target.result)     
                };    
                reader.readAsDataURL(input.files[i]);
                this.imgList.push(input.files[i]);
            }
        },
        importImg() {
            this.imgList.forEach((img) => {
                const obj = {}
                obj.name  = img.name
                this.product.image.push(obj);
            });
            this.Notupload = true
            this.showDetail = true    
        },
        deleteItem(idx) {
            this.preview.splice(idx, 1);
            this.imgList.splice(idx, 1);
            this.product.image.splice(idx, 1);
            
        },
        removeAllImg() {
            this.imgList = [];
            this.preview = [];
            this.product.image = [];
            
        },
        updColor(imgList,colorList){
            console.log('子組件',imgList,'子組件2',colorList)
            this.product.image = imgList
            this.product.color = colorList
        }
    },
}
</script>
<style scoped>
.createPage{
    margin: 200px 0 50px 0;
}

.upload {
    border: 1px solid black;
    margin: 0;
}

.upload .p-button{
    width: 25%;
    height: 40px;
}

.choose-label{
    height: 40px;
    vertical-align:middle;
    line-height: 40px;
}

.upload-head {
    height: 60px;
    background: rgb(243, 243, 243);
    margin: 0;
}

.upload-img {
    height: 400px;
}

.upload-img img {
    width: 80px;
    height: 80px;
    margin: 20px;
}

.scroll-panel {
    height: 350px;
}

.p-toast{
    top: 550px;
    z-index: 999;
}

.collapse-enter-active,
.collapse-leave-active {
    transition: all .3s ease;
}

.collapse-enter-from,
.collapse-leave-to {
    height: 0px;
    opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
    height: 800px;
    opacity: 1;
}


@media(max-width: 600px){
    .createPage{
        margin: 150px 0 50px 0;
    }

    .section{
        padding: 0 20px;
    }

    .upload-head {
        height: 150px;
        background: rgb(243, 243, 243);
        margin: 0;
    }

    .upload .p-button{
        width: 35%;
        height: 40px;
    }
}
</style>