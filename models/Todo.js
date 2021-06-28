const mongoose = require("mongoose");


const ItemSchema = mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    desc: { 
        type:String,
        reuired:true  
    },
    createdDate:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Todo", ItemSchema);

