const bcryptjs = require('bcryptjs');
const models=require('../Model.js')


const register=async (req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let cart=[];
    if(name!=""&& email!=""&& password!="")
    {
    let hashpass=bcryptjs.hashSync(password);
    let user=await models.UserModel({name:name,email:email,password:hashpass,cart:cart})
    user.save((err,result)=>{
        if(err){
            res.send({ans:false})
        }
        else{
            res.send({ans:true})
        }
    })
    }
    else{
        res.send({ans:false})
    }

}


const login=async (req,res)=>{

let email=req.body.email;
let password=req.body.password;
let user=await models.UserModel.find({email:email})

if(user)
{
    user=user[0];
    if(bcryptjs.compareSync(password,user.password))
    {
        res.send({ans:true,user:user})
    }
    else{
        res.send({ans:false})
    }
}
else{
    res.send({ans:false,m:"User does not exist"})
}


}

const addtoCart=async (req,res)=>{
    let id=req.body.id;
    let email=req.body.email;
    let quantity=req.body.quantity;
    
    try{
        let user=await models.UserModel.find({email:email})
        let product=await models.ProductModel.find({_id:id})
        
        if(user&&product)
        {
            user=user[0]
            product=product[0]

            let cartObject={productId:id,quantity:quantity,name:product.name,description:product.description,price:product.price}
            user.cart=[...user.cart,cartObject]
            user.save((err,result)=>{
                if(err){
                    res.send({ans:false})
                }
                else{
                    res.send({ans:true})
                }
            })
        }
        else{
            res.send({ans:false})
        }
    }
    catch(err)
    {   console.log(err)
        res.send({ans:false})
    }
}

const allUsers=async (req,res)=>{
    let users=models.UserModel.find({});
    res.send({ans:true,users:users})
}


const getCart=async (req,res)=>{
    let email=req.body.email;
    try{
        let user=await models.UserModel.find({email:email})
        if(user)
        {
            user=user[0]
            res.send({ans:true,cart:user.cart})
        }
        else{
            res.send({ans:false})
        }
    }
    catch{
        res.send({ans:false})
    }

}

module.exports.login=login
module.exports.register=register
module.exports.addtoCart=addtoCart
module.exports.getCart=getCart
module.exports.allUsers=allUsers


