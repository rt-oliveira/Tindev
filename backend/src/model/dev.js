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
    },
    likes: [{      // Ao abrir com colchete, signfica que haverá uma coleção de elementos, e não apenas um.
        type: Schema.Types.ObjectId,    // Conterá os id's dos desenvolvedores que ele deu like.
        ref:'Dev',                    // Diz a referência de qual model terá o id, no caso, do desenvolvedor.
        // Isto "simula" um relacionamento em BDs relacionais.
    }],
    dislikes: [{      // Ao abrir com colchete, signfica que haverá uma coleção de elementos, e não apenas um.
        type: Schema.Types.ObjectId,    // Conterá os id's dos desenvolvedores que ele deu like.
        ref:'Dev',                    // Diz a referência de qual model terá o id, no caso, do desenvolvedor.
        // Isto "simula" um relacionamento em BDs relacionais.
    }],
},{
    timestamps:true,    // Isso cria automaticamente 2 campos - createdAt e updatedAt.
});

module.exports=model('Dev',DevSchema);