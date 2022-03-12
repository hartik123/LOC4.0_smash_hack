const mongoose=require('mongoose');
const uri="mongodb+srv://mongo:mongo@cluster0.9nefj.mongodb.net/scm?retryWrites=true&w=majority"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
const UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    cart:[{productId:{type:mongoose.Schema.Types.ObjectId},quantity:Number}]
})

const OrderSchema=mongoose.Schema({
    date:{type:Date ,default:Date.now()},
    description:String,
    cost:Number,
    status:{type:String,default:"Pending"},
    contact:String,
    email:String,
    transport:String

})


const RawMaterialSchema = mongoose.Schema({
    name:{type:String},
    stock:Number
})


const UserModel=mongoose.model("User",UserSchema)
const OrderModel=mongoose.model("Order",OrderSchema)
const RawMaterialModel=mongoose.model("RawMaterial",RawMaterialSchema)


module.exports.UserModel=UserModel;
