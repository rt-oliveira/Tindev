const express=require('express');   // "Importou" o módulo express
const router=require("./rotas");    // "Importou" o arquivo 'rotas.js' que está na mesma pasta
const servidor=express();           // Está criando um servidor
servidor.use(express.json());       // Faz com que o Express passe a tratar JSON naturalmente, pois o Express
                                    // por padrão não 'entende' JSON.
servidor.use(router);               // A configuração feita em 'rotas' será adicionada a config do servidor.
servidor.listen(9999);              // Passará a 'escutar' requisições nesta porta