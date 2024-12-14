# 💻 Locatario BD

Locatario BD é um projeto de banco de dados que tem como objetivo simular um sistema de locação de veículos. O projeto foi desenvolvido para a disciplina de Banco de Dados do curso Bacharelado em Tecnologia da Informação (BTI) da Universidade Federal do Rio Grande do Norte (UFRN).

# Requirements
### For back:
- [Python](https://www.python.org/downloads/)
- [MySQL](https://www.mysql.com/downloads/) (opcional)

### For front:
- [Node.js](https://nodejs.org/pt/download/package-manager)
- [Visual Studio Code](https://code.visualstudio.com/download) (opcional)

# Project Setup

1. Clone o repositório:
  ```bash
  $ git clone https://github.com/maycon-mdrs/banco-de-dados
  ```

2. Antes de rodar o código, é necessário configurar o banco de dado:

    2.1. Crie um scheme chamado `projetobd` e _'Set as Default Schema'_ <br>
    2.2. Acesse `./back/app/scripts/create_tables.sql` e execute o arquivo para criar as tabelas do projeto <br> 
    2.3. Acesse `./back/app/scripts/inserts.sql` e execute o arquivo para popular o banco do projeto

3. Crie um arquivo .env em `./back/`
  
  | Variable      | Description                                        |
  |---------------|----------------------------------------------------|
  | DB_NAME | The name of your database. |
  | DB_USER | The username of your database. |
  | DB_HOST | The host of your database. | 
  | DB_PASSWORD | The password of your database. |

4. Configure uma ambiente virtual python para o projeto backend (Windows)

    4.1. Instale e crie um ambiente virtual
    ```bash
    cd ./back
    $ python -m venv venv
    ```

    4.2. Ative o ambiente virtual
    ```bash
    $ .\venv\Scripts\activate
    ```

    4.3. Instale as dependências
    ```bash
    $ pip install -r requirements.txt
    ```

5. Configure uma ambiente virtual python para o projeto backend (Linux)

    5.1. Instale e crie um ambiente virtual
    ```bash
    cd ./back
    $ python3 -m venv venv
    ```

    5.2. Ative o ambiente virtual
    ```bash
    $ source venv/bin/activate
    ```

    5.3. Instale as dependências
    ```bash
    $ pip install -r requirements.txt
    ```

6. Instale as dependências do projeto frontend
    
    6.1. Instale as dependências
    ```bash
    cd ./front
    $ npm install
    ```
  
# Run Backend

Acesse o back
```bash
$ cd ./back/
```

Para rodar o projeto, faça os comandos abaixo:
```bash
# Se for Windows:
$ .\venv\Scripts\activate

# Se for Linux:
$ source venv/bin/activate

$ fastapi dev main.py
# http://127.0.0.1:8000/api/v1/
# http://127.0.0.1:8000/docs/
```

# Run Frontend

Acesse o front
```bash
$ cd ./front/
```

Para rodar o projeto, faça os comandos abaixo:
```bash
$ npm run dev
# http://localhost:5173/
```

# Folder structure
- `/back/*` - contains the backend code (API).
- `/front/*` - contains the frontend code.
