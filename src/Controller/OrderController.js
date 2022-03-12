const models=require('../Model.js')
const Razorpay=require('razorpay')


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




let options={
    key_id:"rzp_test_DnK1IvY3O5N98N",
    key_secret:"o58moAgKrOw9VhzPgSWSYngu"
}

//Key_ID
//rzp_test_DnK1IvY3O5N98N
//Key_secret
//o58moAgKrOw9VhzPgSWSYngu
const razor=new Razorpay(options);

const generateOrderId=(req,res)=>{
    
    var options2={
        amount:req.body.amount*100,
        currency:"INR"
    }
    console.log(options2)
    razor.orders.create(options2,(err,order)=>{
        console.log(err);
        console.log(order);
        if(err)
        {
            res.send({m:"Try again"})
        }
        else{
            res.send({order:order})
        }
    
    });
    



}


const allOrders=async (req,res)=>{

    let orders=await models.OrderModel.find({});
    res.send({orders:orders})
}

module.exports.createOrder=createOrder
module.exports.allOrders=allOrders
module.exports.generateOrderId=generateOrderId