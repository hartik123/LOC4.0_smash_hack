const models=require('../Model.js')


const createOrder=async (req,res)=>{
    let description=req.body.description
    let cost=req.body.cost
    let email=req.body.email;
    let contact=req.body.contact;
    let transport=req.body.transport;
    let order=await models.OrderModel({cost:cost,description:description,email:email,contact:contact,transport:transport})
    order.save((err,result)=>{
        if(err){
            res.send({ans:false})
        }
        else{
            res.send({ans:true})
        }
    })
}


const allOrders=async (req,res)=>{

    let orders=await models.OrderModel.find({});
    res.send({orders:orders})
}

module.exports.createOrder=createOrder
module.exports.allOrders=allOrders