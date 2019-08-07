const express=require('express');
const DevController=require('./controller/devController');
const router=express.Router(); //Cria um objeto que servirá para fazer as rotas.

router.post("/devs",DevController.armazenar);   // Método que criará algo dentro da API REST.

module.exports=router;