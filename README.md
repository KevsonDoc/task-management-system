# task-management-system

# Nome do Projeto

sistema de gerenciamento de tarefas para a empresa SILVER

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [NPM](https://www.npmjs.com/)

## Configuração do Repositório

### 1. Clone o repositório

Primeiro, clone o repositório para a sua máquina local:

```bash
git clone https://github.com/usuario/nome-do-repositorio.git
```

### Configuranto ENVs

Crie um arquivo .env na raíz do projeto

```env
# SYSTEM ENVIRIOMENT
NODE_ENV="development" # development | test | production

# DATABASE
DATABASE_USERNAME_DOCKER="root" # username do banco postgresql no docker
DATABASE_PASSWORD_DOCKER="root" # senha do banco postgresql no docker
DATABASE_NAME_DOCKER="TASK_MANAGEMENT_SYSTEM" # nome do banco de dados

# API
API_PORT="3333" ### pora a ser exposta pelo docker
DATABASE_URL="postgresql://root:root@database:5432/TASK_MANAGEMENT_SYSTEM?schema=public"
APP_SECRET="gere sua chave" # usado como secret no JWT
APP_EXPIRES_TIME="24h" # tempo de expiração no token

# FRONTEND ENVIRIOMENT
FRONTEND_PORT="80" # porta do frontend exposta pelo docker
```

Crie um .env na raiz do repositório server

```env
DATABASE_URL="postgresql://root:root@database:5432/TASK_MANAGEMENT_SYSTEM?schema=public"
```

Crie um .env na raiz do repositório frontend

```env
NEXT_PUBLIC_API_URL="http://localhost:3333" # URL da api + porta
```

### Execultando container

Agora basta rodar o comando
`bash docker compose up --build`
ou para liberar o terminal
`bash docker compose up --build -d`
