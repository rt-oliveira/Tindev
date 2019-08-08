import React from 'react';
import './login.css';
import logo from '../imagens/logo.svg';  // Está importando o logo do Tindev.

export default function login(){
    return (
        <div className="login-container">
            <form>
                <img src={logo} alt="Tindev"/>
                <input placeholder="Usuário do GitHub"/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}