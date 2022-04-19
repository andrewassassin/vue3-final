<template>
    <section class="section p-d-flex p-ai-center p-jc-center">
        <div class="work-brench2">
            <i class="pi pi-map-marker i-custom p-mr-5"></i>
            <i class="pi pi-heart i-custom"></i>
        </div>
        <i @click="goIndex()" class="pi pi-slack p-ml-lg-2" style="fontSize: 2.5rem;cursor:pointer;"></i>
        <div class="work-brench p-d-flex p-ai-center">
            <form @submit.prevent="innerSearch($event)" class="search-bar p-mr-5">  
                <input v-model="searchBar" ref="myinput" @blur="blurFocus" :class="{ show: isExtend }" class="s-input" type="search" placeholder="Search" aria-label="Search">
                <i class="pi pi-search i-custom" @click="showInput" type="button"></i>          
            </form>
            <div class="cart-place p-mr-5" @click.prevent="openModal()" @mouseover="isHoverCart = true" @mouseleave="isHoverCart=false" v-bind:class="{ move: isHoverCart }">
                <div id="cartNumber" type="button" style="cursor:pointer;">{{changeCartNum}}</div>
                <i class="pi pi-shopping-cart i-custom" type="button"></i>  
            </div>
            <i v-if="isLogin" @click="toUserInfo" class="pi pi-user i-custom" type="button" aria-current="page"></i>     
        </div>
        <button @click="toggleBar()" v-click-outside="onClickOutside" class="nav-toggler" style="cursor:pointer;">
            <div class="line"></div>
        </button>
    </section>
</template>
<script>
export default {
    setup(){
        
        return {}
    }
}
</script>