const express = require("express");
const router=express.Router();
const UserController=require("./src//Controller/UserController.js")

router.get('/',(req,res)=>console.log("HEllo"));

router.post('/login',UserController.login);
router.post('/register',UserController.register);



module.exports=router