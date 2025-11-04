// server.ts - Arquivo principal do servidor Express
import express, { Express } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app: Express = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Permite receber JSON no body

// Rotas
app.use('/api/users', userRoutes);

// Rota raiz para testar se o servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: '🚀 API CRUD TypeScript está rodando!' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
