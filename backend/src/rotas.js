const express=require('express');
const DevController=require('./controller/devController');
const LikeController=require('./controller/likeController');
const DislikeController=require('./controller/dislikeController');
const router=express.Router(); //Cria um objeto que servirá para fazer as rotas.

router.get("/devs",DevController.listar);   // Método que listará algo.
router.post("/devs",DevController.armazenar);   // Método que criará algo dentro da API REST.
router.post("/devs/:IdDev/likes",LikeController.armazenar);
// Esse ":algo" permite criar um parâmetro, que posteriormente pode ser recuperado dentro do método.
router.post("/devs/:IdDev/dislikes",DislikeController.armazenar);

module.exports=router;