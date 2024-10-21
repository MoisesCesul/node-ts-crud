import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { User, users } from './user';

const app: Application = express();
const port = 3000;

app.use(bodyParser.json()); 

app.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  const newUser: User = { id: uuidv4(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

app.put('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex !== -1) {
    users[userIndex] = { id, name, email };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});


app.delete('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
