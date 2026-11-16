# Adote Pet API 🐾

API REST para gestão e adoção de animais resgatados, desenvolvida para suporte a abrigos e ONGs de proteção animal.

Este projeto segue as práticas de **Gestão de Configuração de Software (GCS)** e **Cultura DevOps**, implementando integração e entrega contínuas (CI/CD), branching model com **GitHub Flow**, revisões por pares e proteção da branch principal (`main`).

---

## 🎯 O que o app faz

- **Listagem e consulta de pets:** Consulta animais disponíveis para adoção com filtros por status (`disponivel`, `adotado`).
- **Cadastro de animais resgatados:** Registro de novos pets resgatados com validação de campos obrigatórios.
- **Health check:** Endpoint `/health` para monitoramento e observabilidade contínua da API.

---

## 🛠️ Stack Tecnológica

- **Linguagem / Runtime:** Node.js (v18+)
- **Framework Web:** Express
- **Testes Automatizados:** Node Test Runner nativo (`node:test` + `node:assert`)
- **Versionamento & CI/CD:** Git, GitHub Flow e GitHub Actions

---

## 🚀 Como instalar e rodar localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/xaibelucas/adote-pet-api.git
cd adote-pet-api
```

### 2. Configurar variáveis de ambiente
Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

### 3. Instalar as dependências
```bash
npm install
```

### 4. Executar a aplicação
```bash
npm start
```
A API estará acessível em `http://localhost:3000`.

---

## 🧪 Como rodar os testes

A suíte de testes unitários valida os endpoints da API, respostas de erro e criação de registros:

```bash
npm test
```

---

## 📋 Plano de Gestão de Configuração (PGC)

O Plano de Gestão de Configuração de Software formal do projeto está publicado como item de configuração em:
👉 [docs/pgc.md](docs/pgc.md)

### Papéis e Responsabilidades (PGC Seção 2)
- **Desenvolvedor Líder / Product Owner / DevOps:** [@xaibelucas](https://github.com/xaibelucas)
- **Par de Revisão / Desenvolvedor:** [@TruckControl](https://github.com/TruckControl)

---

## 👥 Colaboração e Políticas de Branch

- **Branch principal (`main`):** Protegida. Todo merge requer Pull Request aprovado pelo par de revisão (`@TruckControl`) e pipeline verde.
- **Merge strategy:** Apenas *Squash and merge* com título e descrição do PR.
- **Templates:**
  - Pull Requests: [Template de PR](.github/pull_request_template.md)
  - Issues: [Nova Funcionalidade](.github/ISSUE_TEMPLATE/funcionalidade.yml) | [Relatar Defeito](.github/ISSUE_TEMPLATE/defeito.yml)
