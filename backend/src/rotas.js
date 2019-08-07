const express=require('express');
const DevController=require('./controller/devController');
const LikeController=require('./controller/likeController');
const router=express.Router(); //Cria um objeto que servirá para fazer as rotas.

router.post("/devs",DevController.armazenar);   // Método que criará algo dentro da API REST.
router.post("/devs/:IdDev/likes",LikeController.armazenar);
// Esse ":algo" permite criar um parâmetro, que posteriormente pode ser recuperado dentro do método.

module.exports=router;