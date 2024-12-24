  /**
   * Supabase database schema.
  *
  * Contains the schema for all tables in the public schema.
  * Includes: housing, users, validations, categories, subcategories, and listings
  *
  * @example
  * import type { Database } from '@/types/supabase'
  *
  * const { data, error } = await supabase
  *   .from('users')
  *   .select('*')
  *   .eq('type', 'UFMG')
  */
 
 // Tipos ENUM
 export type UserType = 'VISITOR' | 'UFMG' | 'RESIDENT' | 'ADMIN'
 export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
 export type ValidationType = 'HOUSING' | 'UFMG_AFFILIATION'
 export type ValidationStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
 export type CategoryType = 'PRODUCT' | 'SERVICE'
 export type ListingStatus = 'ACTIVE' | 'SOLD' | 'RESERVED' | 'DELETED'
 export type ListingType = 'SALE' | 'RENT' | 'DONATION' | 'EXCHANGE'

export type Database = {
  public: {
    Tables: {
      housing: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      users: {
        Row: {
          id: string
          housing_id: string | null
          email: string
          name: string
          commercial_name: string | null
          celular: string | null
          cpf: string | null
          bio: string | null
          image_url: { url: string; metadata?: any } | null
          type: UserType
          status: UserStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          housing_id?: string | null
          email: string
          name: string
          commercial_name?: string | null
          celular?: string | null
          cpf?: string | null
          bio?: string | null
          image_url?: { url: string; metadata?: any } | null
          type?: UserType
          status?: UserStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          housing_id?: string | null
          email?: string
          name?: string
          commercial_name?: string | null
          celular?: string | null
          cpf?: string | null
          bio?: string | null
          image_url?: { url: string; metadata?: any } | null
          type?: UserType
          status?: UserStatus
          updated_at?: string
        }
      }
      validations: {
        Row: {
          id: string
          user_id: string
          type: ValidationType
          status: ValidationStatus
          document_url: string | null
          observacao: string | null
          response: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: ValidationType
          status?: ValidationStatus
          document_url?: string | null
          observacao?: string | null
          response?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: ValidationType
          status?: ValidationStatus
          document_url?: string | null
          observacao?: string | null
          response?: string | null
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          type: CategoryType
          active: boolean
          order: number
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          type: CategoryType
          active?: boolean
          order?: number
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          type?: CategoryType
          active?: boolean
          order?: number
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string | null
          active: boolean
          order: number
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description?: string | null
          active?: boolean
          order?: number
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string | null
          active?: boolean
          order?: number
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          category_id: string
          subcategory_id: string
          title: string
          description: string
          price: number
          type: ListingType
          status: ListingStatus
          images: { url: string; metadata?: any }[]
          condition: string | null
          availability: string | null
          visualizacoes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          subcategory_id: string
          title: string
          description: string
          price: number
          type: ListingType
          status?: ListingStatus
          images: { url: string; metadata?: any }[]
          condition?: string | null
          availability?: string | null
          visualizacoes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          subcategory_id?: string
          title?: string
          description?: string
          price?: number
          type?: ListingType
          status?: ListingStatus
          images?: { url: string; metadata?: any }[]
          condition?: string | null
          availability?: string | null
          visualizacoes?: number
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: UserType
      user_status: UserStatus
      validation_type: ValidationType
      validation_status: ValidationStatus
      category_type: CategoryType
      listing_type: ListingType
      listing_status: ListingStatus
    }
  }
}
