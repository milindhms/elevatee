// 1. Sum of element in array

let arr=[[1,2,3,4], [5,6,7,8], [10,4,2,1], [1], [-10, 8]];
let n=arr.length;
let ans=[]
for (let i=0;i<n;i++){
    let t =arr[i];
    let sum =0;
    for (let j=0;j<t.length;j++){
        sum=sum+t[j];
    }
    if (sum<0){
        ans.push(0)
    }else{
    ans.push(sum);
    }
}
console.log(ans)

//2. Find the Second Largest Number

let ar=[10, 25, 8, 99, 67];
ar=ar.sort((x,y)=>y-x);
console.log(ar[1])