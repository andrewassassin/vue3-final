<template>
    <div>
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
                        <InputText id="productPrice" v-model="product.price" min="1"
                    max="90000" placeholder="商品價格" type="text"/>
                    </div>
                </div>
                <div class="p-field p-grid p-p-2">
                    <label class="p-col-12 p-md-12 p-mb-md-0 p-p-0">
                        商品圖片
                    </label>
                    <div class="upload p-col-12 p-md-12 p-p-0 p-mt-2">
                        <div class="upload-head p-d-flex p-flex-wrap p-jc-center p-ai-center">
                            <Button class="p-d-flex p-jc-center p-p-0" :class="{'p-disabled':disable}">
                                <label class="p-button-primary p-md-12 p-sm-12 p-col-12 choose-label" style="cursor:pointer">
                                    <input id="upload_img" style="display:none;" accept="image/*" @change="previewImage" type="file" multiple />
                                    選擇圖片
                                </label>
                            </Button>
                            <Button @click.prevent="upload" label="上傳圖片" :class="{'p-disabled':Notupload}" class="p-ml-3"/>
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
                                            <Button @click.prevent="deleteItem(index)" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"/>
                                        </td>
                                    </tr>
                                    <div v-if="Notupload" class="p-mt-5">已上傳完畢</div>
                                </ScrollPanel>
                            </table>
                        </div>
                    </div>
                </div>    
                <div class="p-field p-grid">
                    <label class="p-col-12 p-mb-2 p-md-12 p-mb-md-0">
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
import XLSX from "xlsx";
export default {
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
            },
            api: "insert",
            sellings :[
                { name: '書架喇叭', code: '書架喇叭' },
                { name: '擴大機', code: '擴大機' },
                { name: '便攜式喇叭', code: '便攜式喇叭' },
                { name: '落地喇叭', code: '落地喇叭' },
            ],
        };
    },
    created(){
        this.$store.state.src='carousel-1.jpg'
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
            const product = {
                name: this.product.name,
                price: this.product.price,
                image: this.product.image,
                category: this.product.category,
                createdAt: new Date().getTime(),
                specification: this.speciTable,
            };
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            await axios.post(`https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`,product,config)
            .then((response) => {
                console.log("res  ", response);
                this.$toast.add({severity:'success', summary: 'Success Message', detail:'上傳成功', life: 5000});
                location.reload()
            })
            .catch((error) => {
                console.log("err", error);
            });
        },
        previewImage(event) {
            var input = event.target;
            var reader = new FileReader();
            reader.onload = (e) => {
                this.preview.push(e.target.result);          
            };
            reader.readAsDataURL(input.files[0]);
            this.imgList.push(input.files[0]);
        },
        upload() {
            if( this.imgList.length===3){
                this.imgList.forEach((img) => {
                    this.product.image.push(img.name);
                });
                this.imgList = [];
                this.preview = [];
                this.Notupload = true
            }else{
                this.$toast.add({severity:'error', summary: 'Error Message', detail:'至少上傳三張圖片', life: 3000});
            }
        },
        deleteItem(idx) {
            this.preview.splice(idx, 1);
            this.imgList.splice(idx, 1);
            this.product.image.splice(idx, 1);
            this.disable = false
        },
        removeAllImg() {
            this.imgList = [];
            this.preview = [];
            this.product.image = [];
            this.disable = false
        },
        chooseExcel(event) {
            this.file = event.target.files ? event.target.files[0] : null;
            if (this.file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    /* Parse data */
                    const bstr = e.target.result;
                    const wb = XLSX.read(bstr, { type: "binary" });
                    /* Get first worksheet */
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                    this.speciTable = JSON.stringify(data);
                };
                reader.readAsBinaryString(this.file);
            }
        },
    },
    watch: {
        preview:  {
            handler: function () {
                this.preview.length === 3 ? this.disable=true : 1  
            },
            deep: true, 
        },
    },
}
</script>
<style scoped>
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


@media(max-width: 600px){
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
