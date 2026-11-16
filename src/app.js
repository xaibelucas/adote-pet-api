const express = require('express');

const app = express();
app.use(express.json());

// In-memory mock database para a API
const pets = [
  { id: 1, nome: 'Pipoca', especie: 'Cachorro', idade: 2, status: 'disponivel' },
  { id: 2, nome: 'Mingau', especie: 'Gato', idade: 1, status: 'adotado' },
  { id: 3, nome: 'Thor', especie: 'Cachorro', idade: 4, status: 'disponivel' }
];

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/pets', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(pets.filter(p => p.status === status));
  }
  res.json(pets);
});

app.get('/api/pets/:id', (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id, 10));
  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }
  res.json(pet);
});

app.post('/api/pets', (req, res) => {
  const { nome, especie, idade } = req.body;
  if (!nome || !especie) {
    return res.status(400).json({ error: 'Nome e espécie são obrigatórios' });
  }
  const novoPet = {
    id: pets.length + 1,
    nome,
    especie,
    idade: idade || 0,
    status: 'disponivel'
  };
  pets.push(novoPet);
  res.status(201).json(novoPet);
});

module.exports = app;
