# MoraHub - Setup Guide 🚀

## Configuração Inicial

### 1. Criar Projeto
```bash
npm create vite@latest . --template react-ts
# 👾 Scaffolding de aplicação React com TypeScript usando Vite bundler
# 👾 Configura estrutura base com ESLint, TypeScript e Hot Module Replacement
```

### 2. Dependências Principais

```bash
npm install @supabase/supabase-js
# 👾 Client SDK para interação com Supabase, incluindo autenticação e real-time subscriptions

npm install react-router-dom
# 👾 Sistema de roteamento client-side com suporte a lazy loading e nested routes

npm install class-variance-authority
# 👾 Utility para criar componentes com variantes tipadas em TypeScript

npm install clsx
# 👾 Helper para concatenação condicional de classes CSS

npm install tailwind-merge
# 👾 Utility para resolver conflitos de classes Tailwind

npm install lucide-react
# 👾 Biblioteca de ícones otimizados como componentes React
```

### 3. Configuração CSS

```bash
npm install -D tailwindcss postcss autoprefixer
# 👾 Setup do processador CSS com suporte a prefixing automático
# 👾 Configuração do framework utility-first com JIT compiler

npx tailwindcss init -p
# 👾 Gera tailwind.config.js com preset padrão
# 👾 Cria postcss.config.js com plugins necessários
```

## Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── styles/        # Estilos globais
├── lib/           # Utilitários e configurações
└── types/         # Definições de tipos
```

## Scripts Disponíveis

```bash
npm run dev
# 👾 Inicia servidor de desenvolvimento com HMR ativado

npm run build
# 👾 Compila aplicação para produção com otimizações

npm run preview
# 👾 Serve build de produção localmente para testes
```

## Tecnologias Principais

- 🔷 React + TypeScript
- 🎨 TailwindCSS
- 🔐 Supabase
- 🛣️ React Router
- 💅 Class Variance Authority

## Documentação Relacionada

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [TailwindCSS](https://tailwindcss.com/)
