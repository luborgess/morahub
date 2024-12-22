# 🤝 Guia de Contribuição

> Obrigado por considerar contribuir com o MoraHub! Este documento fornece as diretrizes e melhores práticas para contribuir com nosso projeto.

## 📋 Índice

- [Código de Conduta](#-código-de-conduta)
- [Como Contribuir](#-como-contribuir)
- [Ambiente de Desenvolvimento](#-ambiente-de-desenvolvimento)
- [Padrões de Código](#-padrões-de-código)
- [Commits e PRs](#-commits-e-prs)
- [Reportando Bugs](#-reportando-bugs)
- [Sugerindo Melhorias](#-sugerindo-melhorias)
- [Performance](#-performance)
- [Segurança](#-segurança)
- [Recursos Úteis](#-recursos-úteis)

## 📜 Código de Conduta

Este projeto e todos os participantes são regidos pelo nosso [Código de Conduta](CODE_OF_CONDUCT.md). Ao contribuir, você concorda em seguir suas diretrizes.

## 🚀 Como Contribuir

1. Faça um Fork do projeto
2. Clone seu Fork: `git clone https://github.com/seu-username/morahub.git`
3. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
4. Faça suas alterações
5. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
6. Push para a branch: `git push origin feature/nome-da-feature`
7. Abra um Pull Request

## 💻 Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js 18+
- pnpm 8+
- Git
- VSCode (recomendado)

### Setup do Projeto

```bash
# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
pnpm dev
```

### Extensões Recomendadas (VSCode)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Error Lens

## 📐 Padrões de Código

### TypeScript

- Use tipos explícitos
- Evite `any`
- Documente funções complexas
- Siga o princípio DRY

```typescript
// ✅ Bom
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Evite
function getUser(id): any {
  // ...
}
```

### React

- Use Functional Components
- Hooks para gerenciamento de estado
- Props tipadas com interfaces
- Componentes pequenos e reutilizáveis

```typescript
// ✅ Bom
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Evite
function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### CSS/Tailwind

- Mobile-first
- Reutilize classes com @apply
- Mantenha consistência com design tokens
- Use variáveis CSS para temas

## 📝 Commits e PRs

### Conventional Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova feature
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` manutenção

### Pull Requests

- Mantenha PRs pequenos e focados
- Descreva claramente as mudanças
- Inclua screenshots se relevante
- Referencie issues relacionadas
- Aguarde review antes de merge

## 🐛 Reportando Bugs

1. Verifique se o bug já foi reportado
2. Use o template de bug report
3. Forneça passos para reproduzir
4. Inclua logs/screenshots
5. Descreva o comportamento esperado

## 💡 Sugerindo Melhorias

1. Verifique se a sugestão já existe
2. Use o template de feature request
3. Descreva o problema e solução
4. Considere o impacto da mudança
5. Forneça exemplos de uso

## ⚡ Performance

- Otimize imagens
- Lazy load componentes
- Minimize bundle size
- Cache quando possível
- Monitore métricas Core Web Vitals

## 🔒 Segurança

- Não exponha dados sensíveis
- Valide inputs
- Sanitize outputs
- Siga as melhores práticas OWASP
- Reporte vulnerabilidades em privado

## 📚 Recursos Úteis

- [Documentação React](https://react.dev)
- [Documentação TypeScript](https://www.typescriptlang.org/docs)
- [Documentação Tailwind](https://tailwindcss.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org)

---

<div align="center">

**Dúvidas?** [Abra uma issue](https://github.com/luborgess/morahub/issues/new) ou entre em contato via [email](mailto:contato@morahub.com.br).

</div>
