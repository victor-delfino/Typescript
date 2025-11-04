# 📝 Guia Rápido de Comandos

## Backend

### Iniciar servidor em modo desenvolvimento
```powershell
cd backend
npm run dev
```

### Compilar TypeScript para JavaScript
```powershell
cd backend
npm run build
```

### Rodar versão compilada
```powershell
cd backend
npm start
```

## Frontend

### Iniciar aplicação em modo desenvolvimento
```powershell
cd frontend
npm run dev
```

### Compilar para produção
```powershell
cd frontend
npm run build
```

### Visualizar build de produção
```powershell
cd frontend
npm run preview
```

## API Endpoints (Backend)

### Listar todos os usuários
```http
GET http://localhost:3001/api/users
```

### Buscar usuário por ID
```http
GET http://localhost:3001/api/users/1
```

### Criar novo usuário
```http
POST http://localhost:3001/api/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "age": 25
}
```

### Atualizar usuário
```http
PUT http://localhost:3001/api/users/1
Content-Type: application/json

{
  "name": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "age": 26
}
```

### Deletar usuário
```http
DELETE http://localhost:3001/api/users/1
```

## Testando a API com PowerShell

### Listar usuários
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/users" -Method GET
```

### Criar usuário
```powershell
$body = @{
    name = "Maria"
    email = "maria@email.com"
    age = 30
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/users" -Method POST -Body $body -ContentType "application/json"
```
