const express =require("express")
const app=express();
const router=require('./router.js')
app.use(expree.json())
app.use('/',router)








app.listen(8080,()=>{console.log("server running on 8080")})


