// UserList.tsx - Componente para listar usuários
// Exibe todos os usuários em cards com botões de ação

import React from 'react';
import { User } from '../types';
import './UserList.css';

/**
 * Props do componente UserList
 * Define os dados que o componente recebe do pai
 */
interface UserListProps {
  users: User[];                      // Array com todos os usuários a serem exibidos
  onEdit: (user: User) => void;       // Callback quando clica em "Editar"
  onDelete: (id: number) => void;     // Callback quando clica em "Deletar"
}

/**
 * Componente UserList
 * Lista todos os usuários ou mostra mensagem quando não há nenhum
 */
const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  // Se não há usuários, mostra mensagem amigável
  if (users.length === 0) {
    return (
      <div className="no-users">
        <p>📭 Nenhum usuário cadastrado ainda.</p>
        <p>Clique em "Adicionar Novo Usuário" para começar!</p>
      </div>
    );
  }

  // JSX - Renderiza a lista de usuários
  return (
    <div className="user-list">
      {/* Título com contador de usuários */}
      <h2>Lista de Usuários ({users.length})</h2>
      
      {/* Container com grid de cards */}
      <div className="cards-container">
        {/* 
          map() = percorre o array de users e cria um card para cada um
          É como um for-each que retorna elementos JSX
        */}
        {users.map((user) => (
          // key = identificador único necessário para listas no React
          // Ajuda o React a identificar qual item mudou
          <div key={user.id} className="user-card">
            
            {/* Informações do usuário */}
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="user-email">✉️ {user.email}</p>
              <p className="user-age">🎂 {user.age} anos</p>
              
              {/* 
                Renderização condicional: só mostra data se existir
                {condição && <elemento>} = se condição é true, renderiza o elemento
              */}
              {user.createdAt && (
                <p className="user-date">
                  {/* Converte string de data para formato brasileiro */}
                  📅 {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
            
            {/* Botões de ação */}
            <div className="user-actions">
              {/* 
                onClick usa arrow function para passar parâmetros
                () => função(parametro)
              */}
              <button onClick={() => onEdit(user)} className="btn-edit">
                ✏️ Editar
              </button>
              
              {/* 
                user.id! = o "!" diz ao TypeScript que temos certeza que id existe
                É um "non-null assertion operator"
              */}
              <button onClick={() => onDelete(user.id!)} className="btn-delete">
                🗑️ Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exporta o componente
export default UserList;
