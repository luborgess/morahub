# Diagrama do Banco de Dados - MoraHub

```plantuml
@startuml

' Estilo do diagrama
skinparam class {
    BackgroundColor White
    ArrowColor Black
    BorderColor Black
}

' Legenda
legend right
    |= Símbolo |= Significado |
    | <<PK>> | Primary Key (Chave Primária) |
    | <<FK>> | Foreign Key (Chave Estrangeira) |
    | ||--o{ | Relacionamento Um-para-Muitos (1:N) |
    | TEXT | Tipo texto |
    | UUID | Identificador Único Universal |
    | TIMESTAMP | Data e Hora |
    | BOOLEAN | Valor Verdadeiro/Falso |
    | INTEGER | Número Inteiro |
    | DECIMAL | Número Decimal |
    | TEXT[] | Array de Textos |
endlegend

' Enums
enum UserType {
    VISITOR
    UFMG
    RESIDENT
    ADMIN
}

enum UserStatus {
    ACTIVE
    INACTIVE
    BLOCKED
}

enum ValidationType {
    HOUSING
    UFMG_AFFILIATION
}

enum ValidationStatus {
    PENDING
    APPROVED
    REJECTED
}

enum ListingType {
    PRODUCT
    SERVICE
}

enum ListingStatus {
    ACTIVE
    INACTIVE
    SOLD
    DELETED
}

' Entidades
class Housing {
    + id: UUID <<PK>>
    + name: TEXT
    + created_at: TIMESTAMP
    + updated_at: TIMESTAMP
}

class Users {
    + id: UUID <<PK>>
    + housing_id: UUID <<FK>>
    + email: TEXT
    + name: TEXT
    + commercial_name: TEXT
    + celular: TEXT
    + cpf: TEXT
    + bio: TEXT
    + image_url: TEXT
    + type: UserType
    + status: UserStatus
    + created_at: TIMESTAMP
    + updated_at: TIMESTAMP
}

class Validations {
    + id: UUID <<PK>>
    + user_id: UUID <<FK>>
    + type: ValidationType
    + status: ValidationStatus
    + document_url: TEXT
    + observacao: TEXT
    + response: TEXT
    + created_at: TIMESTAMP
    + updated_at: TIMESTAMP
}

class Categories {
    + id: UUID <<PK>>
    + name: TEXT
    + description: TEXT
    + icon: TEXT
    + type: TEXT
    + active: BOOLEAN
    + order: INTEGER
    + created_at: TIMESTAMP
    + updated_at: TIMESTAMP
}

class Subcategories {
    + id: UUID <<PK>>
    + category_id: UUID <<FK>>
    + name: TEXT
    + description: TEXT
    + active: BOOLEAN
    + order: INTEGER
    + created_at: TIMESTAMP
    + updated_at: TIMESTAMP
}

class Listings {
    + id: UUID <<PK>>
    + user_id: UUID <<FK>>
    + category_id: UUID <<FK>>
    + subcategory_id: UUID <<FK>>
    + title: TEXT
    + description: TEXT
    + price: DECIMAL
    + type: ListingType
    + status: ListingStatus
    + images: TEXT[]
    + condition: TEXT
    + availability: TEXT
    + visualizacoes: INTEGER
    + created_at: TIMESTAMP
    + updated_at: TIMESTAMP
}

' Relacionamentos
Housing ||--o{ Users : "mora em"
Users ||--o{ Validations : "possui"
Users ||--o{ Listings : "cria"
Categories ||--o{ Subcategories : "tem"
Categories ||--o{ Listings : "pertence"
Subcategories ||--o{ Listings : "pertence"

@enduml
