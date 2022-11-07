

// Example 1:
// Input: [1,4,3,2]



var missingNumber = function(nums) {
    let sum =0
    nums.sort((a,b)=>a-b)
    for(let i=0;i<nums.length;i+=2){
        sum += Math.min(nums[i],nums[i+1])
    }
    return sum
}
console.log(missingNumber([1,4,3,2]))