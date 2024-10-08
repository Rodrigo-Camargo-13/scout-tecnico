---

# MVP Scout Técnico API

API desenvolvida para gerenciar dados de usuários, jogadores, times e treinadores de um sistema de scout técnico para esportes.

## Índice

1. [Descrição](#descrição)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Funcionalidades](#funcionalidades)
4. [Instalação](#instalação)
5. [Execução com Docker](#execução-com-docker)
6. [Fluxograma da Arquitetura](#fluxograma-da-arquitetura)
7. [Rotas Principais da API](#rotas-principais-da-api)
8. [Documentação da API com Swagger](#documentação-da-api-com-swagger)
9. [Frontend](#frontend)
10. [Integração com API Externa](#integração-com-api-externa)
11. [Testes Automatizados](#testes-automatizados)
12. [Licença](#licença)

---

## Descrição

Este projeto é uma API RESTful construída com Flask para permitir operações de CRUD (Create, Read, Update, Delete) para usuários, jogadores, times e treinadores. A API também inclui autenticação de usuário com hash de senha, integração com Swagger para documentação e uma interface gráfica desenvolvida em **React**.

## Tecnologias Utilizadas

- **Python 3.11**
- **Flask**: Framework principal para construção da API
- **Flask-SQLAlchemy**: ORM para interagir com o banco de dados MySQL
- **Flask-Migrate**: Controle de migrações de banco de dados
- **Flask-Bcrypt**: Hashing de senha para autenticação
- **Flask-CORS**: Controle de acesso entre domínios (Cross-Origin Resource Sharing)
- **MySQL**: Banco de dados relacional
- **Swagger**: Documentação interativa da API
- **React**: Interface do usuário para interação com a API
- **Docker**: Para criar containers e simplificar o deploy

## Funcionalidades

- Registro e login de usuários com hash de senha.
- Adição, atualização, exclusão e listagem de jogadores.
- Adição, atualização, exclusão e listagem de times.
- Adição, atualização, exclusão e listagem de treinadores.
- Integração com Swagger para documentação da API.
- Utilização de Docker para deploy tanto do frontend quanto do backend.
- **Integração com API externa pública de dados de partidas de futebol.**

## Instalação

### 1. Pré-requisitos:

- [Python 3.11+](https://www.python.org/downloads/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Docker](https://www.docker.com/get-started) (opcional, caso queira rodar com Docker)
- [Node.js](https://nodejs.org/) (para rodar o frontend localmente)

### 2. Clonar o repositório:

```bash
git clone https://github.com/seu-usuario/mvp-scout-tecnico.git
cd mvp-scout-tecnico
```

### 3. Backend: Criar o ambiente virtual e instalar dependências:

```bash
cd backend
python -m venv venv
source venv/bin/activate   # No Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### 4. Frontend: Instalar dependências e rodar o frontend

```bash
cd frontend
npm install
npm start  # Para rodar o frontend localmente em http://localhost:3000
```

### 5. Configurar o banco de dados MySQL:

#### 5.1. Crie o banco de dados no MySQL:

```sql
CREATE DATABASE login_system;
```

#### 5.2. Verifique o arquivo `.env` no backend e adicione suas credenciais do MySQL:

```bash
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_HOST=localhost
MYSQL_DB=login_system
SECRET_KEY=sua_chave_secreta
FOOTBALL_API_KEY=sua_chave_api_externa
```

> **Nota:** O **FOOTBALL_API_KEY** pode ser obtido se registrando na [Football Data API](https://www.football-data.org/).

### 6. Backend: Migrar o banco de dados:

```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 7. Executar a aplicação:

#### Rodando localmente:

No **backend**:
```bash
flask run
```

No **frontend**:
```bash
npm start
```

#### Acessando a aplicação:
- API: [http://127.0.0.1:5000](http://127.0.0.1:5000)
- Frontend: [http://127.0.0.1:3000](http://127.0.0.1:3000)
- Documentação Swagger: [http://127.0.0.1:5000/swagger/](http://127.0.0.1:5000/swagger/)

---

## Execução com Docker

Para rodar a aplicação com Docker, utilize os seguintes passos:

### 1. Build da imagem:

```bash
docker-compose build
```

### 2. Subir o container:

```bash
docker-compose up
```

A API estará disponível em `http://127.0.0.1:5000`.

O frontend estará disponível em `http://127.0.0.1:3000`.

---

## Fluxograma da Arquitetura

Aqui está um fluxograma simplificado da arquitetura da aplicação:

```plaintext
+----------------------+            +----------------------+
|  Interface do Usuário |            |   Banco de Dados     |
|  (React ou HTML/CSS)  |<---------->|     (MySQL)          |
+----------------------+            +----------------------+
            ^                                      ^
            |                                      |
            |                                      |
+----------------------+            +----------------------+
|       Backend         |            |        Swagger       |
|      (Flask API)      |            |  (Documentação API)  |
+----------------------+            +----------------------+
```

O frontend é responsável por interagir com a API Flask e exibir os dados ao usuário. O backend gerencia as rotas e a lógica de negócios, enquanto o banco de dados MySQL armazena as informações de usuários, jogadores, times e treinadores. O Swagger documenta e facilita a interação com as rotas da API.

---

## Rotas Principais da API

Abaixo estão algumas das principais rotas da API. Todas as operações seguem o padrão RESTful, permitindo operações de criação, leitura, atualização e exclusão:

### Usuários

- `POST /register`: Registra um novo usuário.
- `POST /login`: Autentica um usuário.

### Jogadores

- `GET /players`: Lista todos os jogadores.
- `POST /players`: Adiciona um novo jogador.
- `PUT /players/{id}`: Atualiza um jogador existente.
- `DELETE /players/{id}`: Exclui um jogador.

### Times

- `GET /teams`: Lista todos os times.
- `POST /teams`: Adiciona um novo time.

### Treinadores

- `GET /coaches`: Lista todos os treinadores.

---

## Documentação da API com Swagger

A documentação interativa da API pode ser acessada em `http://127.0.0.1:5000/swagger/`, onde é possível testar as rotas e verificar os dados de entrada e saída esperados.

---

## Frontend

O frontend é desenvolvido com **React** e se comunica diretamente com o backend por meio de chamadas REST para as rotas da API.

### Rodando o frontend separadamente:

1. Instale as dependências do frontend:
   ```bash
   cd frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

O frontend será acessível em `http://localhost:3000`.

---

## Integração com API Externa

A aplicação consome dados de partidas de futebol de uma API externa. Para isso, utilizamos a [Football Data API](https://www.football-data.org/), que oferece informações sobre campeonatos, times e jogadores.

### Passos para utilizar a API:

1. **Cadastro**: Acesse o [site da Football Data API](https://www.football-data.org/) e registre-se para obter uma chave de API (API Key).
2. **Configuração**: Após receber a chave, configure o arquivo `.env` do projeto, adicionando a linha:

```bash
FOOTBALL_API_KEY=sua_chave_api_externa
```

3. **Licença e Limitações**: A API oferece um plano gratuito com limite de requisições por minuto e por dia. Caso precise de mais requisições, você pode verificar os planos pagos na [seção de preços](https://www.football-data.org/pricing).

4. **Rotas Utilizadas**:
   - `GET /competitions`: Retorna uma lista de competições.
   - `GET /teams/{id}`: Retorna os detalhes de um time específico.
   - `GET /matches`: Retorna informações sobre partidas de futebol.

---

## Testes Automatizados

Para rodar os testes automatizados da aplicação, siga os passos abaixo:

1. Ativar o ambiente virtual:

```bash
source venv/bin

/activate   # No Windows use `venv\Scripts\activate`
```

2. Executar os testes:

```bash
pytest
```

> Certifique-se de que você tem o `pytest` instalado em seu ambiente para rodar os testes.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---