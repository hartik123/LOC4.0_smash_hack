const mongoose=require('mongoose');
const uri="mongodb+srv://mongo:mongo@cluster0.9nefj.mongodb.net/scm?retryWrites=true&w=majority"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})


UserModel=mongoose.model("User",UserSchema)

module.exports.UserModel=UserModel;
