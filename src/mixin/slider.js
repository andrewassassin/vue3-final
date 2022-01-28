// 目前把item.vue資料搬過來
const mixin = {
    data() {
        return {
            clickWait: false,
            timer: {},
            slideData: [],
            itemObj:[],
            focusIndex:1,
            showImg:false
        };
    },
    methods: {
        setTime() {
            this.timer = setTimeout(() => {
                this.clickWait = false;
            }, 500);
        },
        stopTime() {
            window.clearInterval(this.timer);
        },
        slideCtrl(slidesToShow=1) {
            if (this.clickWait) {
                return;
            }
            this.stopTime();
            this.clickWait = true;
    
            if (slidesToShow > 0) {
                if(this.focusIndex>0 ){
                    this.focusIndex=this.focusIndex-1
                }else if(this.focusIndex==0){
                    this.focusIndex += 2
                }
                // 移除最後一個
                const shiftItem = this.slideData.pop();
                this.slideData.unshift(shiftItem);
                this.setTime();
                return;
            }
            if (slidesToShow < 0) {
                if(this.focusIndex<2){
                    this.focusIndex++
                }else if(this.focusIndex == 2){
                    this.focusIndex = this.focusIndex-2
                    // console.log('this.focusIndex 內',this.focusIndex)
                }
        
                const shiftItem = this.slideData.shift();
                // 把移除的加到最後面
                this.slideData.push(shiftItem);
                // 註解掉的話只能點一次
                this.setTime();
                // return;
            }
        },
        clickImg(event,index) {
            // 直接靠map回傳的title屬性轉成陣列，做indexOf找出點選圖片的ref
            const ref = this.itemObj.map(item => item).indexOf(event.currentTarget.name)
            // 9/2=4.5   取四捨五入為5，但陣列從0開始，故-1
            const middleImg =  Math.round(this.slideData.length/2)-1
            // 如果我點的圖片在我的(中間為4)右邊
            if(index>middleImg){
                const needToSlice = index-middleImg
                this.focusIndex = ref 
                const shiftItem = this.slideData.splice(0,needToSlice);
                this.slideData = this.slideData.concat(shiftItem);
                this.setTime();
            // 如果我點的圖片在我的左邊
            }else{
                const needToSlice = -(middleImg-index)
                this.focusIndex = ref 
                const shiftItem = this.slideData.splice(needToSlice);
                this.slideData =[...shiftItem,...this.slideData]
                this.setTime();
            }
        }
    },
}
export default mixin