# Task Management System

## Visão Geral

Este é um sistema de gerenciamento de tarefas desenvolvido para a empresa SILVER, com o objetivo de otimizar e organizar as tarefas internas.

## Pré-requisitos

Antes de iniciar, certifique-se de que as seguintes ferramentas estejam instaladas em sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [NPM](https://www.npmjs.com/)

## Configuração do Repositório

### 1. Clonando o Repositório

Para começar, clone o repositório para sua máquina local usando o comando abaixo:

```bash
git clone https://github.com/usuario/nome-do-repositorio.git
```

### 2. Configurando ENVs

Na raiz do repositório, crie um arquivo `.env` com as seguintes configurações:

```.env
NODE_ENV=production # development | test | production
API_PORT=3333 # Porta onde a API será executada
APP_SECRET=sua_chave # Chave para assinatura dos tokens de autenticação
APP_EXPIRES_TIME=24h # Tempo de expiração do token JWT
DATABASE_URL=postgresql://root:root@database:5432/tms?schema=public # URL de conexão com o banco de dados, apontando para o container PostgreSQL no Docker
```

Dentro da pasta `frontend`, crie um arquivo `.env` e adicione a variável `NEXT_PUBLIC_API_URL` apontando para o servidor Docker:

```.env
NEXT_PUBLIC_API_URL="http://localhost:3333" # URL da API + Porta
```

### 3. Executando o Container

Para iniciar o sistema, execute o comando abaixo:

```bash
docker compose up --build
```

Se preferir liberar o terminal após iniciar o container, execute:

```bash
docker compose up --build -d
```

links para teste
- [Web](https://web-tms.onrender.com/)
- [Swagger API](https://task-management-system-dnor.onrender.com/api/doc)


