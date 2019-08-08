import React,{useState} from 'react';
import './login.css';
import logo from '../imagens/logo.svg';  // Está importando o logo do Tindev.

export default function Login(){
    const [usuario,setUsuario]=useState('');
    function handleSubmit(e){
        e.preventDefault();
        console.log(usuario);
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