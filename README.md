## 🧾 Visão Geral

Este projeto é uma aplicação web desenvolvida com **React** e **TypeScript**, que utiliza **Firebase** como backend para autenticação e banco de dados em tempo real. O foco do sistema é permitir que usuários realizem **cadastro**, **login** e **gerenciem conexões** ou mensagens.

### 🧱 Tecnologias Utilizadas

- **React (TypeScript)** – Framework principal para o frontend
- **TailwindCSS** – Framework utilitário para estilos
- **Firebase** – Backend como serviço (Auth, Firestore, etc)
- **Material UI** – Biblioteca de componentes UI
- **Vite** – Ferramenta de build para o projeto React
- **React Router** – Gerenciamento de rotas

---

## 📂 Estrutura de Arquivos

```
src/
├── components/
├── contexts/
├── firebase/
├── guards/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── sections/
├── theme/
├── types/
├── validations/
```

---

## 🔐 Funcionalidades

### ✅ Cadastro de Usuário

O componente `registerForm.tsx` contém o formulário que coleta nome, email e senha do usuário. Após preenchimento:

- Validação dos campos
- Registro via `createUserWithEmailAndPassword` (Firebase Auth)
- Possível redirecionamento ou confirmação

### 🔑 Login de Usuário

O componente `loginForm.tsx` permite login com email e senha utilizando o `signInWithEmailAndPassword` do Firebase Auth. Após login bem-sucedido:

- O usuário é redirecionado
- Seu estado de autenticação é mantido

### 🔧 Configurações

O arquivo `config.ts` centraliza configurações como a inicialização do Firebase.

---

## 📌 Rotas da Aplicação

O `App.tsx` define as rotas da aplicação com `react-router-dom`. As principais são:

- `/login` – Página de autenticação
- `/register` – Página de cadastro
- `/` – Página principal

---

## 💅 Estilo

O projeto utiliza **TailwindCSS** como base para o design visual. Isso permite:

- Alta customização
- Estilização responsiva e rápida
- Boa integração com Material UI

---

## 🚀 Como Rodar o Projeto

1. **Instalar dependências**

   ```bash
   npm install
   ```

   ```bash
   yarn install
   ```

2. **Variáveis de Ambiente (.env)**

O projeto utiliza variáveis de ambiente para configurar o Firebase.

```bash
cp .env.example .env
```

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APPID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> 🔒 **Importante:** nunca suba o `.env` para o controle de versão. Adicione ele ao seu `.gitignore`.

3. **Rodar aplicação**

   ```bash
   yarn start
   ```

---
