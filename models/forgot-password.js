const mongoose = require("mongoose");
const schema =mongoose.Schema;

const forgotPassword = new schema({
   email: {
       type:String,
       require:true
    }
})