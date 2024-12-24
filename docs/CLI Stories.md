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

### 3. Configuração do Contexto de Autenticação

```typescript
// 👾 Criar o arquivo AuthContext.tsx em src/contexts
import { AuthProvider, useAuth } from './contexts/AuthContext'

// 👾 Envolver a aplicação com o Provider
function App() {
  return (
    <AuthProvider>
      {/* Conteúdo da aplicação */}
    </AuthProvider>
  )
}

// 👾 Usar o hook useAuth em qualquer componente
function LoginComponent() {
  const { user, signIn, signOut } = useAuth()
  
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sair</button>
      ) : (
        <button onClick={() => signIn('email@exemplo.com', 'senha')}>Entrar</button>
      )}
    </div>
  )
}
```
#### Funcionalidades do AuthContext:
- 👾 Gerenciamento de estado do usuário
- 👾 Login com email/senha
- 👾 Registro de novos usuários
- 👾 Logout
- 👾 Estado de loading para feedback visual
- 👾 Tipagem completa com TypeScript

#### Uso do Hook:
```typescript
const { 
  user,      // Usuário atual (null se não autenticado)
  loading,   // Estado de carregamento
  signIn,    // Função de login
  signUp,    // Função de registro
  signOut    // Função de logout
} = useAuth()
```

### 4. Implementação do CRUD de Categorias

```typescript
// 👾 Criar model Category
src/models/Category.ts
- Definição de tipos
- Métodos de validação
- Interface para insert/update

// 👾 Criar service CategoryService
src/services/CategoryService.ts
- CRUD básico
- Métodos específicos (findParentCategories, findSubcategories)
- Upload de imagens

// 👾 Criar componentes
src/pages/admin/categories/
├── ListCategories.tsx   # Lista de categorias
├── CategoryForm.tsx     # Formulário criar/editar
└── CategoryDetails.tsx  # Visualização detalhada
```

### 5. Implementação do CRUD de Anúncios

```typescript
// 👾 Criar model Listing
src/models/Listing.ts
- Tipos para produto/serviço
- Status (ativo, vendido, expirado)
- Formatadores de preço/data

// 👾 Criar service ListingService
src/services/ListingService.ts
- CRUD completo
- Upload múltiplo de imagens
- Gerenciamento de status
- Incremento de views

// 👾 Criar componentes
src/pages/listings/
├── ListingsList.tsx    # Grid de anúncios
├── ListingForm.tsx     # Formulário com upload
└── ListingDetails.tsx  # Galeria e detalhes
```

### 6. Documentação

```markdown
docs/guides/
├── categories-guide.md  # Guia de categorias
└── listings-guide.md    # Guia de anúncios

// 👾 Conteúdo dos guias:
- Visão geral
- Como usar
- Exemplos práticos
- Boas práticas
- Dicas avançadas
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

## Nova Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Shadcn)
│   └── auth/           # Componentes de autenticação
├── contexts/           # Contextos React
├── models/             # Models de domínio
├── services/           # Serviços de API
├── pages/              # Páginas da aplicação
│   ├── admin/          # Área administrativa
│   ├── auth/           # Autenticação
│   └── listings/       # Anúncios
├── lib/               # Configurações
└── types/             # TypeScript types

docs/
└── guides/            # Guias e documentação
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
