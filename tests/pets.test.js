const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

test('GET /health retorna status 200 e json com status ok', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/health`);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'ok');
    assert.ok(data.timestamp);
  } finally {
    server.close();
  }
});

test('GET /api/pets lista todos os animais cadastrados', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/api/pets`);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(data));
    assert.ok(data.length >= 3);
  } finally {
    server.close();
  }
});

test('GET /api/pets/:id retorna o animal correto ou 404', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const resOk = await fetch(`http://localhost:${port}/api/pets/1`);
    const dataOk = await resOk.json();
    assert.strictEqual(resOk.status, 200);
    assert.strictEqual(dataOk.nome, 'Pipoca');

    const resNotFound = await fetch(`http://localhost:${port}/api/pets/9999`);
    assert.strictEqual(resNotFound.status, 404);
  } finally {
    server.close();
  }
});

test('POST /api/pets valida campos obrigatorios e cadastra novo animal', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    // Teste validação
    const resInvalido = await fetch(`http://localhost:${port}/api/pets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: '' })
    });
    assert.strictEqual(resInvalido.status, 400);

    // Teste criação com sucesso
    const resValido = await fetch(`http://localhost:${port}/api/pets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Luna', especie: 'Gato', idade: 2 })
    });
    assert.strictEqual(resValido.status, 201);
    const dataValida = await resValido.json();
    assert.strictEqual(dataValida.nome, 'Luna');
    assert.strictEqual(dataValida.status, 'disponivel');
  } finally {
    server.close();
  }
});
