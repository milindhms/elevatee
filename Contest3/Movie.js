const express=require('express')
const app=express()
const z=require("zod")

const checkValid=z.object({
    user: z.string().min(3),
    pass: z.string().min(6),
    email: z.string().email()
})

let cnt=1
let bid=1001

app.use(express.json())
const db = {
  users: [],
  movies: [
    {
      id:1,
      title:"Inception",
      genre:"Sci-Fi",
      duration:148,
      shows: [
        {
          showId:101,
          time:"10:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:102,
          time:"2:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:103,
          time:"6:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:2,
      title:"The Dark Knight",
      genre:"Action",
      duration:152,
      shows: [
        {
          showId:201,
          time:"11:00 AM",
          pricePerSeat:200,
          availableSeats:50
        },
        {
          showId:202,
          time:"3:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:203,
          time:"7:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    },
    {
      id:3,
      title:"Interstellar",
      genre:"Sci-Fi",
      duration:169,
      shows: [
        {
          showId:301,
          time:"12:00 PM",
          pricePerSeat:250,
          availableSeats:50
        },
        {
          showId:302,
          time:"5:00 PM",
          pricePerSeat:300,
          availableSeats:50
        }
      ]
    }
  ]
}
app.post("/signup",(req,res)=>{

    const result=checkValid.safeParse(req.body)
    if (!result.success){
        return res.json({
        success: false,
        message: "Invalid Input"
        })
    }

    const user=req.body.user
    const pass=req.body.pass
    const email=req.body.email

    const userExists = db.users.find(u => u.email === email);

    if (userExists){
        return res.json({
            success: false,
            message: "User already exists"
        })
    }
    db.users.push({
        id: cnt++,
        user: user,
        pass: pass,
        email: email
    })
    res.status(201).json({
        success: true,
        message: "User created successfully",
        userId: cnt-1
    })
})

app.post("/signin",(req,res)=>{

    const result=checkValid.safeParse(req.body)
    if (!result.success){
        return res.json({
        success: false,
        message: "Invalid Input"
        })
    }


    const user=req.body.user
    const pass=req.body.pass
    const email=req.body.email

    const userExists = db.users.find(u => u.email === email);

    if (userExists){
        const token = Math.random().toString()
        userExists.token=token
        res.status(200).json({
            success:true,
            message:"Signin successful",
            token:token
        })
    }
    return res.json({
        success:false,
        message:"Signin unsuccessful"
    })

})

app.get("/movies",(req,res)=>{
    res.json({
        data: db.movies
    })
})

app.get("/movies/:id",(req,res)=>{
    const id=Number(req.params.id)
    const mov=db.movies.find(u=>u.id===id)
    if (!mov){
        return res.status(404).json({
            "success":false,
            "message":"Movie not found"
        })
    }
    return res.json({
            data:mov
        })
})

app.get("/movies/:id/shows",(req,res)=>{
    const id=Number(req.params.id)
    const mov=db.movies.find(u=>u.id===id)
    if (!mov){
        return res.status(404).json({
            "success":false,
            "message":"Movie not found"
        })
    }
    return res.json({
            shows: mov.shows
        })
})

app.use((req,res,next)=>{
    const token=req.headers.token
    const userExists=db.users.find(u=>u.token===token)
    if (!userExists){
        return res.json({
            success: false,
            message: "User access denied"
        })
    }
    next()
})

app.post("/bookings/:id",(req,res)=>{

    const id=Number(req.params.id)
    const mid=req.body.mid
    const sid=req.body.sid
    const seats=req.body.seats

    const mov=db.movies.find(u=>u.id===mid)
    if (!mov){
        return res.status(404).json({
            "success":false,
            "message":"Movie not found"
        })
    }
    const show=mov.shows.find(s=>s.showId===sid)
    if (!show){
        return res.status(404).json({
            "success":false,
            "message":"Show not found"
        })
    }
    const avil_seats=show.availableSeats
    if (avil_seats<seats){
        return res.status(404).json({
            "success":false,
            "message":"Seats are unavailable"
        })
    }
    const userExists = db.users.find(u => u.id === id);
    const total = seats * show.pricePerSeat;
    const da=new Date().toISOString()
    if (!userExists.bookings) {
        userExists.bookings = [];
    }
    userExists.bookings.push({
        bid:bid++,
        mid:mid,
        sid:sid,
        seats:seats,
        totalAmount:total,
        status: "confirmed",
        bookingDate: da
    })
    show.availableSeats -= seats;
    res.json({
        "success":true,
        "message":"Booking successful",
        "bookingId":bid-1,
        "movieTitle":mov.title,
        "showTime":show.time,
        "seats":seats,
        "totalAmount":total
    })
})

app.get("/users",(req,res)=>{
    res.json({
        users: db.users
    })
})


app.listen(3000)