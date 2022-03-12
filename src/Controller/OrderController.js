const models=require('../Model.js')
const Razorpay=require('razorpay')
const nodemailer=require("nodemailer")


const createOrder=async (req,res)=>{
    let email=req.body.email;
    let contact=req.body.phone;
    let name=req.body.name;
    let id=req.body.id;
    let address=req.body.address;
    let quantity=req.body.quantity;
    let paymentId=req.body.paymentId;
    let order=await models.OrderModel({email:email,address:address,contact:contact,name:name,productId:id,quantity:quantity,paymentId:paymentId});
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



const updateOrderStatus=async (req,res)=>{
    let id=req.body.id;
    let updatedStatus=req.body.status;
    try{
        let order=await models.OrderModel.find({_id:id})
        order.status=updatedStatus;
        order.save((err,order)=>{
            if(err)
            {   console.log("first")
                res.send({ans:false})
            }
            else{
                if(updatedStatus.toLowerCase()=='delivered')
                {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'pithadiyahardik003@gmail.com',
                          pass: 'Hardik123'
                        }
                      });
                      
                      var mailOptions = {
                        from: 'pithadiyahardik003@gmail.com',
                        to: 'pithadiyahardik003@gmail.com',
                        subject: 'Related the delivery of product from SCM',
                        text: 'Thank you for using our product.Please keep supporting '
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }})
                }
                
                    

                res.send({ans:true})
            }
        })
    }
    catch(err)
    {   console.log("first")
        res.send({ans:false})
    }

}


const returnedOrder=async (req,res)=>{

    let orders=await models.OrderModel.find({status:'returned'})
    res.send({orders:orders})

}

const removeOrder=async (req,res)=>{
    let id=req.body.id;
    try{
    let order=await models.OrderModel.find({_id:id})
    order=order[0];
    if(order.staus=='returned')
    {  
        await models.OrderModel.remove({_id:id},(err,result)=>{
            if(err) {
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
    {  
        res.send({ans:false})
    }

}



module.exports.createOrder=createOrder
module.exports.allOrders=allOrders
module.exports.generateOrderId=generateOrderId
module.exports.updateOrderStatus=updateOrderStatus
module.exports.removeOrder=removeOrder
module.exports.returnedOrder=returnedOrder
