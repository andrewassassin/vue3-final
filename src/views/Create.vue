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
                <div class="form-group">
                    <input type="file" accept="image/*" @change="previewImage">
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
              <!-- 商品圖片預覽區塊 -->
            <div v-if="preview">
              <img :src="preview" />
              <p>file name: {{ image.name }}</p>
              <p>size: {{ image.size/1024 }}KB</p>
            </div>
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
      preview: null,
      image: [],
      showImg:false,
      product:{
        name:'',
        price:'',
        image:[],
        category: ''
      }
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
              axios.post("http://localhost/Amitproject/insert.php#/", product, config)
                  .then(response => {
                    console.log('res  ', response);
                  })
                  .catch(error => {
                    console.log('err',error);
                  });
    },
    previewImage (event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image.push(input.files[0])
        console.log('value',this.image)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
</script>
<style scoped>


</style>

