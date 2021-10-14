<template>
  <div id="modal" class="container">
      <div class = "DivOverlapMask">
        <div class=" DivDialog">
          <div class="row justify-content-between">
              <h5 class="ml-3" >
                  <i class="fas fa-shopping-cart"></i> 購物車
              </h5>
              <button type="button" v-on:click.prevent="closeBtn()" class="close mb-3 mr-3" >
                &times;
              </button>
          </div>
          <div>
              <table class="table table-border">
                  <thead>
                      <tr>
                          <th>產品名稱</th>
                          <th class="text-right">單價</th>
                          <th class="text-right">數量</th>
                          <th class="text-right">總計</th>
                      </tr>
                  </thead>
                  <tbody id="cartTableBody" v-for="(item,idx) in itemList" :key="item.key">
                    <tr>
                        <td>
                            <div class="d-flex">
                                <input 
                                  type="checkbox" 
                                  :value="item.id" 
                                  v-model="item.rd"    
                                  @change="check($event)" 
                                  class="mr-2 mt-2"
                                > 
                                <button v-on:click.prevent="deleteBtn($event)" :id="`${idx}`" type="button" class="delete-btn btn btn-danger btn-sm mr-3">
                                    &times;
                                </button>
                                <div>
                                    <p class="m-0">{{item.name}}</p>
                                </div>
                            </div>
                        </td>
                        <td class="text-right">$ {{item.price}}</td>
                        <td class="text-right">
                          <button :id="`${idx}`" class="counter-btn" >-</button>
                            {{item.amount}}
                          <button :id="`${idx}`" class="counter-btn" >+</button>
                        </td>
                        <td class="text-right">$ {{item.price*item.amount}}</td>
                    </tr>
                  </tbody>
                  <tfoot id="cartTableFoot">
                    <tr>
                    <th>總金額</th>
                    <td colspan="3" class="text-right">$ {{getCartValue}}</td>
                    </tr>
                  </tfoot>
              </table>
          </div>
          <div class="text-right">
              <button id="clearCartBtn" @click.prevent="delSelected($event)" type="button" class="btn btn-warning">
                  <i class="fas fa-trash-alt"></i> 刪除所選品項
              </button>
              <button id="clearCartBtn" @click.prevent="clearBtn($event)" type="button" class="btn btn-danger">
                  <i class="fas fa-trash-alt"></i> 清空購物車
              </button>
              <button type="button" @click.prevent="closeBtn()" class="btn btn-secondary" >
                  <i class="fas fa-times"></i> 關閉
              </button>
          </div>
        </div> 
      </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
          key:'',
          checkBox:[],

        }
    },
    methods: {
      closeBtn () {
        this.$emit('closeBtn')
      },
      deleteBtn (event) {
        const idx = event.currentTarget.id
        this.itemList.splice(idx, 1)
        this.updateDataToStorage()
      },
      clearBtn () {
        this.$store.state.itemList=[]
        this.updateDataToStorage()
      },
      updateDataToStorage() {
        const itemListStr = JSON.stringify(this.itemList);
        localStorage.setItem(this.key, itemListStr);
      },
      check(event){
        if(event.target.checked){
          console.log(event.currentTarget)
          this.checkBox.push(event.currentTarget.value)
          console.log('checkbox',this.checkBox)
        }else{
            const index = this.checkBox.indexOf(event.currentTarget.value)
            if (index > -1) {
              this.checkBox.splice(index, 1);
            }
        }
        
      },
      delSelected(){      
        this.checkBox.forEach(item =>{
          const index = this.itemList.map(el=>el.id).indexOf(item)
          this.itemList.splice(index,1)
        })  
        this.checkBox=[] 
        // this.updateDataToStorage()
      }
    },
    created() {
        const itemListStr = localStorage.getItem(this.key);
        const defaultList = JSON.parse(itemListStr);
        this.$store.state.itemList = defaultList || []; 
    },
    computed: {
    // 2. 將 state 中的 Loaded 用 computed 抓出來給 userLoaded 做使用
        itemList() {
          console.log('vuex itemList ',this.$store.state.itemList)  
          return this.$store.state.itemList;
        },
        getCartValue () {
          return this.itemList.reduce((cartValue, item) => {
            const itemValue = item.price * item.amount
            return cartValue + itemValue
          }, 0)
        }
     },

     
}
</script>
<style >
#modal {
  position: fixed;
  z-index: 500000;
  margin:0;
  box-sizing: border-box;
}

.DivOverlapMask{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position:fixed;
  top:0px;
  left:0px;
  height:100%;
  width:100%;
  background:rgba(32, 32, 32, 0.7);
}

/* Modal Dialog 層 */
.DivDialog{
  position:fixed;
  width:800px;
  height:800px;
  margin:0;
  padding:20px;
  background-color: #ffffff;
  border-radius: 10px;
}

.close {
  font-size: 35px;
}

</style>
