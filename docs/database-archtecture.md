# 🗄️ Arquitetura do Banco de Dados

> MoraHub - Documentação técnica do esquema de dados e fluxos principais

## 📊 Diagrama ER

```mermaid
erDiagram
    %% Relacionamentos principais
    HOUSING ||--o{ USERS : "mora em"
    USERS ||--o{ VALIDATIONS : "possui"
    USERS ||--o{ LISTINGS : "cria"
    CATEGORIES ||--o{ SUBCATEGORIES : "tem"
    CATEGORIES ||--o{ LISTINGS : "pertence"
    SUBCATEGORIES ||--o{ LISTINGS : "pertence"

    %% Entidades e seus atributos
    HOUSING {
        UUID id PK "Identificador único"
        TEXT name "Nome da moradia"
        TIMESTAMP created_at "Data de criação"
        TIMESTAMP updated_at "Data de atualização"
    }

    USERS {
        UUID id PK "Identificador único"
        UUID housing_id FK "Referência à moradia"
        TEXT email "Email do usuário"
        TEXT name "Nome completo"
        TEXT commercial_name "Nome comercial/apelido"
        TEXT celular "Número de celular"
        TEXT cpf "CPF do usuário"
        TEXT bio "Biografia/descrição"
        TEXT image_url "URL da foto de perfil"
        ENUM type "Tipo de usuário"
        ENUM status "Status da conta"
        TIMESTAMP created_at "Data de criação"
        TIMESTAMP updated_at "Data de atualização"
    }

    VALIDATIONS {
        UUID id PK "Identificador único"
        UUID user_id FK "Referência ao usuário"
        ENUM type "Tipo de validação"
        ENUM status "Status da validação"
        TEXT document_url "URL do documento"
        TEXT observacao "Observações"
        TEXT response "Resposta da validação"
        TIMESTAMP created_at "Data de criação"
        TIMESTAMP updated_at "Data de atualização"
    }

    CATEGORIES {
        UUID id PK "Identificador único"
        TEXT name "Nome da categoria"
        TEXT description "Descrição"
        TEXT icon "Ícone da categoria"
        ENUM type "Tipo da categoria"
        BOOLEAN active "Status ativo/inativo"
        INTEGER order "Ordem de exibição"
        TIMESTAMP created_at "Data de criação"
        TIMESTAMP updated_at "Data de atualização"
    }

    SUBCATEGORIES {
        UUID id PK "Identificador único"
        UUID category_id FK "Referência à categoria"
        TEXT name "Nome da subcategoria"
        TEXT description "Descrição"
        BOOLEAN active "Status ativo/inativo"
        INTEGER order "Ordem de exibição"
        TIMESTAMP created_at "Data de criação"
        TIMESTAMP updated_at "Data de atualização"
    }

    LISTINGS {
        UUID id PK "Identificador único"
        UUID user_id FK "Referência ao usuário"
        UUID category_id FK "Referência à categoria"
        UUID subcategory_id FK "Referência à subcategoria"
        TEXT title "Título do anúncio"
        TEXT description "Descrição detalhada"
        DECIMAL price "Preço do item"
        ENUM type "Tipo do anúncio"
        ENUM status "Status do anúncio"
        TEXT[] images "URLs das imagens"
        TEXT condition "Condição do item"
        TEXT availability "Disponibilidade"
        INTEGER visualizacoes "Contador de visualizações"
        TIMESTAMP created_at "Data de criação"
        TIMESTAMP updated_at "Data de atualização"
    }
```

## 🔄 Tipos ENUM

### User Type
| Valor | Descrição | Permissões |
|-------|-----------|------------|
| `VISITOR` | Visitante sem vínculo | Visualização básica |
| `UFMG` | Membro da comunidade UFMG | Acesso a todas funcionalidades |
| `RESIDENT` | Morador de moradia | Acesso privilegiado |
| `ADMIN` | Administrador do sistema | Acesso total |

### User Status
| Valor | Descrição | Comportamento |
|-------|-----------|---------------|
| `ACTIVE` | Usuário ativo | Acesso total |
| `INACTIVE` | Usuário inativo | Sem acesso |
| `BLOCKED` | Usuário bloqueado | Banido do sistema |

### Validation Type
| Valor | Descrição | Documentos Necessários |
|-------|-----------|----------------------|
| `HOUSING` | Validação de moradia | Comprovante de residência |
| `UFMG_AFFILIATION` | Validação UFMG | Comprovante de vínculo |

### Validation Status
| Valor | Descrição | Próximos Passos |
|-------|-----------|-----------------|
| `PENDING` | Em análise | Aguardar revisão |
| `APPROVED` | Aprovado | Acesso liberado |
| `REJECTED` | Rejeitado | Submeter novamente |

### Listing Type
| Valor | Descrição | Características |
|-------|-----------|-----------------|
| `PRODUCT` | Produto físico | Requer imagens |
| `SERVICE` | Serviço | Requer descrição detalhada |

### Listing Status
| Valor | Descrição | Visibilidade |
|-------|-----------|--------------|
| `ACTIVE` | Anúncio ativo | Visível para todos |
| `INACTIVE` | Anúncio pausado | Visível só para dono |
| `SOLD` | Item vendido | Marcado como vendido |
| `DELETED` | Anúncio removido | Não visível |

## 📝 Notas Técnicas

### Convenções
- Todos os `id` são UUIDs v4
- Timestamps são armazenados em UTC
- Arrays são implementados como JSONB no PostgreSQL
- Campos de texto longos são limitados a 2000 caracteres
- Preços são armazenados com 2 casas decimais

### Índices
- Chaves primárias (PK): índice B-tree
- Chaves estrangeiras (FK): índice B-tree
- Campos de busca: índice GiST para texto
- Status e tipos: índice Hash

### Constraints
- Chaves estrangeiras com DELETE CASCADE
- Campos obrigatórios: id, created_at
- Validações de email e CPF
- Limite de 10 imagens por anúncio

### Segurança
- Row Level Security (RLS) ativo
- Políticas por tipo de usuário
- Auditoria de mudanças
- Backup diário

## 🔄 Fluxos Principais

### Criação de Anúncio
1. Usuário autenticado cria listing
2. Validação de campos obrigatórios
3. Processamento de imagens
4. Notificação para moderação

### Validação de Usuário
1. Upload de documentos
2. Criação do registro de validação
3. Análise por administrador
4. Atualização de status

## 📚 Referências

- [Documentação PostgreSQL](https://www.postgresql.org/docs/)
- [Supabase Schema](https://supabase.com/docs/guides/database)
- [Mermaid ER Diagrams](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)
