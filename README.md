# Desafio de Desenvolvimento

Este é o desafio prático para a vaga de Desenvolvedor(a). O objetivo é construir uma aplicação web que utiliza **React** com **TypeScript**, **Firebase Auth**, **Firebase Firestore**, **Firebase Functions**, **Material UI** e **TailwindCSS**.

## Tecnologias Utilizadas

- **React** com **TypeScript**
- **Firebase Auth** (para autenticação)
- **Firebase Firestore** (para banco de dados)
- **Firebase Functions** (para funções automatizadas)
- **Material UI** (componentes de interface)
- **TailwindCSS** (estilização)

## Funcionalidades Requeridas

### 1. **Autenticação**

- Crie as telas de **login** e **cadastro** utilizando **Firebase Auth**.
- Garanta que cada usuário tenha acesso apenas aos seus próprios dados (formato SaaS).

### 2. **Conexões**

- Desenvolva uma tela para gerenciar uma **lista de conexões**.
  - Cada conexão deve ter apenas um campo: **Nome da Conexão**.

### 3. **Contatos**

- Cada conexão deve ter sua própria **lista de contatos**.
  - Um contato deve possuir os campos: **Nome** e **Telefone**.

### 4. **Envio de Mensagens (Broadcast)**

- Crie uma tela para **envio de mensagens** com as seguintes funcionalidades:
  - Selecionar contatos específicos da lista para envio de mensagens.
  - Agendar o envio de mensagens para um horário futuro (utilize **Firebase Functions** para disparar automaticamente).
  - Simular o envio das mensagens (**não é necessário enviar mensagens reais, apenas atualizar o status**).

### 5. **Gerenciamento de Mensagens**

- Desenvolva uma tela com as funcionalidades:
  - Filtrar mensagens por status (**enviadas** e **agendadas**).
  - Atualizar automaticamente o status das mensagens agendadas para **"Enviada"** no horário programado (via **Firebase Functions**).

### 6. **Realtime Firestore**

- O projeto deve utilizar o recurso de **Realtime do Firestore** para atualizar as listas de conexões, contatos e mensagens automaticamente na interface.

### 7. **Código Limpo e Boas Práticas**

- **Aplicar os princípios de Clean Code** em toda a implementação.
- O código deve ser **bem estruturado, organizado e legível**, facilitando a manutenção e evolução do projeto.

## Requisitos de Segurança e Formato SaaS

- Garanta que cada cliente (usuário autenticado) visualize apenas suas próprias conexões, contatos e mensagens.
- Não permita que usuários tenham acesso a dados de outros clientes.

## UI/UX

- Utilize componentes prontos do **Material UI**.
- Estilização complementar e layout responsivo com **TailwindCSS**.

## Instalação e Execução

### 1. **Clone o repositório**

Clone este repositório para o seu ambiente local:

```bash
git clone git@github.com:r2brito/message-hub.git
cd message-hub
```
