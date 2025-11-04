# 🚀 CRUD Full Stack TypeScript

Um projeto completo de CRUD (Create, Read, Update, Delete) desenvolvido com TypeScript tanto no backend quanto no frontend. Perfeito para aprender como as partes se conectam!

## 📋 O que é este projeto?

Este é um sistema de gerenciamento de usuários que demonstra:
- ✅ **Backend**: API REST com Node.js + Express + TypeScript
- ✅ **Frontend**: Interface React + TypeScript + Vite
- ✅ **Banco de Dados**: SQLite (simples e sem configuração)
- ✅ **Integração completa**: Como frontend e backend se comunicam via API

## 🏗️ Estrutura do Projeto

```
crudtype/
├── backend/                 # Servidor Express (API)
│   ├── src/
│   │   ├── models/         # Modelos de dados (User)
│   │   ├── routes/         # Rotas da API REST
│   │   ├── database.ts     # Configuração do SQLite
│   │   └── server.ts       # Arquivo principal
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/               # Interface React
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── api.ts          # Comunicação com o backend
    │   ├── types.ts        # Tipos TypeScript
    │   ├── App.tsx         # Componente principal
    │   └── main.tsx        # Ponto de entrada
    ├── package.json
    └── tsconfig.json
```

## 🔧 Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para criar a API REST
- **TypeScript**: JavaScript com tipagem estática
- **SQLite (better-sqlite3)**: Banco de dados leve e simples
- **CORS**: Permite requisições entre frontend e backend

### Frontend
- **React**: Biblioteca para criar interfaces
- **TypeScript**: Tipagem estática
- **Vite**: Ferramenta de build rápida
- **Fetch API**: Para comunicação com o backend

## 📦 Como Instalar e Rodar

### 1️⃣ Instalar dependências do Backend

```powershell
cd backend
npm install
```

### 2️⃣ Instalar dependências do Frontend

```powershell
cd frontend
npm install
```

### 3️⃣ Rodar o Backend (em um terminal)

```powershell
cd backend
npm run dev
```

O backend estará rodando em: **http://localhost:3001**

### 4️⃣ Rodar o Frontend (em outro terminal)

```powershell
cd frontend
npm run dev
```

O frontend estará rodando em: **http://localhost:3000**

## 🎯 Como Usar

1. Abra seu navegador em **http://localhost:3000**
2. Clique em "Adicionar Novo Usuário" para criar um usuário
3. Preencha nome, email e idade
4. Veja a lista de usuários atualizar automaticamente
5. Use os botões "Editar" ou "Deletar" para modificar/remover usuários

## 📚 Entendendo o Código

### Backend - Como funciona?

#### 1. **server.ts** - Servidor Express
```typescript
// Cria o servidor web que escuta requisições HTTP
app.listen(PORT, () => {
  console.log('Servidor rodando!');
});
```

#### 2. **database.ts** - Conexão com o Banco
```typescript
// Conecta ao SQLite e cria a tabela de usuários
const db = new Database('database.db');
```

#### 3. **models/User.ts** - Modelo de Dados
```typescript
// Define a estrutura de um usuário e operações CRUD
interface User {
  id?: number;
  name: string;
  email: string;
  age: number;
}
```

#### 4. **routes/userRoutes.ts** - Rotas da API
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca um usuário específico
- `POST /api/users` - Cria um novo usuário
- `PUT /api/users/:id` - Atualiza um usuário
- `DELETE /api/users/:id` - Deleta um usuário

### Frontend - Como funciona?

#### 1. **App.tsx** - Componente Principal
- Gerencia o estado da aplicação
- Controla quando mostrar formulário ou lista
- Coordena as operações CRUD

#### 2. **api.ts** - Comunicação com Backend
```typescript
// Usa fetch para fazer requisições HTTP ao backend
const response = await fetch('http://localhost:3001/api/users');
const users = await response.json();
```

#### 3. **components/UserForm.tsx** - Formulário
- Cria e edita usuários
- Valida os campos
- Envia dados ao backend

#### 4. **components/UserList.tsx** - Lista
- Exibe todos os usuários
- Botões para editar/deletar
- Atualiza automaticamente

### Como Frontend e Backend se Conectam?

```
┌─────────────┐                      ┌─────────────┐
│   FRONTEND  │  ←─── HTTP/JSON ───→ │   BACKEND   │
│  (React)    │                      │  (Express)  │
│  Port 3000  │                      │  Port 3001  │
└─────────────┘                      └─────────────┘
                                            ↓
                                     ┌─────────────┐
                                     │   SQLite    │
                                     │  Database   │
                                     └─────────────┘
```

1. **Frontend** faz uma requisição HTTP (ex: criar usuário)
2. **Backend** recebe, processa e salva no banco
3. **Backend** retorna resposta JSON
4. **Frontend** atualiza a interface

## 🎓 Conceitos de TypeScript que você vai aprender

### 1. **Interfaces e Tipos**
```typescript
interface User {
  id?: number;        // ? = opcional
  name: string;       // obrigatório
  email: string;
  age: number;
}
```

### 2. **Tipagem de Funções**
```typescript
const createUser = async (user: User): Promise<User> => {
  // user deve ser do tipo User
  // retorna uma Promise que resolve para User
}
```

### 3. **Componentes React com TypeScript**
```typescript
interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  // Props tipadas!
}
```

### 4. **Async/Await com Tipos**
```typescript
const loadUsers = async (): Promise<void> => {
  const users: User[] = await getUsers();
  setUsers(users);
}
```

## 🐛 Solucionando Problemas

### Backend não inicia?
- Verifique se instalou as dependências: `npm install`
- Verifique se a porta 3001 está livre

### Frontend não conecta ao backend?
- Certifique-se que o backend está rodando
- Verifique o console do navegador para erros
- Confirme a URL da API em `frontend/src/api.ts`

### Erro de CORS?
- O CORS já está configurado no backend
- Certifique-se que o frontend está na porta 3000

## 🚀 Próximos Passos

Após entender este projeto, você pode:

1. **Adicionar mais campos** ao usuário (telefone, endereço, etc.)
2. **Implementar autenticação** (login/registro)
3. **Adicionar paginação** para muitos usuários
4. **Melhorar a validação** de dados
5. **Usar um banco real** (PostgreSQL, MySQL)
6. **Adicionar testes** (Jest, React Testing Library)
7. **Deploy** (Vercel para frontend, Railway para backend)

## 📖 Recursos para Aprender Mais

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Express TypeScript](https://expressjs.com/)
- [MDN Web Docs - HTTP Methods](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods)

## 💡 Dicas de Estudo

1. **Comece pelo backend**: Entenda como funciona a API primeiro
2. **Teste com Postman/Insomnia**: Faça requisições manuais antes do frontend
3. **Console é seu amigo**: Use `console.log()` para entender o fluxo
4. **Veja o Network Tab**: No DevTools do navegador, veja as requisições HTTP
5. **Experimente**: Mude coisas, quebre o código, aprenda consertando!

---

Feito com ❤️ para aprender TypeScript Full Stack
