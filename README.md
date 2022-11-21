# NG Wallet

Esse projeto é uma pequena carteira digital construida como parte do desafio
técnico para a NG CASH.

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

<details>

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

Execute o comando iniciar o docker

```bash
  yarn compose:up ou docker-compose up -d
```

- O frontend estará disponivel em `http://localhost:5173`
- O backend estará disponivel em `http://localhost:3000`

</details>
