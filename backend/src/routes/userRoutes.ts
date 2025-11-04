// userRoutes.ts - Define as rotas da API REST
import { Router, Request, Response } from 'express';
import { UserModel, User } from '../models/User';

const router = Router();

// GET /api/users - Listar todos os usuários
router.get('/', (req: Request, res: Response) => {
  try {
    const users = UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// GET /api/users/:id - Buscar um usuário específico
router.get('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = UserModel.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// POST /api/users - Criar novo usuário
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    
    // Validação simples
    if (!name || !email || !age) {
      return res.status(400).json({ error: 'Nome, email e idade são obrigatórios' });
    }
    
    const newUser = UserModel.create({ name, email, age });
    res.status(201).json(newUser);
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// PUT /api/users/:id - Atualizar usuário
router.put('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
      return res.status(400).json({ error: 'Nome, email e idade são obrigatórios' });
    }
    
    const updated = UserModel.update(id, { name, email, age });
    
    if (!updated) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Usuário atualizado com sucesso', id });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// DELETE /api/users/:id - Deletar usuário
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = UserModel.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

export default router;
