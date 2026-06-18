const express=require("express")
const app=express();
const {z}=require("zod")
const port=3000;
app.use(express.json())

const Schema=z.object({
    task:z.string().max(20)
})

let todo=[]
let cnt=1
app.get("/todo",(req,res)=>{
    res.json({
        "TODO LIST": todo
    })
})

app.post("/todo",(req,res)=>{
    const result=Schema.safeParse(req.body)
    if (!result.success){
        return res.json({
            success: false,
            message: "Incorrect Email or Password"
        })
    }
    const {task}=result.data
    let obj={
        id:cnt++,
        task,
        isComplete:false
    }
    todo.push(obj)
    res.status(201).json({
        success: true,
        data: obj,
        message: "Added Successfully"
    })
})

app.put("/todo/:id",(req,res)=>{
    const id=Number(req.params.id)
    const item=todo.find(t=>t.id===id)
    if (!item){
        return res.json({
            success: false,
            message: "Todo not found"
        })
    }
    item.isComplete=true
    res.json({
        success: true,
        task: item,
        message: "Task Completed"
    })
})

app.delete("/todo/:id",(req,res)=>{
    const id=Number(req.params.id)
    // const oglen=todo.length
    // todo = todo.filter(t => t.id !== id);
    // if (oglen===todo.length){
    //     return res.json({
    //         success: false,
    //         message: "Todo not found"
    //     })
    // }else{
    //     return res.json({
    //         success: true,
    //         message: "Todo deleted successfully"
    //     })
    // }
    const index=todo.findIndex(t=>t.id===id)
    todo.splice(index,1)
})


app.listen(port,()=>{
    console.log("Sever is running....")
})