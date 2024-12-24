# ⚡ Stack Técnica Detalhada

## 🎨 Frontend

### Core
- React 18 com TypeScript 5 para tipagem estática
- Vite 5 para build e desenvolvimento rápido
- React Router 6 para navegação declarativa
  
### UI/UX
- Tailwind CSS 3 para estilização utilitária
- Shadcn/ui para componentes acessíveis e customizáveis
- Lucide Icons para ícones consistentes
- Class Variance Authority para variantes de componentes

### Gerenciamento de Estado
- Zustand para estado global simples e performático
- React Query para cache e gerenciamento de estado do servidor
- Context API para estados locais (ex: autenticação)

### Formulários e Validação
- React Hook Form para formulários performáticos
- Zod para validação de tipos em runtime
- Validação de esquema do TypeScript

## 🔧 Backend (Supabase)

### Database
- PostgreSQL 15 como banco de dados principal
- Supabase como plataforma de backend
- Migrations automatizadas para versionamento do banco
- Tipos gerados automaticamente com supabase-js

### Storage & Media
- Supabase Storage para armazenamento de imagens
- Otimização e compressão de imagens
- CDN para entrega rápida de assets
  
### Segurança
- Row Level Security (RLS) para controle granular de acesso
- Políticas por tipo de usuário (VISITOR, UFMG, RESIDENT, ADMIN)
- Autenticação com email/senha e provedores sociais
- Validação de documentos para acesso privilegiado

### Real-time
- Supabase Realtime para atualizações em tempo real
- Websockets para notificações instantâneas
- Pub/Sub para eventos assíncronos

## 🛠️ DevOps & Tooling

### Gerenciamento de Pacotes
- pnpm para instalação rápida e eficiente
- Workspace para monorepo (futuro)
- Versionamento semântico

### Build & Deploy
- Vite para desenvolvimento e build
- GitHub Actions para CI/CD
- Vercel para deploy automático
- Docker para containerização (futuro)

### Qualidade de Código
- Vitest para testes unitários
- Playwright para testes E2E
- ESLint + Prettier para código consistente
- Husky para git hooks

### Mobile & PWA
- PWA para instalação no dispositivo
- Capacitor para apps nativos (futuro)
- Service Workers para offline
- Web Push para notificações

## 📐 Arquitetura

### Padrões de Projeto
- Clean Architecture para separação de responsabilidades
- Feature-first para organização de código
- Atomic Design para componentes
- Repository Pattern para acesso a dados

### Performance
- Code Splitting automático
- Lazy Loading de componentes
- Otimização de assets
- Caching inteligente

### Monitoramento
- Error tracking com Sentry
- Analytics com Plausible
- Logs estruturados
- Métricas de performance
