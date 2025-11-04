// main.tsx - Ponto de entrada da aplicação React
// Este é o arquivo que "inicia" tudo, conectando React ao HTML

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ReactDOM.createRoot = API do React 18+ para renderizar a aplicação
// 1. Busca elemento HTML com id="root" no index.html
// 2. Cria uma "raiz" React nesse elemento
// 3. Renderiza o componente App dentro dele
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode = modo de desenvolvimento que ajuda a encontrar problemas
  // Ativa verificações e avisos extras (removido automaticamente em produção)
  <React.StrictMode>
    <App />  {/* Componente principal da aplicação */}
  </React.StrictMode>,
)
