const express=require('express');
const router=express.Router(); //Cria um objeto que servirá para fazer as rotas.

router.get("/",function(req,res){                           // Método que cria uma resposta para uma 
    return res.json({mensagem: `Olá ${req.query.name}`});   // determinada rota (a rota raiz, no caso).
    // res.json faz com que um objeto seja retornado como resposta, em formato JSON.
    // req.query tem os parâmetros passados na URL, na requisição.
    // Exemplo: req.query.name

}); 

module.exports=router;