const Dev=require("../model/dev");

module.exports={
    async armazenar(req,res){
        //console.log(req.io,req.usuariosConectados);

        const {IdDev}=req.params;
        const {usuario}=req.headers;

        const usuarioLogado=await Dev.findById(usuario);
        const usuarioASeDarLike=await Dev.findById(IdDev);

        if(!usuarioASeDarLike){
            return res.status(400).json({erro: "Desenvolvedor não existe"});
        }

        if(usuarioASeDarLike.likes.includes(usuarioLogado._id)){
            const SocketLogado=req.usuariosConectados[usuario];
            const SocketTarget=req.usuariosConectados[IdDev];

            if(SocketLogado){
                req.io.to(SocketLogado).emit('match',usuarioASeDarLike);
            }

            if(SocketTarget){
                req.io.to(SocketTarget).emit('match',usuarioLogado);
            }
        }

        usuarioLogado.likes.push(usuarioASeDarLike._id);
        // Adiciona o usuário que deu like em sua array de likes.
        
        await usuarioLogado.save();

        return res.json(usuarioLogado);
    }
}