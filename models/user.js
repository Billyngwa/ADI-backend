const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = new schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role: {
        type: String,
        require: false,
        default: 'USER'
    },
    otp:{
        type:Number,
        require:false,
        default:0
    },
    otpExpire:{
        type:String,
        require:false,
        default:0
    }
},
{
    timestamps:true
},
);
    const userModel = mongoose.model("Users",User);
module.exports = userModel;
