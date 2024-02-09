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
    }

},
{
    timestamps:true
},
);
    const userModel = mongoose.model("Users",User);
module.exports = userModel;
