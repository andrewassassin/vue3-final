<template>
  <div class="mt-5">
    <section class="py-3 section">
          <form v-on:submit.prevent="createForm($event)" class="createProductForm">
            <div class="create-form-group">
              <label for="productName">商品名稱</label>
              <input
                type="text"
                v-model="product.name"
                id="productName"
                class="form-control"
                required
              />
            </div>
            <div class="create-form-group">
              <label for="productPrice">商品價格</label>
              <input
                type="number"
                v-model="product.price"
                id="productPrice"
                class="form-control"
                min="1"
                max="90000"
                required
              />
            </div>
            <div class="upload">
              <div class="upload-head">
                <label class="btn btn-primary mb-0">
                  <input
                    id="upload_img"
                    style="display:none;"
                    accept="image/*"
                    @change="previewImage"
                    type="file"
                    multiple
                  />
                  選擇圖片
                </label>
                <button
                  type="click"
                  class="btn btn-primary ml-3"
                  @click.prevent="upload"
                >
                  上傳圖片
                </button>
                <button class="btn btn-primary ml-3" @click.prevent="removeAllImg">Cancel</button>
              </div>
              <div class="upload-img">
                <table id="cartTableBody">
                  <ScrollPanel class="scroll-panel">
                    <tr v-for="(item, index) in preview" :key="index">
                      <td class="text-left td-img">
                        <img :src="item" class="" alt="圖片未顯示" />
                      </td>
                      <td class="text-left td-img">
                        {{ imgList[index].name }}
                      </td>
                      <td class="text-left td-img">
                        size:
                        {{
                          Math.round((imgList[index].size / 1024) * 10) / 10
                        }}KB
                      </td>
                      <td
                        class="td-img row align-items-center justify-content-center"
                      >
                        <Button
                          @click.prevent="deleteItem(index)"
                          icon="pi pi-times"
                          class="p-button-rounded p-button-danger p-button-text"
                        />
                      </td>
                    </tr>
                  </ScrollPanel>
                </table>
              </div>
            </div>
            <div class="create-form-group">
              <label for="productCategory">商品分類</label>
              <select
                v-model="product.category"
                id="productCategory"
                class="form-control"
              >
                <option value="書架喇叭">書架喇叭</option>
                <option value="腳架" selected>腳架</option>
                <option value="墊材">墊材</option>
                <option value="藍芽喇叭">藍芽喇叭</option>
                <option value="落地喇叭">落地喇叭</option>
              </select>
            </div>
            <div class="create-form-group">
                <label class="btn btn-info mb-0">
                    <input
                        id="upload_img"
                        style="display:none;"
                        accept="image/*"
                        @change="chooseExcel"
                        type="file"
                        multiple
                    />
                    上傳產品規格
                </label>
            </div>
            <div class="create-form-group my-4">
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-plus"></i> Submit
              </button>
            </div>
          </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import XLSX from "xlsx"
export default {
    data() {
        return {
            preview: [],
            imgList: [],
            speciTable:[],
            product: {
                name: "",
                price: "",
                image: [],
                category: ""
            },
            api: "insert",
        }
    },
    methods: {
        createForm() {
            const product = {
                name: this.product.name,
                price: this.product.price,
                image: this.product.image,
                category: this.product.category,
                createdAt: new Date().getTime(),
                specification:this.speciTable
            };
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            axios
                .post( `https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`,product,config)
                .then((response) => {
                    console.log("res  ", response);
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
            // console.log('input.files[0]',input.files[0])
            reader.readAsDataURL(input.files[0]);
            this.imgList.push(input.files[0]);
        },
        upload() {
            //讀取圖片路徑
            this.imgList.forEach(img => {
                this.product.image.push(img.name);
            });
            console.log("product", this.product);
        },
        deleteItem(idx) {
            this.preview.splice(idx, 1);
            this.imgList.splice(idx, 1);
            this.product.image.splice(idx,1)
        },
        removeAllImg(){
            this.imgList=[]
            this.preview=[]
            this.product.image=[]
        },
        chooseExcel(event) {
            this.file = event.target.files ? event.target.files[0] : null;
            if (this.file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                console.log(data)
                this.speciTable = JSON.stringify(data)
                }

                reader.readAsBinaryString(this.file);
            }
        },      
    },
}
</script>
<style scoped>
.section {
  display: flex;
  justify-content: center;
}

.createProductForm {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 650px;
}

.create-form-group {
  width: 100%;
  padding: 20px 30px;
  display: flex;
  justify-content: center;
}

.create-form-group label {
    width: 100px;
}

.upload {
  border: 1px solid black;
  box-sizing: border-box;
  margin: 0;
  width: 800px;
}

.upload-head {
  height: 60px;
  background: rgb(243, 243, 243);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.upload-img {
  height: 400px;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.upload-img img {
  width: 80px;
  height: 80px;
  margin: 20px;
}

.scroll-panel {
  height: 350px;
}

#cartTableBody {
  width: 100%;
}

.td-img {
  width: 150px;
}
</style>
