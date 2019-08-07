const express=require('express');   // "Importou" o módulo express
const servidor=express();           // Está criando um servidor

servidor.get("/",function(req,res){             // Método que cria uma resposta para uma determinada
    return res.send(`Olá ${req.query.name}`);   // rota (neste caso a rota raiz, só o endereço).
    // req.query tem os parâmetros passados na URL, na requisição.
    // Exemplo: req.query.name
});                                 
servidor.listen(9999);              // Passará a 'escutar' requisições nesta porta