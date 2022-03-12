const mongoose=require('mongoose');
const uri="mongodb+srv://mongo:mongo@cluster0.9nefj.mongodb.net/scm?retryWrites=true&w=majority"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
const UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    cart:[{productId:{type:mongoose.Schema.Types.ObjectId},quantity:Number,description:String,price:Number,name:String}]
})

const OrderSchema=mongoose.Schema({
    date:{type:Date ,default:Date.now()},
    status:{type:String,default:"Pending"},
    contact:String,
    email:String,
    paymentId:String,
    name:String,
    productId:String,
    quantity:Number,
    address:String

})

const ProductSchema=mongoose.Schema({
    name:String,
    stock:{type:Number,min:0},
    price:{type:Number,min:0},
    description:String,
    warrenty:String,
    image:String
})

const RawMaterialSchema = mongoose.Schema({
    name:{type:String},
    stock:Number
})


const UserModel=mongoose.model("User",UserSchema)
const OrderModel=mongoose.model("Order",OrderSchema)
const RawMaterialModel=mongoose.model("RawMaterial",RawMaterialSchema)
const ProductModel=mongoose.model("Product",ProductSchema)


module.exports.UserModel=UserModel;
module.exports.OrderModel=OrderModel;
module.exports.RawMaterialModel=RawMaterialModel;
module.exports.ProductModel=ProductModel;

