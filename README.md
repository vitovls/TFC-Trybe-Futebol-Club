<img src="https://nodejs.org/static/images/logo.svg" width="100px" align="right">

# Trybe Futebol Clube ⚽🏆

O Trybe Futebol Clube, ou TFC, é um projeto que emula partidas e a classificação dos times de um campeonato de futebol.

O projeto foi feito com um frontend já implementado pela Trybe, escola de programação.
O foco do projeto era no backend, onde foi feita uma API REST para o site.

![Demo Aplicação](/front-example.png)

### Tecnologias utilizadas no seu desenvolvimento:
  - Express com Node.js + Typescript.
  - Mysql com Sequelize.
  - Docker + Docker Compose.
  - Testes com chai, sinon.

### As principais habilidades desenvolvidas ao longo do projeto foi:
  - Realizar teste unitários
  - Realizar a dockerização dos apps, network, volume e compose;
  - Modelar dados com MySQL através do Sequelize;
  - Criar e associar tabelas usando models do sequelize;
  - Construir uma API REST com endpoints para consumir os models criados;
  - Fazer um CRUD utilizando ORM;

### Instalando as dependências necessárias

O projeto usa o gerenciador de pacotes *NPM*.

<img src=https://img.shields.io/badge/npm-v8.5.5-green>

Primeiro instale as dependências gerais do projeto.

Na pasta `raiz` do projeto execute:

```bash
npm install
```

### Utilizando docker: 
Com o [docker](https://docs.docker.com/engine/install/) e o [docker-compose](https://docs.docker.com/compose/install/) instalados.

<img src=https://img.shields.io/badge/docker-v2020.10.13-informational>
<img src=https://img.shields.io/badge/docker--compose-v2.3.3-informational>

Na pasta `./app` execute: 

```bash
npm run compose:up
```

## Para usar a aplicação localmente

#### Configurando environments

As seguintes variáveis de ambiente devem ser configuradas
```
PORT
DB_USER
DB_PASS
DB_NAME=TRYBE_FUTEBOL_CLUBE
DB_HOST
DB_PORT
```

#### Iniciando backend

Na pasta `./app/backend` execute: 

```bash
npm start
```

#### Iniciando frontend

E na pasta `./app/frontend` execute: 

```bash
npm start
```
Com isso a aplicação já vai está rodando localmente na sua maquina, basta entrar no navegador. Caso não tenha aberto automaticamente `http://localhost:3000/`
