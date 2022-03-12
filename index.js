const express =require("express")
const app=express();
const router=require('./router.js')
const cors=require('cors')
app.use(express.json())
app.use(cors({origin:"http://localhost:3000"}))
app.use(express.static(__dirname))
app.use('/',router)
app.listen(8080,()=>{console.log("server running on 8080")})


