## 👾 SkyLine DEBUGGER :

### 1. Criar Projeto
```bash
npx create-next-app@latest . --typescript --tailwind --eslint
# 👾 Scaffolding de aplicação Next.js 13 com App Router
# 👾 Configura TypeScript, Tailwind, ESLint e estrutura base
```

### 2. Dependências Principais

```bash
# Auth & Database
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
# 👾 SDK Supabase + Helpers para Next.js Server Components

# UI Components
npm install @radix-ui/react-slot @radix-ui/react-toast class-variance-authority
# 👾 Componentes UI primitivos + sistema de variantes

# Utilities
npm install clsx tailwind-merge framer-motion lucide-react
# 👾 Utils para classes + animações + ícones

# Forms
npm install @hookform/resolvers react-hook-form zod
# 👾 Validação de formulários com type-safety
```

### 3. Configuração Ambiente

```bash
# Variáveis de ambiente
cp .env.example .env.local
# 👾 Setup das variáveis de ambiente necessárias

# Husky & Lint-staged
npm install -D husky lint-staged prettier
# 👾 Git hooks para qualidade de código
```

## Estrutura do Projeto

```
src/
├── app/           # App Router e Pages
├── components/    # Componentes React
├── lib/          # Utilitários e configs
├── hooks/        # React Hooks
├── styles/       # CSS e tokens
└── types/        # TypeScript types
```

## Scripts Disponíveis

```bash
npm run dev
# 👾 Servidor de desenvolvimento com HMR

npm run build
# 👾 Build de produção otimizada

npm run start
# 👾 Serve build de produção

npm run lint
# 👾 Verifica qualidade do código
```

## Tecnologias Principais

- 🚀 Next.js 13 (App Router)
- 🔷 React + TypeScript
- 🎨 TailwindCSS
- 🔐 Supabase
- 💫 Framer Motion
- 🎯 React Hook Form + Zod

## Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.io/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
