# Payment Gateway API - Teste Técnico

Este projeto é uma API RESTful para gerenciamento de pagamentos multi-gateway, desenvolvida como solução para o teste técnico (Foco nas exigências do Nível 3).

## Tecnologias Utilizadas
- **Framework:** AdonisJS (Node.js)
- **Banco de Dados:** MySQL
- **Validação de Dados:** VineJS
- **Testes Automatizados (TDD):** Japa
- **Infraestrutura:** Docker & Docker Compose

## Requisitos do Sistema
Para rodar este projeto, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão 20 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

## Como instalar e rodar o projeto

1. **Clone o repositório:**
```bash
git clone <https://github.com/suehtamxx/teste_tecnico.git>
cd <my-payment-api>
```

2. **Instale as dependências locais**
```bash
npm install
```

3. **Configure as variaveis de ambiente**
- Crie uma cópia do arquivo de exemplo e renomeie para .env. As variáveis de conexão com o banco e chaves da API já estão pré-configuradas para facilitar a avaliação.
```bash
cp .env.example .env
```

4. **Suba a infraesturura com o docker**
- O comando abaixo irá baixar as imagens, subir o banco de dados MySQL, os dois Mocks dos Gateways e a aplicação AdonisJS de uma só vez.
```bash
docker compose up --build -d
```

5. **Rode as migrations e os seeders**
- Em um novo terminal (mantendo o Docker rodando), execute os comandos abaixo para criar as tabelas e popular o banco com o usuário Admin padrão e os Gateways:
```bash
node ace migration:run
node ace db:seed
```

6. **Inicie a aplicação**
```bash
npm run dev
```

O servidor estará rodando em http://localhost:3333

**Como rodar os testes (TDD)**
- O projeto conta com testes funcionais focados em garantir a segurança e o controle de acesso das rotas (Roles). Para executá-los, abra um terminal na raiz do projeto e rode:
```bash
node ace test
```

**Detalhamento de rotas**

Rotas publicas
- **POST /api/v1/login** - Autenticação do usuário
- **POST /api/v1/purchases** - Realiza uma compra e tenta a cobrança nos gateways.

Rotas privadas (requerem token)

Usuários:

- **POST /api/v1/users** - Cria um novo usuário (Validação via VineJS).

- **GET /api/v1/users** - Lista os usuários.

Produtos:

- **POST /api/v1/products** - Cria um novo produto (Validação via VineJS).

- **GET /api/v1/products** - Lista produtos.

Transações (Reembolso):

- **POST /api/v1/transactions/:id/refund** - Processa o reembolso comunicando-se diretamente com o Mock do Gateway no Docker e atualiza o status no banco (Acesso exclusivo: ADMIN e FINANCE).

Clientes e Gateways:

- **GET /api/v1/clients** - Lista clientes.

- **GET /api/v1/gateways** - Lista gateways.

**Observações sobre a Implementação**

- Validação de Dados: Implementada utilizando o VineJS, garantindo a integridade dos dados antes de tocarem o banco de dados.

- Controle de Acesso: Criação de Middlewares personalizados para interceptar requisições e garantir que apenas usuários com as roles corretas acessem determinados endpoints.

- Estratégia do Teste: O foco da entrega foi garantir o funcionamento perfeito dos requisitos obrigatórios e de infraestrutura do Nível 3 (Docker, TDD, Roles e Validação com VineJS), priorizando a segurança da API e a comunicação HTTP real com os Mocks.
