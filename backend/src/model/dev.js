const {Schema, model}=require("mongoose");

const DevSchema=new Schema({    // Está definindo a estrutura da tabela Dev do banco de dados.
    nome:{
        type: String,   // Isso diz que o campo é do tipo String.
        required: true, // Isso diz que o campo é obrigatório no banco de dados.
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
    timestamps:true,    // Isso cria automaticamente 2 campos - createdAt e updatedAt.
});

module.exports=model('Dev',DevSchema);