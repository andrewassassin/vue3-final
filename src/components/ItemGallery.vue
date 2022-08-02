<template>
    <div class="p-md-6 p-col-12 p-d-flex p-flex-wrap p-jc-center">
        <div class="showImg p-md-12 p-col-12 p-d-flex p-jc-center">
            <Image v-if="!preLoad" class="focus" :src="changeImgSrc(focusIndex)" :key="focusIndex" alt="Image" width="400" preview />
            <Skeleton v-if="preLoad" width="400px" height="400px" class="skeleton-img" />
        </div>
        <div class="p-d-flex p-ai-center p-md-12 p-jc-center">
            <div class="slide-prev p-d-flex p-ai-center">
                <i v-show="left" @click="swipeLeft" class="pi pi-chevron-left" style="font-size: 2rem"></i>
            </div>
            <div id="slideList" ref="content" class="p-d-flex slide-list p-mx-2">
                <div v-for="(items,index) in slideData" :key="items.id" :id="`ae${index}`">                   
                    <li v-for="(item,idx) in items" :key="item.id"
                        @click="clickImg(index,idx)" 
                        :id="`${idx}`"
                        class="p-m-3"
                        :class="{box:chooseImg==`ae${index}${idx}`}"
                        >
                        <img v-if="!preLoad" :src="require(`../assets/img/${item}`)" alt="">
                    </li>   
                </div>
            </div>
            <div class="slide-prev p-d-flex p-ai-center">
                <i v-show="right" @click="swipeRight" class="pi pi-chevron-right" style="font-size: 2rem"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        slideList: {
            type: Array,
        },
        preLoad:{
            type:Boolean
        }
    },
    data () {
        return {
            slideData: [],
            focusIndex:'',
            left:false,
            right:true,
            chooseImg:'ae00',
        }
    },
    created(){
        
    },
    methods:{
        scrollTo(element, scrollPixels, duration) {
            let scroll;
            const scrollPos = element.scrollLeft;
            // Condition to check if scrolling is required
            if ( !( (scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) {
                // Get the start timestamp
                const startTime =
                "now" in window.performance
                    ? performance.now()
                    : new Date().getTime();
                const that = this
                scroll = function(timestamp) {
                    //Calculate the timeelapsed
                    const timeElapsed = timestamp - startTime;
                    //Calculate progress 
                    const progress = Math.min(timeElapsed / duration, 1);
                    //Set the scrolleft
                    element.scrollLeft = scrollPos + scrollPixels * progress;
                    that.showArrow(element.scrollLeft)
                    //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
                    if (timeElapsed < duration) {
                        //Request for animation
                        window.requestAnimationFrame(scroll);
                    } else {
                        return;
                    }
                }
                window.requestAnimationFrame(scroll);
            }
        },
        swipeLeft() {
            const content = document.getElementById('slideList')
            this.scrollTo(content, -400, 400);
        },
        swipeRight() {
            const content = document.getElementById('slideList')
            this.scrollTo(content, 400, 400);
        },
        clickImg(index,idx) {
            console.log('index', this.focusIndex)
            this.chooseImg=`ae${index}${idx}`
            this.focusIndex = this.slideData[index][idx]
        },
        showArrow(distance){
            if(distance>15){
                this.left = true
            }else{
                this.left = false
            }
            const allLens = this.slideData.reduce((total, item) => {
                const itemValue = item.length * 132
                return total + itemValue;
            }, 15);
            if(distance>=allLens-640){
                this.right = false
            }else{
                this.right = true
            }
        },
        changeImgSrc(src){
            return require(`../assets/img/${src}`)
        },
        parentMsg(idx){
            this.chooseImg=`ae${idx}0`
            this.focusIndex = this.slideData[idx][0]
            const content = document.getElementById('slideList')
            const distance = this.slideData.slice(0, idx).reduce((total, item) => {
                const itemValue = item.length * 132
                return total + itemValue;
            }, 15);
            console.log('distance',distance)
            this.showArrow(distance)
            // 移動至絕對位置
            content.scrollTo({ left:distance, behavior: 'smooth' })
        }
    },
    watch:{
        preLoad: {
            immediate: true,
            deep: true,
            handler(newValue) {
                if(newValue===false){
                    this.slideData = this.slideList
                    this.focusIndex = this.slideData[0][0]
                }
            }
        }
    }
}
</script>
<style scoped>
.slide-list{
    background-color: rgb(255, 255, 255);
    width: 60%;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
}

.slide-list li {
    display: inline-block;
    opacity: 0.3;
}

.slide-list li.box{
    opacity: 1;
    border: black 4px solid;
}

.slide-prev{
    height: 100px;
    width: 30px;
    background: transparent;
    cursor: pointer;
    transform: scale(.8);
    transition: all .1s ease-in-out;
}

.slide-prev:hover{
    transform: scale(1);
}

.slide-list img{
    width: 100px;
    height: 100px;
}

.showImg img{
    width:400px;
    height:400px;
}

.focus{
    animation:change .2s ease-in;
}

@keyframes change {
    0%{
        opacity: 0;
    }

    100%{
        opacity: 1;
    }
}

@media(max-width:600px){
    .slide-list{
        width: 50%;
    }
    .slide-list img{
        width: 50px;
        height: 50px;
    }
}
</style>