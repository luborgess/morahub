export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          price: number
          seller_id: string
          category: string
          images: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          price: number
          seller_id: string
          category: string
          images?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          price?: number
          seller_id?: string
          category?: string
          images?: string[]
        }
      }
      // Adicione mais tabelas conforme necessário
    }
  }
}
