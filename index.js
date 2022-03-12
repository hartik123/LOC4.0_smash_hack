const express =require("express")
const app=express();
const router=require('./router.js')
app.use(express.json())
app.use('/',router)








app.listen(8080,()=>{console.log("server running on 8080")})


