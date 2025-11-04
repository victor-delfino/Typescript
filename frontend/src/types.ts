// types.ts - Tipos TypeScript compartilhados entre componentes
// Este arquivo centraliza as definições de tipos para garantir consistência

/**
 * Interface User - Define a estrutura de um usuário
 * Esta interface é usada tanto para enviar dados ao backend quanto para receber
 */
export interface User {
  id?: number;           // ID do usuário (opcional, pois só existe após criar no banco)
  name: string;          // Nome do usuário (obrigatório)
  email: string;         // Email do usuário (obrigatório e único)
  age: number;           // Idade do usuário (obrigatório)
  createdAt?: string;    // Data de criação (opcional, gerada pelo banco)
}
