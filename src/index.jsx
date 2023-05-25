import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// elemento chave para gerenciar as rotas na tela
import { BrowserRouter } from 'react-router-dom';

// forma de pegar a div root que está no html
const divRoot = document.getElementById('root');

// iniciando com o ReactDom | criando a raiz da aplicação a partir da div root do html
const root = ReactDOM.createRoot(divRoot);

// root criado em cima da div do html, tudo que estiver aqui será renderizado dentro da div
// Home sendo renderizado como filho(props.children) de Layout, por isso utilizar a tag de fechamendo de layout
root.render(
    <BrowserRouter><App/></BrowserRouter>
);

