const express=require('express');   // "Importou" o módulo express
const servidor=express();           // Está criando um servidor

servidor.get("/",function(req,res){ // Método que cria uma resposta para uma determinada
    return res.send("Olá mundo");   // rota (neste caso a rota raiz, só o endereço).
});                                 
servidor.listen(9999);              // Passará a 'escutar' requisições nesta porta