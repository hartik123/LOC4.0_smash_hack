const express = require("express");
const router=express.Router();
const UserController=require("./src//Controller/UserController.js")
const OrderController=require("./src//Controller/OrderController.js")
const RawMaterialController=require("./src//Controller/RawMaterialController.js")



router.get('/',(req,res)=>console.log("HEllo"));

router.post('/login',UserController.login);

router.post('/register',UserController.register);

router.get('/getAllOrders',OrderController.allOrders);

router.post('/addOrder',OrderController.createOrder);

router.post('/addRawMaterial',RawMaterialController.addStock)

router.get('/allRawMaterials',RawMaterialController.allRawMaterial)





module.exports=router