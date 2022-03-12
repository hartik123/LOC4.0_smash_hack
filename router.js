const express = require("express");
const router=express.Router();
const UserController=require("./src//Controller/UserController.js")
const OrderController=require("./src//Controller/OrderController.js")
const RawMaterialController=require("./src//Controller/RawMaterialController.js")
const ProductController=require("./src/Controller/ProductController.js")
const multer=require('multer')

let StorageSettings=multer.diskStorage({
    destination:'images',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"__"+file.originalname)
    }
})

const uploader=multer({storage:StorageSettings})
router.get('/',(req,res)=>console.log("HEllo"));

router.post('/login',UserController.login);

router.post('/register',UserController.register);

router.get('/getAllOrders',OrderController.allOrders);

router.post('/addOrder',OrderController.createOrder);

router.post('/addRawMaterial',RawMaterialController.addStock)

router.get('/allRawMaterials',RawMaterialController.allRawMaterial)

router.post('/allProduct',ProductController.allProducts)

router.post('/addStock',ProductController.addStock)

router.post('/addProduct',uploader.single('image'),ProductController.addProduct)

router.post('/geneerateOrderId',OrderController.generateOrderId)




module.exports=router