// 1. Sum all transactions per user


let ob=[
  { user: "A", amount: 100 },
  { user: "B", amount: 200 },
  { user: "A", amount: 50 }
]
let res={}
n=ob.length
for (let i=0;i<n;i++){
    if (res[ob[i].user]){
        res[ob[i].user]=res[ob[i].user]+ob[i].amount;
    }else{
        res[ob[i].user]=ob[i].amount
    }
}
console.log(res)


// 2. Transform API response to object (id → name)


ob=[
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]
res={}
n=ob.length
for (let i=0;i<n;i++){
    if (!res[ob[i].id]){
        res[ob[i].id]=ob[i].name
    }
}
console.log(res);


// 3. Remove falsy values from object


ob={ a: 0, b: null, c: "hello", d: undefined, e: 5 };
n=ob.length
res={}
for (let i in ob){
    if (ob[i]!==undefined & ob[i]!==null & ob[i]!==0){
        res[i]=ob[i];
    }
}
console.log(res);


// 4. Check for permissions from roles


let roles={ admin:["read","write"], user:["read"], staff: ["write"]}
let checkRole="user"
let action="write"
n=roles[checkRole].length;
let flag=false
for (let i=0;i<n;i++){
    if (action===roles[checkRole][i]){
        flag=true
    }
}
console.log(flag)


// 5. Transform array of orders into revenue per category


ob=[
  { id: 1, category: "electronics", price: 100 },
  { id: 2, category: "clothes", price: 50 },
  { id: 3, category: "electronics", price: 200 }
]
res={}
n=ob.length
for (let i=0;i<n;i++){
    if (res[ob[i].category]){
        res[ob[i].category]=res[ob[i].category]+ob[i].price;
    }else{
        res[ob[i].category]=ob[i].price;
    }
}
console.log(res)


// 6. Remove duplicate objects by id


ob=[
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" }
]
res=[]
n=ob.length
for (let i=0;i<n-1;i++){
    for (let j=i+1;j<n;j++){
        if (ob[i]===ob[j]){
            co
        }
    }
}
console.log(ob)


// Question 7


ob={
  en: { hello: "Hello", bye: "Goodbye" },
  fr: { hello: "Bonjour", bye: "Au revoir" },
  es: { hello: "Hola" }
}
