# Plano de Gerenciamento de Configuração (PGC)
## Enfoque DevOps — Integração e Entrega Contínuas (CI/CD)
**Versão:** 1.0  
**Data:** 16/11/2026  
**Projeto:** Adote Pet API — Plataforma Web/API para Gestão e Adoção de Animais Resgatados  
**Repositório Oficial:** [https://github.com/xaibelucas/adote-pet-api](https://github.com/xaibelucas/adote-pet-api)

---

### Identificação do Projeto e Equipe

| Campo | Descrição |
|---|---|
| **Projeto** | Adote Pet API — Gestão de Animais Resgatados e Processos de Adoção |
| **Gerente de Projeto / Product Owner** | Desenvolvedor Líder (@xaibelucas) |
| **Responsável de GCS / DevOps** | Desenvolvedor Líder (@xaibelucas) |
| **Par de Revisão / Desenvolvedor** | Desenvolvedor (@TruckControl) |
| **Repositório Principal** | `https://github.com/xaibelucas/adote-pet-api` (GitHub, público) |
| **Regime de Trabalho** | Remoto, assíncrono e colaborativo |

---

### Histórico de Revisões

| Data | Versão | Descrição | Autor |
|---|---|---|---|
| 16/11/2026 | 1.0 | Elaboração inicial do PGC com enfoque em práticas DevOps (CI/CD), branching GitHub Flow, proteção de branch `main` e ambientes Staging/Produção. | @xaibelucas |

---

## 1. Introdução

### 1.1 Finalidade
Este Plano de Gerenciamento de Configuração (PGC) estabelece as práticas, padrões, responsabilidades e ferramentas de Gestão de Configuração de Software (GCS) aplicadas ao projeto **Adote Pet API**. O foco é garantir rastreabilidade completa, reprodutibilidade de builds, proteção de código e automação de entrega por meio de pipelines de CI/CD.

### 1.2 Escopo
Aplica-se ao código-fonte da API, testes automatizados, scripts de automação, documentação técnica, arquivos de configuração e definições de infraestrutura/pipeline versionados no repositório.

### 1.3 Definições e Abreviações
- **GCS:** Gestão de Configuração de Software
- **CI / CD:** Integração Contínua / Entrega Contínua
- **IC:** Item de Configuração (artefato controlado sob gerência de configuração)
- **Baseline:** Conjunto estável e formalmente aprovado de itens de configuração (ex.: release tag)
- **CCM:** Comitê de Controle de Mudança

### 1.4 Referências
- Plano de GCS de Referência (ONGConecta / Prof. Lucas Camargo)
- Documentação Oficial do GitHub (Branch Protection, Environments, Actions)
- Convenção de Conventional Commits 1.0.0 e Semantic Versioning 2.0.0

---

## 2. Cultura DevOps e Papéis na Gerência de Configuração

Os papéis e responsabilidades são distribuídos entre os colaboradores:

| Papel | Responsável | Atribuições |
|---|---|---|
| **Desenvolvedor Líder / PO / DevOps** | @xaibelucas | Manutenção da arquitetura, pipelines de CI/CD, governança do repositório, revisão final e aprovação obrigatória de deploy para o ambiente de Produção. |
| **Desenvolvedor / Par de Revisão** | @TruckControl | Implementação de endpoints e regras de negócio, criação de testes automatizados e revisão por pares obrigatória (Code Review) em todos os Pull Requests direcionados à `main`. |
| **Comitê de Controle de Mudança (CCM)** | @xaibelucas + @TruckControl | Deliberação conjunta para mudanças de alto risco (ex.: quebra de contrato de API, alteração estrutural no banco de dados). |

### 2.1 Comunicação Assíncrona
As decisões técnicas e revisões ocorrem prioritariamente via GitHub (Issues e Pull Requests), registrando o histórico de discussões e justificativas técnicas diretamente atrelado ao código.

---

## 3. Ferramentas, Ambientes e Infraestrutura

### 3.1 Ferramentas Adotadas
- **Controle de Versão:** Git e GitHub (repositório público).
- **Orquestração de CI/CD:** GitHub Actions.
- **Linguagem / Runtime:** Node.js (v18+) e Express.
- **Rastreamento de Mudanças e Tarefas:** GitHub Issues e Pull Requests.
- **Gestão de Segredos:** GitHub Secrets e Environments.

### 3.2 Ambientes de Implantação

| Ambiente | Finalidade | Gatilho e Regras de Promoção |
|---|---|---|
| **Staging (Homologação)** | Validação funcional e testes de integração com artefatos estáveis gerados após merge na `main`. | Automático após merge na branch `main`. Restrito a branches protegidas (*Protected branches only*). |
| **Production (Produção)** | Ambiente estável e acessível aos usuários finais e abrigos parceiros. | Promoção controlada mediante **aprovação manual obrigatória do Desenvolvedor Líder (@xaibelucas)**. Restrito a branches protegidas. |

### 3.3 Estratégia de Branching (GitHub Flow)
- **`main`:** Branch principal, sempre estável e pronta para implantação. Protegida contra commits e pushes diretos.
- **`feature/<issue>-<descricao>`:** Branches temporárias criadas a partir da `main` para implementar novas funcionalidades ou correções.
- **`hotfix/<descricao>`:** Branches para correção de defeitos críticos encontrados em produção.
- **Estratégia de Merge:** Exclusivamente **Squash and Merge** (1 commit linear consolidado por PR na `main`), utilizando o título e descrição do PR.

---

## 4. Identificação da Configuração

### 4.1 Itens de Configuração (ICs)
São itens formais de configuração submetidos a controle de versão:
1. **Código-fonte da API** (`src/`) e testes automatizados (`tests/`).
2. **Lockfiles de dependências exatas** (`package-lock.json`).
3. **Metadados do projeto e scripts de execução** (`package.json`).
4. **Modelos de colaboração e governança** (`.github/CODEOWNERS`, `.github/pull_request_template.md`, `.github/ISSUE_TEMPLATE/*`).
5. **Configurações de ambiente e padronização** (`.gitattributes`, `.gitignore`, `.env.example`).
6. **Documentação e Plano de GCS** (`README.md`, `docs/pgc.md`).

### 4.2 Convenção de Nomenclatura
- **Branches:** `feature/<numero-issue>-<descricao-curta>` ou `fix/<numero-issue>-<descricao-curta>`.
- **Commits:** Padrão *Conventional Commits* (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`).
- **Tags de Release (Baselines):** Versionamento Semântico (`v1.0.0`, `v1.1.0`, etc.).

### 4.3 Estrutura do Repositório
```text
adote-pet-api/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── defeito.yml
│   │   └── funcionalidade.yml
│   ├── workflows/
│   │   ├── ci.yml                      # CI: npm ci, npm audit, npm test (PR e main)
│   │   └── deploy.yml                  # CD: staging automático -> gate -> production
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   ├── pgc.md                          # Este Plano de GCS
│   └── Plano_GCS_DevOps_ONGConectaR.pdf # PDF base de referência
├── src/
│   ├── app.js                          # Configuração do Express e rotas
│   └── index.js                        # Inicialização do servidor
├── tests/
│   └── pets.test.js                    # Suíte de testes unitários automatizados
├── .env.example                        # Exemplo de variáveis de ambiente sem segredos
├── .gitattributes                      # Normalização de quebra de linha (LF)
├── .gitignore                          # Ignora node_modules, .env, builds locais
├── package.json                        # Manifesto de dependências e scripts
├── package-lock.json                   # Lockfile de versões exatas das dependências
└── README.md                           # Documentação e instruções de execução/testes
```

---

## 5. Integração Contínua (CI)

### 5.1 Pipeline de CI
Todo Pull Request aberto para a branch `main` dispara automaticamente o pipeline:
1. Checkout do código-fonte.
2. Instalação determinística de dependências (`npm ci`).
3. Execução de análise estática e auditoria de dependências.
4. Execução da suíte de testes unitários (`npm test`).

### 5.2 Política de Pull Request e Revisão de Código
- Pushes diretos na branch `main` são estritamente bloqueados pela política de proteção de branches do GitHub.
- É obrigatória a aprovação de pelo menos **1 revisor com acesso de escrita (@TruckControl)** antes da liberação do merge.
- O branch deve manter histórico linear (*Require linear history*).

---

## 6. Entrega Contínua (CD) e Implantação

### 6.1 Etapas do Pipeline de CD
1. **Merge na `main`:** Dispara a etapa de build e deploy automático no ambiente de **Staging**.
2. **Quality Gate Staging:** Verificação de integridade pós-deploy (health check `/health`).
3. **Gate de Produção:** O pipeline aguarda a revisão e aprovação manual obrigatória de `@xaibelucas` no ambiente `production`.
4. **Deploy em Produção:** Execução do deploy final após aprovação.

### 6.2 Rollback e Recuperação
Caso seja identificada anomalia crítica no ambiente de produção:
- Reversão do commit de merge na branch `main` via PR emergencial ou redeploy de release tag estável anterior.

---

## 7. Infraestrutura como Código (IaC) e Gestão de Segredos
- As configurações de execução e dependências são versionadas no código (`package.json`, `.env.example`).
- Segredos de produção, tokens e chaves privadas nunca são commitados no repositório; são armazenados de forma isolada no GitHub Secrets atrelados aos Environments respectivos.

---

## 8. Controle de Configuração e Mudança

### 8.1 Processo de Mudança Padrão
1. Abertura de Issue documentando o problema ou necessidade.
2. Criação de branch a partir da `main`.
3. Desenvolvimento local e validação com testes unitários.
4. Abertura de Pull Request preenchendo o template oficial.
5. Code Review e aprovação pelo par (@TruckControl).
6. Squash and merge na branch `main`.

### 8.2 Comitê de Controle de Mudança (CCM)
Acionado para exceções de alto impacto, composto por @xaibelucas e @TruckControl.

---

## 9. Baselines e Releases
- Uma baseline formal é gerada automaticamente a cada entrega promovida com sucesso para o ambiente de Produção, consolidada por uma Git Tag de versão SemVer (ex.: `v1.0.0`).
- Notas de versão (*Release Notes*) são registradas na aba Releases do GitHub.

---

## 10. Status da Configuração e Observabilidade
- **Métricas:** Taxa de sucesso de pipelines de CI/CD, tempo de execução dos testes e frequência de deploys.
- **Health Check:** O endpoint `/health` responde status HTTP 200 com timestamp para monitoramento externo de disponibilidade (uptime).

---

## 11. Marcos do Projeto
1. **Marco 1:** Estruturação inicial do repositório, governança, proteção de branches e publicação do PGC.
2. **Marco 2:** Implementação do pipeline de Integração Contínua (CI).
3. **Marco 3:** Configuração dos ambientes Staging/Produção e fluxo de Entrega Contínua (CD).
4. **Marco 4:** Auditoria de segurança, Dependabot e baseline formal de primeira release estável.

---

## 12. Treinamento e Recursos
- Instruções detalhadas de setup e execução local disponibilizadas no [README.md](../README.md).
- Modelos padronizados de Issues e Pull Requests em `.github/`.

---

## 13. Controle de Software de Terceiros
- Dependências externas são homologadas, fixadas e protegidas via `package-lock.json`.
- Atualizações de segurança são monitoradas e aplicadas periodicamente.

---

## 14. Quadro-Resumo do Pipeline CI/CD

| Etapa | Ação Executada | Gatilho | Responsável / Aprovador |
|---|---|---|---|
| **CI (Validação)** | Instalação (`npm ci`), testes unitários (`npm test`) | Abertura ou atualização de PR | GitHub Actions (Automatizado) |
| **Code Review** | Análise de código e validação de checklist do PR | PR aberto | @TruckControl (1 aprovação obrigatória) |
| **Merge** | Squash and merge linear na branch `main` | Aprovação + CI verde | @xaibelucas |
| **CD (Staging)** | Deploy no ambiente de homologação | Commit na `main` | Automático |
| **Gate Produção** | Avaliação e liberação de deploy em produção | Validação em staging | **@xaibelucas (Aprovador Obrigatório)** |
| **CD (Produção)** | Deploy em produção e marcação de tag de versão | Aprovação do Gate | Automático pós-aprovação |
