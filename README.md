# Projeto de Cadastro de Clientes
Neste projeto, utilizei o **Angular** como framework frontend para construir uma interface moderna, responsiva e de fácil usabilidade. Toda a comunicação com o banco de dados foi feita através de uma API desenvolvida em **PHP**, responsável por processar as requisições de cadastro, listagem, edição e exclusão dos clientes.

O banco de dados **MySQL** foi utilizado para armazenar as informações de forma estruturada e segura. Essa integração entre as tecnologias permite uma aplicação completa com funcionalidades de **CRUD** (Create, Read, Update, Delete).

## ✅ Principais recursos

- Formulários com validações reativas no Angular.
- Máscaras para campos como telefone.
- Integração entre frontend e backend via HTTP.
- Arquitetura separada para organização e manutenibilidade.
- Utilização de boas práticas com services, modules e rotas.

---

## 🚀 Instalação e Execução Local

### Requisitos

- Node.js instalado
- Angular CLI
- PHP (versão 7.4+)
- Servidor MySQL
- Git


## Como Rodar o Projeto

### 1. Clone o repositório
Clone este repositório para sua máquina local:

```bash
git clone https://github.com/deividev5/Projeto-de-cadastro-de-clientes.git
````

### 2. Instale as dependências do Angular

Acesse o diretório do frontend e instale as dependências do Angular:

```bash
cd Projeto-de-cadastro-de-clientes/frontend
npm install
```

### 3. Inicie o frontend

Execute o comando abaixo para rodar o servidor de desenvolvimento do Angular:

```bash
ng serve
```

Isso irá iniciar o servidor no endereço `http://localhost:4200`.

### 4. Configure e inicie o backend

* Copie a pasta **php** para um servidor local (ex: `htdocs` no XAMPP).
* Configure o arquivo de conexão com o banco **conexao.php** com os dados de acesso ao seu banco de dados MySQL.


### 5. Acesse a aplicação

* **Frontend**: Acesse o aplicativo no navegador pelo endereço `http://localhost:4200`.
* **Backend (API PHP)**: A API pode ser acessada através de um servidor local, por exemplo, `http://localhost/php/index.php`.

## Contribuição

Fique à vontade para contribuir com melhorias e sugestões. Para isso, basta fazer um fork do repositório, realizar as alterações desejadas e enviar um pull request.


```

Esse formato organiza bem as instruções e facilita para quem for configurar e rodar o projeto. Se precisar de mais ajustes ou informações adicionais, estou à disposição!
```


