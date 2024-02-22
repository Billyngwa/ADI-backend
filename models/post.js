const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Posts = new schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        $ref:"Users"
    },
   content:{
    type:[Object],
    require:false
   },
   likes:{
    type:Number,
    require:false
   },
   shares:{
    type:Number,
    require:false
   },
   comments:{
    type:[String],
    require:false
   }
},
{
    timestamps:true
});

module.exports = mongoose.model("Posts",Posts);