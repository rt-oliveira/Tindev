const {Schema, model}=require("mongoose");

const DevSchema=new Schema({
    nome:{
        type: String,
        required: true,
    },
    usuario:{
        type:String,
        required:true,
    },
    bio: String,
    avatar:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

module.exports=model('Dev',DevSchema);