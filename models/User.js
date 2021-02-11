const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    contra: String ,
});
UserSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('contra ')){
        return next();
    }
bcrypt.genSalt(10,(err,salt)=>{
    if(err){
        next(err);
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
        next(err);
        }
        bcrypt.hash(user.contra,salt,null,(err,hash)=>{
            if(err){
                next(err);
            }
           user.contra=hash;
            next();
        })
   })
})

})



module.exports = mongoose.model('User', UserSchema);