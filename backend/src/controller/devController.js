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
  }  
};