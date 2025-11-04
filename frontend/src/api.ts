// api.ts - Serviço para comunicação com o backend
// Este arquivo centraliza todas as chamadas HTTP para a API REST
// Usando Fetch API nativa do JavaScript/TypeScript

import { User } from './types';

// URL base da API do backend (servidor Express rodando na porta 3001)
const API_URL = 'http://localhost:3001/api/users';

/**
 * GET - Buscar todos os usuários
 * Faz uma requisição GET para listar todos os usuários cadastrados
 * @returns Promise com array de usuários
 */
export const getUsers = async (): Promise<User[]> => {
  // fetch() faz a requisição HTTP
  const response = await fetch(API_URL);
  
  // Verifica se a resposta foi bem-sucedida (status 200-299)
  if (!response.ok) throw new Error('Erro ao buscar usuários');
  
  // Converte a resposta JSON em um array de objetos User
  return response.json();
};

/**
 * GET - Buscar usuário por ID
 * Busca um usuário específico pelo seu ID
 * @param id - ID do usuário a ser buscado
 * @returns Promise com o usuário encontrado
 */
export const getUserById = async (id: number): Promise<User> => {
  // Template string para construir a URL com o ID
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar usuário');
  return response.json();
};

/**
 * POST - Criar novo usuário
 * Envia dados de um novo usuário para o backend criar no banco
 * @param user - Objeto com dados do usuário (name, email, age)
 * @returns Promise com o usuário criado (incluindo ID gerado)
 */
export const createUser = async (user: User): Promise<User> => {
  const response = await fetch(API_URL, {
    method: 'POST',                                    // Método HTTP para criar
    headers: { 'Content-Type': 'application/json' },   // Informa que enviamos JSON
    body: JSON.stringify(user),                        // Converte objeto em string JSON
  });
  
  // Se houver erro, tenta pegar mensagem específica do backend
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar usuário');
  }
  
  return response.json();
};

/**
 * PUT - Atualizar usuário existente
 * Atualiza os dados de um usuário já cadastrado
 * @param id - ID do usuário a ser atualizado
 * @param user - Novos dados do usuário
 * @returns Promise<void> - Não retorna dados, apenas sucesso/erro
 */
export const updateUser = async (id: number, user: User): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',                                     // Método HTTP para atualizar
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao atualizar usuário');
  }
};

/**
 * DELETE - Deletar usuário
 * Remove um usuário do banco de dados
 * @param id - ID do usuário a ser deletado
 * @returns Promise<void> - Não retorna dados, apenas sucesso/erro
 */
export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',                                  // Método HTTP para deletar
  });
  
  if (!response.ok) throw new Error('Erro ao deletar usuário');
};
