// database.ts - Configuração do banco de dados SQLite
import Database from 'better-sqlite3';
import path from 'path';

// Cria ou conecta ao banco de dados SQLite
const db = new Database(path.join(__dirname, '..', 'database.db'));

// Habilita chaves estrangeiras
db.pragma('foreign_keys = ON');

// Cria a tabela de usuários se não existir
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER NOT NULL,
    createdAt TEXT DEFAULT (datetime('now'))
  )
`;

db.exec(createTableQuery);

console.log('✅ Database conectado e tabela users criada!');

export default db;
