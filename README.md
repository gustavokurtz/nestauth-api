# NestAuth API

Um sistema completo de autenticação e gerenciamento de usuários construído com NestJS, Prisma e JWT.

## Características

- 🔐 Autenticação completa com JWT
- 👤 CRUD completo de usuários
- 🔒 Senha criptografada com bcrypt
- 📊 Integração com Prisma ORM para banco de dados
- ✅ Validação de dados com class-validator

## Requisitos

- Node.js (v14+ recomendado)
- PostgreSQL ou outro banco de dados compatível com Prisma
- npm ou yarn

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/gustavokurtz/nestauth-api.git

# Entrar no diretório
cd nestauth-api

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Executar migrações do Prisma
npx prisma migrate dev

# Iniciar o servidor de desenvolvimento
npm run start:dev
```

## Estrutura do Projeto

```
src/
├── auth/                  # Módulo de autenticação
│   ├── dto/               # DTOs para autenticação
│   ├── auth.controller.ts # Controlador de autenticação
│   ├── auth.module.ts     # Módulo de autenticação
│   ├── auth.service.ts    # Serviço de autenticação
│   ├── jwt.strategy.ts    # Estratégia JWT para Passport
│   └── jwt-auth.guard.ts  # Guard para proteger rotas
├── prisma/                # Configuração do Prisma
│   ├── migrations/        # Migrações do banco de dados
│   ├── schema.prisma      # Schema do Prisma
│   ├── prisma.module.ts   # Módulo do Prisma
│   └── prisma.service.ts  # Serviço do Prisma
├── user/                  # Módulo de usuários
│   ├── dto/               # DTOs para usuários
│   ├── user.controller.ts # Controlador de usuários
│   ├── user.module.ts     # Módulo de usuários
│   └── user.service.ts    # Serviço de usuários
├── app.controller.ts      # Controlador principal
├── app.module.ts          # Módulo principal
├── app.service.ts         # Serviço principal
└── main.ts                # Ponto de entrada da aplicação
```

## Endpoints

### Autenticação

- `POST /auth/login` - Login de usuário (retorna token JWT)

### Usuários

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Obter usuário por ID
- `POST /users` - Criar novo usuário
- `PATCH /users/:id` - Atualizar usuário existente
- `DELETE /users/:id` - Excluir usuário

## Segurança

- Todas as senhas são armazenadas com hash bcrypt
- Rotas protegidas exigem autenticação via token JWT
- Validação de campos com class-validator

## Desenvolvimento

```bash
npm run start:dev

```