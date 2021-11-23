<template>
  <div class="create mt-5">
    <h3>新增商品</h3>
    <section class="py-3">
      <div class="container">
          <div class="row">
            <form id="createProductForm" v-on:submit.prevent="createForm($event)" class="container col-md-6 py-3">
                <div class="form-group">
                    <label for="productName">商品名稱</label>
                    <input type="text" v-model="product.name" id="productName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="productPrice">商品價格</label>
                    <input type="number" v-model="product.price" id="productPrice" class="form-control" min="1" max="90000" required>
                </div>
                <div class="upload">
                  <div class="upload-head">
                      <label class="btn btn-primary">
                        <input id="upload_img" style="display:none;" accept="image/*" @change="previewImage" type="file" multiple>
                         選擇圖片
                      </label>
                      <button class="btn btn-primary ml-3" @click="upload">上傳圖片</button>
                      <button class="btn btn-primary ml-3">Cancel</button>
                  </div>
                  <div class="upload-img">
                    <ScrollPanel class="scroll-panel">
                      <tbody id="cartTableBody" v-for="item, index in preview" :key="index">
                        <tr>
                            <td class="text-right">
                              <img :src="item" class=""  alt="圖片未顯示">
                            </td>
                            <td class="text-right"> {{ imgList[index].name}}</td>
                            <td class="text-right ml-3">size: {{ imgList[index].size/1024 }}KB</td>
                        </tr>
                      </tbody>
                    </ScrollPanel>
                  </div>
                </div>
                <div class="form-group">
                    <label for="productCategory">商品分類</label>
                    <select v-model="product.category" id="productCategory" class="form-control">
                        <option value="書架喇叭">書架喇叭</option>
                        <option value="腳架" selected>腳架</option>
                        <option value="墊材">墊材</option>
                        <option value="藍芽喇叭">藍芽喇叭</option>
                        <option value="落地喇叭">落地喇叭</option>
                    </select>
                </div>
                <div class="form-group my-4">
                    <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i> 新增商品</button>
                </div>
            </form>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      preview: [],
      imgList: [],
      showImg:false,
      product:{
        name:'',
        price:'',
        image:[],
        category: ''
      },
      api:''
    }
  }, 
  methods: {
    createForm () {
          //讀取圖片路徑
            this.image.forEach(img=>{
              this.product.image.push(img.name)
            })
            const product = {
              name: this.product.name,
              price: this.product.price,
              image: this.product.image,
              category: this.product.category ,
              createdAt: new Date().getTime()
            }
              const config = {
                headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
              };
              axios.post(`https://x-home.pcpogo.com/px/${this.api}.php?PDEBUG=andrewc`, product, config)
                  .then(response => {
                    console.log('res  ', response);
                  })
                  .catch(error => {
                    console.log('err',error);
                  });
    },
    previewImage (event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while(count --) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview.push(e.target.result);
          }
          this.imgList.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index ++;
        }
      }     
    },
    upload(){
      // console.log('preview',this.preview)
      console.log('preview',this.imgList)

    }
  }
}
</script>
<style scoped>

.upload{
  border: 1px solid black;
  box-sizing: border-box;
  width: 500px;
}

.upload-head{
  height: 60px;
  background: rgb(243, 243, 243);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.upload-img{
  height: 400px;
  margin: 0;
  padding: 20px;
}

.upload-img img{
  width: 80px;
  height: 80px;
  margin: 20px;
}

.scroll-panel{
  height: 350px;
}

</style>

