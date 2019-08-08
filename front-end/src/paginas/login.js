import React,{useState} from 'react';
import './login.css';
import logo from '../imagens/logo.svg'; // Está importando o logo do Tindev.
import api from '../servicos/api';  

export default function Login({history}){
    const [usuario,setUsuario]=useState('');
    async function handleSubmit(e){
        e.preventDefault();
        const resposta=await api.post('/devs',{
            username:usuario
        });
        const {_id}=resposta.data;
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input placeholder="Usuário do GitHub" value={usuario}
                onChange={e=> setUsuario(e.target.value)}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}