// User.ts - Modelo e tipos TypeScript para o usuário
import db from '../database';

// Interface que define a estrutura de um Usuário
export interface User {
  id?: number;
  name: string;
  email: string;
  age: number;
  createdAt?: string;
}

// Classe que gerencia as operações no banco de dados
export class UserModel {
  // CREATE - Criar novo usuário
  static create(user: User): User {
    const stmt = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
    const result = stmt.run(user.name, user.email, user.age);
    
    return {
      id: result.lastInsertRowid as number,
      ...user
    };
  }

  // READ - Buscar todos os usuários
  static findAll(): User[] {
    const stmt = db.prepare('SELECT * FROM users ORDER BY createdAt DESC');
    return stmt.all() as User[];
  }

  // READ - Buscar usuário por ID
  static findById(id: number): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  }

  // UPDATE - Atualizar usuário
  static update(id: number, user: Partial<User>): boolean {
    const stmt = db.prepare('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?');
    const result = stmt.run(user.name, user.email, user.age, id);
    return result.changes > 0;
  }

  // DELETE - Deletar usuário
  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
