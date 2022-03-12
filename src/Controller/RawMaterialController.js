const models=require('../Model.js')

const allRawMaterial=async (req,res)=>{

    let materials=await models.RawMaterialModel.find({});
    res.send({materials:materials});
}

const addStock=async (req,res)=>{
    let id=req.body.id;
    let quantity=req.body.quantity;
    let material=await models.RawMaterialModel.find({_id:id})
    if(material)
    {
        material=material[0];
        material.stock=material.stock+quantity;
        material.save((err,save)=>{
            if(err)
            {
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


module.exports.addStock=addStock
module.exports.allRawMaterial=allRawMaterial