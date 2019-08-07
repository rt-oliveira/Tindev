const axios=require("axios");   // Módulo para facilitar acesso às APIs externas.
const Dev=require("../model/dev");

module.exports={
  async armazenar(req,res){
      const {username}=req.body;
      const usuarioExiste=await Dev.findOne({usuario:username});
      if(usuarioExiste)
        return res.json(usuarioExiste);
      const resposta=await axios.get(`https://api.github.com/users/${username}`); // Acessará a API
      const {name,bio,avatar_url} = resposta.data;
      const dev = await Dev.create({
          nome: name,
          usuario:username,
          bio,
          avatar:avatar_url,
        });
      return res.json(dev);
  },
  async listar(req,res){
    const {usuario}=req.headers;
    const usuarioLogado=await Dev.findById(usuario);
    const usuarios=await Dev.find({
      $and: [   // Só serão mostrados os usuário que passarem por todas as condições dadas dentro do AND.
        { _id: {$ne: usuario} }, // Vai filtrar o próprio usuário logado. $ne significa "diferente de".
        { _id: {$nin: usuarioLogado.likes}}, // Vai filtrar os desenvolvedores que ele já deu like.
        { _id: {$nin: usuarioLogado.dislikes}} // Vai filtrar os desenvolvedores que ele já deu dislike.
      ],
    });
    return res.json(usuarios);
  }
};