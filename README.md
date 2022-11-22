# NG Wallet

Esse projeto é uma pequena carteira digital construida como parte do desafio
técnico para a NG CASH.

![Pagina Principal](https://i.imgur.com/i456eyT.png)

## Como rodar o projeto

<details>
    <summary><strong>Rodando Localmente</strong></summary>

  Clone o projeto

  ```bash
    git clone git@github.com:GusttavoCDN/ngCash.git
  ```

  Vá para a pasta do projeto

  ```bash
    cd ngCash
  ```

  Instale as dependencias

  ```bash
    yarn install
  ```

  Inicie o servidor no frontend

  ```bash
    yarn frontend
  ```

  Inicie o servidor no backend

  ```bash
    yarn backend
  ```

  - O frontend estará disponivel em `http://localhost:5173`
  - O backend estará disponivel em `http://localhost:3000`

  **OBS**: Não se esqueça de verificar o arquivo .env-example e configurar a conexão com o seu banco de dados local.
</details>

<details>
  <summary><strong>Rodando com Docker</strong></summary>

  Clone o projeto

  ```bash
    git clone git@github.com:GusttavoCDN/ngCash.git
  ```

  Vá para a pasta do projeto

  ```bash
    cd ngCash
  ```

  Execute o comando para iniciar o docker

  ```bash
    yarn compose:up ou docker-compose up -d
  ```

  Entre dentro do shell do container

  ```bash
    docker exec -it ng_wallet bash
  ```

  Instale as dependencias

  ```bash
    yarn install
  ```

  Inicie a aplicação

  ```bash
    yarn start
  ```

  - O frontend estará disponivel em `http://localhost:5173`
  - O backend estará disponivel em `http://localhost:3000`

</details>

## 🛠 Tecnologias utilizadas

**front-end**: React, Context-API, Styled-Components, Axios, React-Router-Dom, Typescript

**back-end**: NodeJS, Express, Typescript, Prisma, Postgres, Docker, Joi, Bcrypt, JsonWebToken
