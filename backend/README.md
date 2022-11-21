
# API Reference

Documentação para utilizar as rotas da API de forma adequada.


## Rotas

<details open>
<summary>Sign-in</summary>

```http
  POST /api/signin
```

| Parametro | Tipo     | Descrição                | 
| :-------- | :------- | :------------------------- |
| `username` | `string`| **Required**. Nome de um usuario cadastrado |
| `password` | `string`| **Required**. Senha do usuario |

**Exemplo de requisição**

```json
  {
    "username": "test",
    "password": "Test@1234"
  }
```

## Resposta de Sucesso

**Code**: 200

**Conteudo:**

```json
  {
	"id": 1,
	"username": "test",
	"account": "bf17de60-9a14-4394-b58d-a892ff128b89",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

## Respostas de Erro

**Condição**: Caso não tenha sido passado username ou password no body da requisição

**Code**: 400

**Conteudo:**

```json
  {
    "message": "Please check the username and password fields and try again"
  }
```

---

**Condição**: Caso username ou passoword não corresopndam a algum usuario cadastrado

**Code**: 404

**Conteudo:**

```json
  {
    "message": "User or password invalid"
  }
```
</details>

<details>
  <summary>Sign-up</summary>

  ```http
    POST /api/signup
  ```

  | Parametro | Tipo     | Descrição                | 
  | :-------- | :------- | :------------------------- |
  | `username` | `string`| **Required**. Nome de usuario a ser cadastrado |
  | `password` | `string`| **Required**. Senha do usuario |

  **Exemplo de requisição**

  ```json
    {
      "username": "test",
      "password": "Test@1234"
    }
  ```

  ## Resposta de Sucesso

  **Code**: 201

  **Conteudo:**

  ```json
    {
      "id": 4,
      "username": "otakdsadasu",
      "account": "94c935e7-2923-4091-9c83-c2e43efc68a7"
    }
  ```

  ## Respostas de Erro

  **Condição**: Caso usuario já exita no banco de dados

  **Code**: 409

  **Conteudo:**

  ```json
    {
      "message": "User already exists"
    }
  ```

  ---

  **Condição**: Caso não tenha sido passado username ou password no body da requisição

  **Code**: 400

  **Conteudo:**

  ```json
    {
      "message": "Please check the username and password fields and try again"
    }
  ```
</details>

<details>
  <summary>Create Transaction</summary>

  ```http
    POST /api/transactions
  ```

  Essa rota precisa receber um token de autenticação gerada na rota de sign-in.


  | Parametro          | Tipo     | Descrição                | 
  | :----------------- | :------- | :------------------------- |
  | `creditedUsername` | `string` | **Required**. Username do usario que recebera a transferencia |
  | `amount`           | `string` | **Required**. Quantidade a ser transferida |

  **Exemplo de requisição**

  ```json
    {
      "creditedUsername": "otaku",
      "amount": 50
    }
  ```

  ## Resposta de Sucesso

  **Code**: 201

  **Conteudo:**

  ```json
    {
	    "message": "Transaction created"
    }
  ```

  ## Respostas de Erro

  **Condição**:  Caso conta do usuario logado não tenha saldo suficiente para realizar a transferencia

  **Code**: 404

  **Conteudo:**

  ```json
    {
      "message": "You do not have enough balance to make this transaction"
    }
  ```

  **Condição**: Caso seja passado o nome de um usuario que não tem conta criada

  **Code**: 404

  **Conteudo:**

  ```json
    {
	    "message": "The account you are trying to credit was not found!"
    }
  ```
---

  **Condição**: Caso usuario tente transferir para si mesmo

  **Code**: 400

  **Conteudo:**

  ```json
   {
	  "message": "You cannot make a transaction to your own account"  
  }
  ```

</details>

<details>
  <summary>Find Account</summary>

  ```http
    GET /api/account
  ```

  Essa rota precisa receber um token de autenticação gerada na rota de sign-in.

  ## Resposta de Sucesso

  **Code**: 200

  **Conteudo:**

  ```json
    {
	    "id": "bf17de60-9a14-4394-b58d-a892ff128b89",
	    "balance": 100
    }
  ```
</details>

<details>
  <summary>Find Transactions</summary>

  ```http
    GET /api/transactions
  ```

  Essa rota precisa receber um token de autenticação gerada na rota de sign-in.

  ## Resposta de Sucesso

  **Code**: 200

  **Conteudo:**

  ```json
      [
      {
        "id": 1,
        "debitedAccountId": "bf17de60-9a14-4394-b58d-a892ff128b89",
        "creditedAccountId": "3db4ccaa-69e4-40aa-9353-6098e812ccf8",
        "value": 50,
        "createdAt": "2022-11-21T16:04:44.396Z"
      },
      {
        "id": 2,
        "debitedAccountId": "bf17de60-9a14-4394-b58d-a892ff128b89",
        "creditedAccountId": "3db4ccaa-69e4-40aa-9353-6098e812ccf8",
        "value": 50,
        "createdAt": "2022-11-21T16:54:39.808Z"
      }
    ]
  ```
</details>

