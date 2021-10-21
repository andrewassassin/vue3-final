<template>
    <div class="itemBar">
        <h2 class="mt-5">代理品牌</h2>
        <hr size="8px" align="center" width="70%" class="my-4">
        <div class="mt-4 bar-list">              
                <ul class="mt-2 mt-lg-0">
                    <li class="nav-item mr-5 mt-3">
                      <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> DALI</a>
                  </li>
                  <li class="nav-item mr-5 mt-3">
                      <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> KLIPSCH</a>
                  </li>
                     <li class="nav-item mr-5 mt-3">
                      <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> EDIFIER</a>
                  </li>
                </ul>
                <ul class="mt-2 mt-lg-0">
                    <li class="nav-item mr-5 mt-3">
                      <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> KEF</a>
                  </li>
                    <li class="nav-item mr-5 mt-3">
                      <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> WHARFEDALE</a>
                  </li>
                    <li class="nav-item mr-5 mt-3">
                      <a href="/product"><i class="pi pi-caret-right" style="fontSize: 0.5rem"></i> YAMAHA</a>
                  </li>            
                </ul>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
.itemBar{
    background:rgb(3, 8, 53);
    position: fixed;
    margin-top: 75px;
    left: 450px;
    z-index: 1;
    width: 560px;
    height: 400px;
    border-radius: 10px;
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

.bar-list ul {
    width: 240px;
}

.bar-list li{
    float: left;
    list-style-type:none;
}

.bar-list a{
    color: rgb(240, 232, 232);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>