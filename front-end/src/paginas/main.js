import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import './main.css';
import logo from '../imagens/logo.svg';
import like from '../imagens/like.svg';
import dislike from '../imagens/dislike.svg';
import api from "../servicos/api";

export default function Main({match}){
    const [usuarios,setUsuarios]=useState([]);
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
        </div>
    );
}