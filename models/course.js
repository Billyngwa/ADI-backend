const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Course = new schema({
    courseTitle:{
        type:String,
        require:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
   content:{
    type:String,
    require:true
   },  
    courseCode:{
    type:Number,
    require:true
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

module.exports = mongoose.model("News",Course);