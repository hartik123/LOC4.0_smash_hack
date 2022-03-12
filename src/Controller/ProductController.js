const models=require('../Model.js')

const addProduct=async (req,res)=>{

    let name=req.body.name
    let quantity=req.body.stock
    let description=req.body.description
    let price=req.body.price
    let image=req.file.path;
    let product=await models.ProductModel({name:name,stock:quantity, stock:quantity, description:description, price:price,image:image})
    product.save((err,result)=>{
        if(err){
            res.send({ans:false})
        }
        else{
            res.send({ans:true})
        }
    })
}

const allProducts=async (req,res)=>{
    let products=await models.ProductModel.find({});

    res.send({products:products})

}


const addStock=async (req,res)=>{
    let id=req.body.id;
    let stock=req.body.stock
try
{
    let product=await models.ProductModel.find({_id:id})
    
    if(product)
    {
        product=product[0]
        product.stock=product.stock+Number(stock);
        product.save((err,result)=>{
            if(err)
            {
                res.send({ans:false,m:"Unable to add stock"})
            }
            else{
                res.send({ans:true})
            }
        })
    }
    else{
        res.send({ans:false,m:"Product does not exist"})
    }
}
catch(err)
{
    res.send({ans:false})
}


}


module.exports.addProduct=addProduct
module.exports.allProducts=allProducts
module.exports.addStock=addStock