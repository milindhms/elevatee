const fs = require("fs")
function pri(err,data){
    console.log("Sucessfull")
}
function email(err,data){
    let d=JSON.parse(data)
    let res=[]

    for (let i=0;i<d.length;i++){
        console.log(d[i].email)
        res.push(d[i].email)
    }
    fs.writeFile("email.txt",res.join("\n"),pri)
}
fs.readFile("users.json",'utf-8',email)


// Q2. Student Marks Report Generator

function report(err,data){
    let d=JSON.parse(data)
    let res=[]
    let sum=0
    n=d.length
    for (let i=0;i<n;i++){
        res.push(d[i].marks)
        sum=sum+d[i].marks
    }
    res=res.sort((x,y)=>y-x)
    console.log("Highest : ",res[0])
    console.log("Lowest : ",res[n-1])
    console.log("Average : ",sum/n)
    let ans =`Highest: ${res[0]}\nLowest: ${res[n - 1]}\nAverage: ${sum / n}`;
    fs.writeFile("report.txt",ans,pri)
}
fs.readFile("marks.json",'utf-8',report)


// Q3. Notification Service Simulator


function analysis(err,data){
    
}
fs.readFile("events.txt","utf-8",analysis)