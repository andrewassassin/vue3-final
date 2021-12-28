
<template>
  <div v-click-outside="onClickOutside" class="click-outside">
      <h3>1 click outside</h3>
  </div>
   <div v-click-outside="vcoConfig" class="other-side">
       <h2>2 other side</h2>
   </div>
</template>
<script>
export default {
    data(){
        return{
            vcoConfig: {
                handler: this.handler,
                middleware: this.middleware,
                events: ['dblclick', 'click'],
                isActive: true,
                detectIFrame: true,
                capture: false
            }
       }
    },
    methods: {
        onClickOutside () {
            console.log('1')
        },
        handler () {
            console.log('2 other side')
        },
        middleware (event) {
            return event.target.className !== 'modal'
        }
    }
  };
</script>
<style scoped>
.click-outside{
    background: olivedrab;
}

.other-side{
    background: palevioletred;
}

.side{
    background: rgb(90, 183, 236);
}
</style>