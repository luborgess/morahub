# MoraHub

<div align="center">

<img src="https://imgur.com/dR0HLjC.jpg" alt="MoraHub Logo" width="200" height="50" style="max-width: 100%; height: auto;" />
<br></br>

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.3-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite_5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

**Conectando produtos e serviços nas moradias universitárias da UFMG**

[🌐 Acessar](https://morahub.com.br) · [🐛 Bugs](https://github.com/luborgess/morahub/issues) · [✨ Features](https://github.com/luborgess/morahub/issues)

</div>

---

## 💡 Sobre o Projeto

O MoraHub surgiu para resolver um problema real: a dispersão de informações sobre produtos e serviços nas moradias universitárias da UFMG.

### Desafio Atual 🎯
- Anúncios espalhados em diversos grupos de WhatsApp
- Dificuldade em encontrar produtos e serviços específicos
- Repostagens constantes para manter visibilidade
- Falta de sistema de confiança entre usuários

### Nossa Solução 🚀
- Hub central para todos os anúncios
- Sistema de busca e filtros avançados
- Validação de vínculo universitário 
- Comunicação direta via WhatsApp
- Interface otimizada para mobile (PWA)

---

## ⚡ Stack Técnica

### Frontend
- ⚛️ **Core**: React 18 + Vite 5 + TypeScript 5
- 🎨 **UI/UX**: Tailwind CSS 3 + Shadcn/ui
- 🔄 **Estado**: Zustand
- 📝 **Forms**: React Hook Form + Zod
- 🔒 **Auth**: Supabase Auth
- 📱 **PWA**: Vite PWA

### Backend (Supabase)
- 📦 **Database**: PostgreSQL + Supabase
- 🗄️ **Storage**: Supabase Storage
- 🔒 **Segurança**: Row Level Security (RLS)
- 🔄 **Real-time**: Supabase Realtime
- 🔑 **Auth**: Supabase Auth

### DevOps & Tooling
- 📦 **Package Manager**: pnpm
- 🛠️ **Build Tool**: Vite
- 🧪 **Testing**: Vitest
- 📝 **Linting**: ESLint + Prettier
- 📱 **Mobile**: PWA + Capacitor

---

## 🚀 Começando

```bash
# Clone o repositório
git clone https://github.com/luborgess/morahub.git
cd morahub

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
pnpm dev
```

## 📚 Documentação

Para mais informações sobre o projeto, consulte nossa [documentação](docs/):

- [Roadmap](docs/roadmap.md)
- [Diagrama do Banco de Dados](docs/database-diagram.md)
- [Guia de Contribuição](docs/CONTRIBUTING.md)

## 👥 Time

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/lucasfabriciob">
        <img src="https://github.com/luborgess.png" width="100px;" alt="Lucas Borges"/>
        <br />
        <sub><b>Lucas Borges</b></sub>
      </a>
      <br />
      <sub>Graduando em Sistemas de Informação - UFMG</sub>
      <br /> <br />
      <a href="https://github.com/luborgess">
        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
      </a>
      <a href="https://www.linkedin.com/in/lucasfabriciob">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/emanuelly-carvalho/">
        <img src="https://github.com/emanuellycarvalho.png" width="100px;" alt="Emanuelly Carvalho"/>
        <br />
        <sub><b>Emanuelly Carvalho</b></sub>
      </a>
      <br />
      <sub>Graduanda em Sistemas de Informação - UFMG</sub>
      <br /> <br />
      <a href="https://github.com/emanuellycarvalho">
        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
      </a>
      <a href="https://www.linkedin.com/in/emanuelly-carvalho/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

## 🤝 Contribuindo

Adoramos contribuições! Se você tem uma ideia para melhorar o MoraHub:

1. 🍴 Fork o projeto
2. 🔨 Crie sua Feature Branch (`git checkout -b feature/MinhaFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. 📤 Push para a Branch (`git push origin feature/MinhaFeature`)
5. 🔀 Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📱 Contato

🌐 Site: [morahub.com.br](https://morahub.com.br)  
📧 Email: [contato@morahub.com.br](mailto:contato@morahub.com.br)