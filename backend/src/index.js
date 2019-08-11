const express=require('express');   // "Importou" o módulo express
const mongoose=require('mongoose'); // "Importou" o módulo mongoose
const cors=require('cors'); // "Importou" o módulo cors
const router=require("./rotas");    // "Importou" o arquivo 'rotas.js' que está na mesma pasta
const app=express();           // Está criando um servidor
const servidor=require('http').Server(app);
const io=require('socket.io')(servidor);

const usuariosConectados={};

io.on('connection',socket=>{
    const {usuario} = socket.handshake.query;
    usuariosConectados[usuario] = socket.id;  
    console.log(usuario,socket.id);
});

app.use(cors());
app.use(express.json());       // Faz com que o Express passe a tratar JSON naturalmente, pois o Express
                                    // por padrão não 'entende' JSON.
mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-gbc3e.mongodb.net/omnistack8?retryWrites=true&w=majority", {
    useNewUrlParser: true
});                                 // Se conectará ao banco de dados MongoDB

app.use((req,res,next) =>{
    req.io = io;
    req.usuariosConectados=usuariosConectados;

    return next();
});

app.use(router);               // A configuração feita em 'rotas' será adicionada a config do servidor.

servidor.listen(9999);              // Passará a 'escutar' requisições nesta porta