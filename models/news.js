const mongoose = require("mongoose");
const schema = mongoose.Schema;

const News = new schema({
    title:{
        type:String,
        require:true
    },
    author:{
        $type:mongoose.Schema.Type.ObjectId,
        ref:"Users"
    },
   content:{
    type:String,
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

module.exports = mongoose.model("News",News);