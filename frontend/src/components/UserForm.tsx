// UserForm.tsx - Componente de formulário para criar/editar usuários
// Este componente é reutilizável: serve tanto para CRIAR quanto para EDITAR

import React, { useState, useEffect } from 'react';
import { User } from '../types';
import './UserForm.css';

/**
 * Props do componente UserForm
 * Define os dados que o componente recebe do componente pai (App.tsx)
 */
interface UserFormProps {
  user?: User;                        // Usuário para editar (opcional, se vazio = criar novo)
  onSubmit: (user: User) => void;     // Função callback quando o formulário é enviado
  onCancel: () => void;               // Função callback quando o usuário cancela
}

/**
 * Componente UserForm
 * Formulário controlado que gerencia seus próprios dados no estado
 */
const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  // useState = Hook do React para criar estado local no componente
  // formData armazena os valores dos campos do formulário
  const [formData, setFormData] = useState<User>({
    name: '',      // Estado inicial vazio
    email: '',
    age: 0,
  });

  // useEffect = Hook que executa código quando algo muda
  // Neste caso: quando recebemos um 'user' para editar, preenche o formulário
  useEffect(() => {
    if (user) {
      setFormData(user);  // Atualiza o estado com os dados do usuário
    }
  }, [user]);  // Array de dependências: executa quando 'user' muda

  /**
   * handleChange - Atualiza o estado quando o usuário digita nos campos
   * É chamado em cada tecla digitada (onChange)
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;  // Pega o name e value do input
    
    // Atualiza o estado usando spread operator (...)
    setFormData({
      ...formData,                     // Mantém os outros campos
      [name]: name === 'age' ? parseInt(value) || 0 : value,  // Atualiza só o campo alterado
    });
    // Se for 'age', converte para número; se for outro campo, mantém como string
  };

  /**
   * handleSubmit - Envia o formulário quando o usuário clica em "Criar" ou "Atualizar"
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();   // Previne o comportamento padrão de recarregar a página
    onSubmit(formData);   // Chama a função que recebemos via props, enviando os dados
  };

  // JSX - A sintaxe que parece HTML dentro do JavaScript/TypeScript
  return (
    <div className="form-container">
      {/* Título dinâmico: se tem user = editar, se não = novo */}
      <h2>{user ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      
      {/* Formulário HTML com evento onSubmit */}
      <form onSubmit={handleSubmit}>
        
        {/* Campo: Nome */}
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"                    // name é usado para identificar o campo
            value={formData.name}          // value vem do estado (controlled input)
            onChange={handleChange}        // Chama função toda vez que o usuário digita
            required                       // Validação HTML5: campo obrigatório
            placeholder="Digite o nome"
          />
        </div>

        {/* Campo: Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"                   // type="email" valida formato de email
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Digite o email"
          />
        </div>

        {/* Campo: Idade */}
        <div className="form-group">
          <label htmlFor="age">Idade:</label>
          <input
            type="number"                  // type="number" mostra teclado numérico
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"                        // Validação: mínimo 1
            max="120"                      // Validação: máximo 120
            placeholder="Digite a idade"
          />
        </div>

        {/* Botões do formulário */}
        <div className="form-buttons">
          {/* Botão Submit - envia o formulário */}
          <button type="submit" className="btn-submit">
            {user ? 'Atualizar' : 'Criar'}  {/* Texto dinâmico */}
          </button>
          
          {/* Botão Cancel - não envia o form (type="button") */}
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

// Exporta o componente para ser usado em outros arquivos
export default UserForm;
