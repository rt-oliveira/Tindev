const express=require('express');   // "Importou" o módulo express
const mongoose=require('mongoose'); // "Importou" o módulo mongoose
const cors=require('cors'); // "Importou" o módulo cors
const router=require("./rotas");    // "Importou" o arquivo 'rotas.js' que está na mesma pasta
const servidor=express();           // Está criando um servidor
servidor.use(cors());
servidor.use(express.json());       // Faz com que o Express passe a tratar JSON naturalmente, pois o Express
                                    // por padrão não 'entende' JSON.
mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-gbc3e.mongodb.net/omnistack8?retryWrites=true&w=majority", {
    useNewUrlParser: true
});                                 // Se conectará ao banco de dados MongoDB
servidor.use(router);               // A configuração feita em 'rotas' será adicionada a config do servidor.
servidor.listen(9999);              // Passará a 'escutar' requisições nesta porta