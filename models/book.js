const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Books = new schema({
    bookTitle:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
   content:{
    type:String,
    required:true
   }
},
{
    timestamps:true
});

module.exports = mongoose.model("Books",Books);