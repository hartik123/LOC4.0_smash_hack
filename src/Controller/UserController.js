const bcryptjs = require('bcryptjs');
const models=require('../Model.js')


const register=async (req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;

    if(name!=""&& email!=""&& password!="")
    {
    let hashpass=bcryptjs.hashSync(password);
    let user=await models.UserModel({name:name,email:email,password:hashpass})
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
        res.send({ans:true})
    }
    else{
        res.send({ans:false})
    }
}
else{
    res.send({ans:false,m:"USer does not exist"})
}


}


module.exports.login=login
module.exports.register=register
