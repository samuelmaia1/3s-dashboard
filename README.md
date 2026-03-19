# 3S Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232A?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![License](https://img.shields.io/badge/status-private-lightgrey)](#)

Dashboard web desenvolvido com **Next.js 16**, **React 19**, **TypeScript** e **Material UI** para operação de um sistema de locações/comercial, com foco em autenticação, visão gerencial e gestão de **produtos**, **clientes**, **pedidos** e **contratos**.

## Sumário

- [Visão geral](#visão-geral)
- [Principais funcionalidades](#principais-funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura de rotas da aplicação](#estrutura-de-rotas-da-aplicação)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Como executar](#como-executar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Integração com API](#integração-com-api)
- [Exemplos de endpoints](#exemplos-de-endpoints)
- [Fluxos principais](#fluxos-principais)
- [Padrões e observações técnicas](#padrões-e-observações-técnicas)

## Visão geral

O **3S Dashboard** é a interface administrativa da plataforma, responsável por:

- autenticar usuários e restaurar sessão com refresh automático;
- exibir indicadores resumidos no dashboard principal;
- listar, cadastrar, editar e remover produtos;
- listar e cadastrar clientes;
- acompanhar módulos de pedidos e contratos;
- reagir a atualizações em tempo real via **WebSocket/STOMP** para produtos e clientes.

## Principais funcionalidades

- **Autenticação com sessão persistente** via cookies e refresh automático em respostas `403`.
- **Cadastro de usuários** com formulário multi-etapas e validação com `zod`.
- **Dashboard executivo** com métricas de pedidos, receita, clientes e contratos.
- **Busca e paginação** para produtos e clientes.
- **Cadastro de produtos** com transformação de preço para envio ao backend.
- **Atualização em tempo real** para listagens usando SockJS + STOMP.
- **Busca automática de endereço por CEP** via ViaCEP.
- **Interface responsiva** com navegação pública e privada.

## Tecnologias

### Front-end

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Material UI 7
- Emotion
- Sass

### Formulários e validação

- React Hook Form
- Zod
- `@hookform/resolvers`

### Comunicação e dados

- Axios
- QS
- SockJS
- STOMP.js
- ViaCEP

## Estrutura de rotas da aplicação

### Rotas públicas

- `/login`
- `/register`

### Rotas privadas

- `/dashboard`
- `/orders`
- `/products`
- `/costumers`
- `/contracts`
- `/settings`

> Observação: alguns módulos já possuem navegação pronta e diferentes níveis de implementação funcional no front-end.

## Pré-requisitos

Antes de iniciar, garanta que você tenha instalado:

- **Node.js** 20 ou superior
- **npm** 10 ou superior
- uma API compatível disponível para autenticação e dados do dashboard

## Configuração do ambiente

Crie um arquivo `.env.local` na raiz do projeto com a variável abaixo:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### O que essa variável faz?

- define a `baseURL` das chamadas HTTP do Axios;
- também é usada para derivar os endpoints de WebSocket em tempo real.

### Exemplo de configuração

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Com esse valor, os sockets serão montados a partir da base sem o sufixo `/api`, por exemplo:

- `http://localhost:8080/ws-products`
- `http://localhost:8080/ws-costumers`

## Como executar

### 1. Instale as dependências

```bash
npm install
```

### 2. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

### 3. Acesse no navegador

```text
http://localhost:3000
```

Ao abrir a aplicação:

- usuários autenticados são redirecionados para `/dashboard`;
- usuários não autenticados são redirecionados para `/login`.

## Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor Next.js em modo desenvolvimento. |
| `npm run build` | Gera a build de produção. |
| `npm run start` | Inicia a aplicação em modo produção. |
| `npm run lint` | Executa a análise estática com ESLint. |

## Integração com API

A aplicação utiliza uma instância central do Axios com os seguintes comportamentos:

- `baseURL` configurada via `NEXT_PUBLIC_API_URL`;
- `withCredentials: true` para sessão baseada em cookie;
- serialização customizada de filtros e ordenação com `qs`;
- tentativa automática de refresh de autenticação ao receber `403`, exceto na própria rota de refresh.

### Padrão de filtros enviado ao backend

Listagens usam uma estrutura semelhante a esta:

```ts
{
  page: 0,
  size: 10,
  sort: [{ field: "name", direction: "asc" }],
  name: "termo de busca"
}
```

No envio HTTP, a ordenação é convertida para o formato:

```text
sort=name,asc
```

## Exemplos de endpoints

Abaixo estão os principais endpoints consumidos pelo front-end. Os exemplos assumem a base `http://localhost:8080/api`.

### Autenticação

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@empresa.com",
  "password": "Senha123"
}
```

#### Logout

```http
POST /auth/logout
```

#### Refresh de sessão

```http
POST /auth/refresh
```

### Usuários

#### Obter usuário autenticado

```http
GET /users
```

#### Criar usuário

```http
POST /users/create
Content-Type: application/json

{
  "name": "Ana",
  "lastName": "Silva",
  "email": "ana@empresa.com",
  "cpf": "12345678901",
  "password": "Senha123",
  "address": {
    "cep": "01001000",
    "street": "Praça da Sé",
    "neighborhood": "Sé",
    "city": "São Paulo",
    "number": "100"
  },
  "socialName": "3S Eventos",
  "instagram": "@3seventos"
}
```

### Dashboard

#### Resumo gerencial

```http
GET /dashboard/summary
```

### Produtos

#### Listar produtos com paginação

```http
GET /users/products?page=0&size=10&sort=name,asc&name=cadeira
```

#### Criar produto

```http
POST /users/products
Content-Type: application/json

{
  "name": "Cadeira Tiffany",
  "description": "Cadeira para eventos",
  "price": 149.9,
  "stock": 120
}
```

#### Buscar produto por ID

```http
GET /products/{id}
```

#### Atualizar produto

```http
PUT /products/{id}
Content-Type: application/json

{
  "name": "Cadeira Tiffany Premium",
  "price": 169.9,
  "stock": 100
}
```

#### Remover produto

```http
DELETE /products/{id}
```

### Clientes

#### Listar clientes com paginação

```http
GET /users/costumers?page=0&size=10&sort=name,asc&name=maria
```

#### Criar cliente

```http
POST /costumers/create
Content-Type: application/json

{
  "name": "Maria",
  "lastName": "Oliveira",
  "email": "maria@email.com",
  "cpf": "98765432100",
  "address": {
    "cep": "30140071",
    "street": "Av. Afonso Pena",
    "neighborhood": "Centro",
    "city": "Belo Horizonte",
    "number": "450"
  }
}
```

### Tempo real

#### WebSocket de produtos

```text
/ws-products
Topic: /topic/products
```

#### WebSocket de clientes

```text
/ws-costumers
Topic: /topic/costumers
```

## Fluxos principais

### 1. Login

1. Usuário acessa `/login`.
2. O formulário envia `POST /auth/login`.
3. O estado global de autenticação é atualizado.
4. O usuário é redirecionado para `/dashboard?login=true`.

### 2. Cadastro de usuário

1. Usuário preenche o formulário multi-step em `/register`.
2. O front-end valida os dados com `zod`.
3. A aplicação envia `POST /users/create`.
4. Após sucesso, o login é executado automaticamente.

### 3. Gestão de produtos

1. A listagem consulta `GET /users/products` com filtros.
2. O cadastro envia `POST /users/products`.
3. Edições usam `PUT /products/{id}`.
4. Remoções usam `DELETE /products/{id}`.
5. Novos produtos também podem entrar na interface em tempo real via tópico STOMP.

### 4. Gestão de clientes

1. A listagem consulta `GET /users/costumers`.
2. O cadastro envia `POST /costumers/create`.
3. Novos clientes podem ser recebidos em tempo real via WebSocket.

## Padrões e observações técnicas

- O projeto usa aliases de importação como `@components`, `@hooks` e `@contexts`.
- As áreas pública e privada são separadas no App Router usando segmentos de rota.
- Os formulários priorizam validação declarativa e feedback visual de erro.
- O módulo de pedidos ainda aparenta estar em evolução no front-end.
- O nome do módulo `costumers` segue o padrão atualmente adotado no código e na API.

## Próximos passos recomendados

- adicionar uma seção de arquitetura com diagrama dos módulos;
- publicar uma documentação OpenAPI/Swagger do backend;
- incluir exemplos de resposta dos endpoints;
- documentar estratégia de deploy e variáveis por ambiente.
