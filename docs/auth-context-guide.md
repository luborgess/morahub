# 🔐 Guia do Sistema de Autenticação

## 🌟 Visão Geral

O sistema de autenticação do MoraHub é baseado no Supabase e oferece:
- Autenticação com email/senha
- Persistência de sessão
- Proteção de rotas
- Gerenciamento de perfil
- Diferentes tipos de usuário (USER/ADMIN)

## 🔑 Componentes Principais

### 1. AuthContext

O `AuthContext` é o coração do sistema, gerenciando o estado de autenticação e fornecendo métodos úteis:

```typescript
interface AuthContextType {
  // Estado
  user: UserModel | null        // Usuário atual
  loading: boolean             // Estado de carregamento
  error: string | null         // Mensagem de erro

  // Métodos de Autenticação
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: UserInsert) => Promise<void>
  signOut: () => Promise<void>
  
  // Gerenciamento de Senha
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  
  // Perfil
  updateProfile: (data: {
    name?: string
    commercial_name?: string
    bio?: string
  }) => Promise<void>
}
```

### 2. RequireAuth

Componente para proteger rotas que requerem autenticação:

```typescript
import { RequireAuth } from '@/components/auth/RequireAuth'

// Proteger rota simples
<Route
  path="/profile"
  element={
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  }
/>

// Proteger rota com tipo específico de usuário
<Route
  path="/admin"
  element={
    <RequireAuth allowedTypes={['ADMIN']}>
      <AdminPage />
    </RequireAuth>
  }
/>
```

## 💻 Como Usar

### 1. Provider

Primeiro, envolva sua aplicação com o `AuthProvider`:

```typescript
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      {/* Conteúdo da aplicação */}
    </AuthProvider>
  )
}
```

### 2. Hook useAuth

Use o hook `useAuth` em qualquer componente para acessar o contexto:

```typescript
import { useAuth } from '@/contexts/AuthContext'

function ProfileButton() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <div>
      <p>Olá, {user.name}</p>
      <button onClick={signOut}>Sair</button>
    </div>
  )
}
```

### 3. Login/Registro

```typescript
function LoginForm() {
  const { signIn, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      // Sucesso - usuário será redirecionado
    } catch (err) {
      // Erro já tratado pelo contexto
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert variant="destructive">{error}</Alert>}
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
```

### 4. Gerenciamento de Perfil

```typescript
function ProfileForm() {
  const { user, updateProfile, loading } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState(user?.bio || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile({ name, bio })
      // Sucesso
    } catch (err) {
      // Erro
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        Salvar
      </Button>
    </form>
  )
}
```

## 🔒 Proteção de Rotas

### 1. Rotas Públicas
- Página inicial
- Login/Registro
- Visualização de anúncios

### 2. Rotas Autenticadas
- Perfil do usuário
- Criar/editar anúncios
- Configurações da conta

### 3. Rotas Admin
- Painel administrativo
- Gerenciamento de usuários
- Configurações do sistema

## 🎯 Boas Práticas

1. **Segurança**
   - Nunca armazene senhas
   - Use HTTPS
   - Implemente rate limiting
   - Valide inputs

2. **UX**
   - Feedback claro de erros
   - Estados de loading
   - Redirecionamentos intuitivos
   - Mensagens amigáveis

3. **Performance**
   - Cache de sessão
   - Lazy loading de rotas protegidas
   - Otimização de requisições

4. **Manutenção**
   - Logs de erro
   - Monitoramento de sessões
   - Backup de dados

## 🚀 Dicas Avançadas

1. **Refresh Token**
   ```typescript
   // O Supabase já gerencia refresh tokens automaticamente
   // Mas você pode forçar um refresh:
   const { data, error } = await supabase.auth.refreshSession()
   ```

2. **Logout em Múltiplos Dispositivos**
   ```typescript
   // Force logout em todos os dispositivos
   await supabase.auth.signOut({ scope: 'global' })
   ```

3. **Verificação de Email**
   ```typescript
   // Enviar email de verificação
   const { error } = await AuthService.sendVerificationEmail(email)
   ```

4. **OAuth (Futuro)**
   ```typescript
   // Preparado para adicionar login social
   const { data, error } = await supabase.auth.signInWithOAuth({
     provider: 'google'
   })
   ```

## 📚 Recursos Adicionais

1. [Documentação do Supabase Auth](https://supabase.com/docs/guides/auth)
2. [Guia de Segurança](https://supabase.com/docs/guides/auth/auth-helpers)
3. [Exemplos de Implementação](https://github.com/supabase/supabase/tree/master/examples/auth)