import React,{useEffect,useState} from 'react';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';
import './main.css';
import logo from '../imagens/logo.svg';
import like from '../imagens/like.svg';
import dislike from '../imagens/dislike.svg';
import itsamatch from '../imagens/itsamatch.png';
import api from "../servicos/api";

export default function Main({match}){
    const [usuarios,setUsuarios]=useState([]);
    const [matchDev, setMatchDev]=useState(null);

    useEffect(() => {
        async function carregarUsuarios(){
            const resposta= await api.get('/devs',{
                headers: {
                    usuario: match.params.id
                }
            })
            setUsuarios(resposta.data);
        }
        carregarUsuarios();
    }, [match.params.id]);

    useEffect(()=>{
        const socket=io('http://localhost:9999',{
            query: {
                usuario: match.params.id
            }
        });

        socket.on('match',dev=>{
            setMatchDev(dev);
        });
    },[match.params.id]);

    async function darLike(id){
        await api.post(`devs/${id}/likes`,null, {
            headers:{ usuario:match.params.id}
        });

        setUsuarios(usuarios.filter(usuario => usuario._id!= id));
    }

    async function darDislike(id){
        await api.post(`devs/${id}/dislikes`,null, {
            headers:{ usuario:match.params.id}
        });

        setUsuarios(usuarios.filter(usuario => usuario._id!= id));
    }

    return (
        <div className="main-container">
            <Link to="/">
            <img src={logo} alt="Tindev"/>
            </Link>
                {
                    usuarios.length>0 ? (
                        <ul>
                            {usuarios.map(usuario => (
                                <li key={usuario._id}>
                                    <img src={usuario.avatar} alt={usuario.nome}/>
                                    <footer>
                                        <strong>{usuario.nome}</strong>
                                        <p>{usuario.bio}</p>
                                    </footer>
                                    <div className="buttons">
                                        <button type="button" onClick={() => darDislike(usuario._id)}>
                                            <img src={dislike} alt="Dislike"/>
                                        </button>
                                        <button type="button" onClick={() => darLike(usuario._id)}>
                                            <img src={like} alt="Like"/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="empty">
                            Acabou :(
                        </div>
                    )
                }
            {matchDev && (
                <div className="matchContainer">
                    <img src={itsamatch} alt="It's a Match"/>
                    <img className="avatar" src={matchDev.avatar} alt=""/>
                    <strong>{matchDev.nome}</strong>
                    <p>{matchDev.bio}</p>

                    <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
                </div>
            )}
        </div>
    );
}