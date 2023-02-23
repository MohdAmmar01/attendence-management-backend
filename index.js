const express=require('express')
const mongoose=require('mongoose')
const bp=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
const http=require('http')
const cp=require('cookie-parser')

const auth =require('./routes/auth')
const user =require('./routes/user')

const app=express()
const server=http.createServer(app)


dotenv.config()
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGOURL).then(console.log("connected successfully")).catch((e)=>{console.log(e)})


app.use(cors({ credentials : true,  origin: "https://attendence-management.onrender.com" }))
app.use(bp.json({limit:'5mb'}))
app.use(bp.urlencoded({limit:'5mb',extended:true}))
app.use(cp())

app.use('/api/user',auth)
app.use('/api/user',user)


server.listen(process.env.PORT || 8000,()=>{
console.log('server is listening on port 8000 ....')
})