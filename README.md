# Olá, eu sou Anthony Kewin! 👋



https://github.com/user-attachments/assets/7387b7d1-8c39-4bde-9962-d32ba14577b2



Este projeto é composto por duas partes principais: `web` e `server`.

- A pasta `web` abriga o front-end, desenvolvido com **React, Vite e TypeScript**.
- A pasta `server` concentra o back-end, utilizando **Node.js, Docker e Fastify**.

Trata-se de um aplicativo desktop voltado para o acompanhamento semanal do progresso de metas.

## Gerenciamento de Dados
Para lidar com a estrutura do banco de dados, utilizamos o [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview):
- **Modelo de Banco de Dados**: Contém duas tabelas principais - `goal_completions` e `goals`, ambas interligadas por chaves primárias e estrangeiras.
- **Criação de Migração**: O comando `npx drizzle-kit generate` gera scripts SQL que registram as alterações estruturais no banco de dados e são armazenados em `.migrations`.
- **Execução das Migrações**: Aplicação das alterações com `npx drizzle-kit migrate`, garantindo sincronização com o código.

---
## Configuração e Instalação
Certifique-se de ter o [Docker](https://www.docker.com/products/docker-desktop/) e o [Node.js](https://nodejs.org/en/download/package-manager/current) instalados antes de iniciar.

1. Clone este repositório:
   ```bash
   git clone https://github.com/akewin/NLW-JS
   ```
2. Acesse a pasta do back-end:
   ```bash
   cd NLWPocketJS/server
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm run dev
   ```
5. O back-end estará disponível em [http://localhost:3333](http://localhost:3333).

6. Para o front-end, entre na pasta correspondente:
   ```bash
   cd ../web
   ```
7. Instale as dependências:
   ```bash
   npm install
   ```
8. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
9. O front-end poderá ser acessado em [http://localhost:3000](http://localhost:3000).

---
## Comandos Essenciais
- Criar tabelas:
  ```bash
  npx drizzle-kit generate
  ```
- Aplicar migrações:
  ```bash
  npx drizzle-kit migrate
  ```
- Inspecionar banco de dados:
  ```bash
  npx drizzle-kit studio
  ```
- Inicializar containers Docker:
  ```bash
  docker compose up -d
  ```
- Criar container:
  ```bash
  docker-compose up -d
  ```
