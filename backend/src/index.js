const express=require('express');   // "Importou" o módulo express
const servidor=express();           // Está criando um servidor

servidor.get("/",function(req,res){                         // Método que cria uma resposta para uma 
    return res.json({mensagem: `Olá ${req.query.name}`});   // determinada rota (a rota raiz, no caso).
    // res.json faz com que um objeto seja retornado como resposta, em formato JSON.
    // req.query tem os parâmetros passados na URL, na requisição.
    // Exemplo: req.query.name

});                                 
servidor.listen(9999);              // Passará a 'escutar' requisições nesta porta