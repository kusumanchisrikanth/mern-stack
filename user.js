var mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');



var userSchema = new mongoose.Schema({
  firstname:{
      type:String,
      maxlength:32,
      required:true,
      trim:true
  },
  lastname:{
        maxlength:32,
        required:false,
        trim:true,
        type:String,
  },
  Email:{
      trim:true,
      type:String,
      required:true,
      unique:true
  },
  userinfo:{
      type:String,
      trim:true
  },
  secure_password:{
      type:String,
      required:true,

  },
  salt:String,
  role:{
      type:Number,
      default:0
  },
  purchases:{
      type:Array,
      default:[]
  }
},{timestamps:true}
);
userSchema.virtual("password")
     .set(function(password){
         this._password=password
         this.salt=uuidv1();
         this.secure_password=this.ppassword(password)
     })
     .get(function(){
         return this._password
     })


userSchema.method={
    authenticate: function(plainpassword){
        return this.ppassword(plainpassword)===this.secure_password
    },
    ppassword:function(plainpassword){
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', salt)
                   .update(secure_password)
                   .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


module.exports=mongoose.model("user", userSchema);