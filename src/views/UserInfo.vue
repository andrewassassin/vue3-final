<template>
  <div class="p-mt-5 p-d-flex p-jc-center" >
    <div class="p-md-2 p-d-flex left-menu">
      <TieredMenu :model="items" />
    </div>
    <section class="p-md-6">
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        items: [
                {
                  label:'會員資料',
                  icon:'pi pi-fw pi-file',
                },
                {
                  label:'訂單狀態',
                  icon:'pi pi-fw pi-pencil',
                  items:[
                    {
                        label:'全部',
                        icon:'pi pi-fw pi-align-left'
                    },
                    {
                        label:'處理中',
                        icon:'pi pi-fw pi-align-right'
                    },
                  ]
                },
                {
                  label:'信用卡管理',
                  icon:'pi pi-fw pi-file',
                },
                {
                  label:'收藏名單',
                  icon:'pi pi-fw pi-file',
                },
             ]
      }
    },

}
</script>
<style scoped>
.left-menu{
  position: fixed;
  left: 100px;
}
</style>