# Guia de Contribuição

Obrigado por considerar contribuir com o MoraHub! Este documento fornece diretrizes e informações importantes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits e Pull Requests](#commits-e-pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

## 🤝 Código de Conduta

Este projeto segue um Código de Conduta que todos os contribuidores devem respeitar. Por favor, leia [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) antes de contribuir.

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

- Node.js (v18 ou superior)
- pnpm (v8 ou superior)
- Git

### Setup

```bash
# Clone o repositório
git clone https://github.com/seu-username/morahub.git
cd morahub

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
pnpm dev
```

## 📝 Padrões de Código

### Geral

- Use TypeScript para todo código novo
- Mantenha a compatibilidade com ES6+
- Siga o estilo de código existente
- Mantenha os componentes pequenos e focados
- Escreva comentários claros quando necessário

### TypeScript

- Use tipos explícitos (evite `any`)
- Prefira interfaces sobre tipos
- Use enums para valores constantes
- Documente funções públicas

### React

- Use componentes funcionais
- Implemente tratamento de erros
- Mantenha o estado o mais local possível
- Use hooks customizados para lógica reutilizável

### Estilo

- Use ESLint e Prettier
- Siga as regras do `.editorconfig`
- Use aspas simples
- Use ponto e vírgula

## 📦 Commits e Pull Requests

### Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

Exemplo:
```bash
git commit -m 'feat: adiciona validação de CPF'
```

### Pull Requests

- Use o template fornecido
- Referencie issues relacionadas
- Inclua screenshots se relevante
- Mantenha PRs pequenos e focados
- Responda a todos os comentários

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:

- Versão do Node.js e pnpm
- Sistema operacional
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se possível

Use o template de issue para bugs.

## 💡 Sugerindo Melhorias

Para sugerir melhorias:

1. Verifique se já não existe uma sugestão similar
2. Use o template de feature request
3. Seja específico e detalhado
4. Explique o valor da melhoria
5. Inclua exemplos de uso

## ❓ Dúvidas

Se tiver dúvidas:

- Verifique a [documentação](docs/)
- Procure por issues similares
- Abra uma nova issue com a tag `question`
- Entre em contato via [contato@morahub.com.br](mailto:contato@morahub.com.br)

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma [licença MIT](LICENSE) que cobre este projeto.
