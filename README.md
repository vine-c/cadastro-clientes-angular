# Cadastro de Clientes

Aplicação web para cadastro, consulta, edição e exclusão de clientes.

O projeto foi desenvolvido utilizando Angular no frontend e uma API REST em ASP.NET Core no backend. A aplicação também possui integração com a API ViaCEP para preenchimento automático do endereço através do CEP.

## 🚀 Demonstração

**Frontend:**  
https://cadastro-clientes-kohl.vercel.app

**Backend:**  
https://cadastro-clientes-api-06j8.onrender.com

## 📋 Funcionalidades

- Cadastro de clientes
- Edição de clientes
- Exclusão de clientes
- Listagem de clientes cadastrados
- Validação de campos obrigatórios
- Validação de e-mail
- Máscara para CPF
- Máscara para telefone
- Máscara para CEP
- Consulta de endereço através do CEP
- Preenchimento automático de:
  - Logradouro
  - Bairro
  - Cidade
  - UF
- Mensagens de validação e erro
- Interface responsiva para dispositivos móveis

## 🛠️ Tecnologias utilizadas

### Frontend

- Angular 21
- TypeScript
- Angular Material
- Reactive Forms
- RxJS
- HTML5
- CSS3

### Backend

- C#
- ASP.NET Core
- .NET 10
- REST API
- HttpClient
- Docker

### Integrações e infraestrutura

- ViaCEP
- Git
- GitHub
- Vercel
- Render

## 🏗️ Arquitetura

A aplicação é dividida em duas partes:

```text
┌──────────────────────────────┐
│          Angular             │
│                              │
│  Componentes                 │
│  Services                    │
│  Reactive Forms              │
│  Angular Material             │
└──────────────┬───────────────┘
               │
               │ HTTP
               ▼
┌──────────────────────────────┐
│      ASP.NET Core API        │
│                              │
│  Controllers                 │
│  Services                    │
│  Models                      │
└──────────────┬───────────────┘
               │
               │ HTTP
               ▼
┌──────────────────────────────┐
│            ViaCEP             │
│                              │
│  Consulta de endereço        │
│  através do CEP              │
└──────────────────────────────┘
