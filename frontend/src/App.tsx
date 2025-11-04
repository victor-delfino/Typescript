// App.tsx - Componente principal da aplicação
// Este é o "cérebro" da aplicação: gerencia todo o estado e coordena os componentes

import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { User } from './types';
import { getUsers, createUser, updateUser, deleteUser } from './api';
import './App.css';

/**
 * Componente App
 * Componente raiz que gerencia todo o estado global da aplicação
 */
function App() {
  // ========== ESTADOS DA APLICAÇÃO ==========
  // useState = Hook para criar variáveis de estado que, quando mudam, re-renderizam o componente
  
  // Lista de todos os usuários (vem do backend)
  const [users, setUsers] = useState<User[]>([]);
  
  // Usuário sendo editado no momento (undefined = nenhum)
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  
  // Controla se o formulário está visível ou não
  const [showForm, setShowForm] = useState(false);
  
  // Indica se está carregando dados (mostra loading na tela)
  const [loading, setLoading] = useState(false);
  
  // Armazena mensagens de erro (null = sem erro)
  const [error, setError] = useState<string | null>(null);

  // ========== EFEITOS ==========
  // useEffect = Executa código quando o componente é montado ou quando dependências mudam
  // Neste caso: carrega usuários quando a aplicação inicia
  useEffect(() => {
    loadUsers();  // Chama função para buscar usuários do backend
  }, []);  // Array vazio [] = executa apenas uma vez, na montagem do componente

  // ========== FUNÇÕES DO CRUD ==========
  
  /**
   * loadUsers - Busca todos os usuários do backend
   * Chamada quando a app inicia e após criar/atualizar/deletar
   */
  const loadUsers = async () => {
    try {
      setLoading(true);           // Ativa indicador de loading
      setError(null);             // Limpa erros anteriores
      const data = await getUsers();  // Chama API (arquivo api.ts)
      setUsers(data);             // Atualiza estado com os usuários
    } catch (err) {
      // Se der erro, mostra mensagem
      setError('Erro ao carregar usuários. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);          // Desativa loading (sempre executa)
    }
  };

  /**
   * handleSubmit - Cria ou atualiza um usuário
   * @param user - Dados do usuário vindos do formulário
   */
  const handleSubmit = async (user: User) => {
    try {
      setLoading(true);
      setError(null);

      // Verifica se está editando (tem ID) ou criando novo
      if (editingUser && editingUser.id) {
        // ATUALIZAR - chama PUT na API
        await updateUser(editingUser.id, user);
      } else {
        // CRIAR - chama POST na API
        await createUser(user);
      }

      await loadUsers();              // Recarrega lista atualizada
      setShowForm(false);             // Fecha o formulário
      setEditingUser(undefined);      // Limpa usuário em edição
    } catch (err: any) {
      setError(err.message);          // Mostra erro na tela
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleEdit - Quando clica em "Editar" em um usuário
   * @param user - Usuário a ser editado
   */
  const handleEdit = (user: User) => {
    setEditingUser(user);    // Define usuário para edição
    setShowForm(true);       // Mostra formulário
  };

  /**
   * handleDelete - Quando clica em "Deletar" em um usuário
   * @param id - ID do usuário a ser deletado
   */
  const handleDelete = async (id: number) => {
    // Confirmação antes de deletar (dialog nativo do browser)
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) {
      return;  // Se cancelar, sai da função
    }

    try {
      setLoading(true);
      setError(null);
      await deleteUser(id);     // Chama DELETE na API
      await loadUsers();        // Recarrega lista atualizada
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleCancel - Quando clica em "Cancelar" no formulário
   */
  const handleCancel = () => {
    setShowForm(false);           // Esconde formulário
    setEditingUser(undefined);    // Limpa usuário em edição
  };

  /**
   * handleNewUser - Quando clica em "Adicionar Novo Usuário"
   */
  const handleNewUser = () => {
    setEditingUser(undefined);    // Limpa edição (para criar novo)
    setShowForm(true);            // Mostra formulário vazio
  };

  // ========== RENDERIZAÇÃO (JSX) ==========
  // O que o componente exibe na tela
  return (
    <div className="app">
      {/* Cabeçalho */}
      <header className="app-header">
        <h1>🚀 CRUD TypeScript Full Stack</h1>
        <p>Aprenda como frontend e backend se conectam!</p>
      </header>

      {/* 
        Renderização condicional de erro
        {condição && <elemento>} = só mostra se condição for verdadeira
      */}
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {/* Indicador de loading */}
      {loading && (
        <div className="loading">
          ⏳ Carregando...
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="app-content">
        {/* 
          Renderização condicional: mostra OU botão OU formulário
          operador ternário: condição ? seVerdadeiro : seFalso
        */}
        {!showForm ? (
          // Se formulário está escondido, mostra botão
          <button onClick={handleNewUser} className="btn-new-user">
            ➕ Adicionar Novo Usuário
          </button>
        ) : (
          // Se formulário está visível, mostra o componente UserForm
          <UserForm
            user={editingUser}           // Passa usuário (undefined = novo, objeto = editar)
            onSubmit={handleSubmit}      // Passa função de callback
            onCancel={handleCancel}      // Passa função de callback
          />
        )}

        {/* 
          Sempre mostra a lista de usuários
          Passa os dados e funções via props
        */}
        <UserList
          users={users}              // Array de usuários
          onEdit={handleEdit}        // Função callback para editar
          onDelete={handleDelete}    // Função callback para deletar
        />
      </div>
    </div>
  );
}

// Exporta o componente para ser usado no main.tsx
export default App;
