export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          slug: string
          product_name: string
          hoplink: string
          review_title: string
          review_body: string
          image_url: string | null
          link_hub_text: string | null
          affiliate_nickname: string
          landing_page: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          product_name: string
          hoplink: string
          review_title: string
          review_body: string
          image_url?: string | null
          link_hub_text?: string | null
          affiliate_nickname?: string
          landing_page?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          product_name?: string
          hoplink?: string
          review_title?: string
          review_body?: string
          image_url?: string | null
          link_hub_text?: string | null
          affiliate_nickname?: string
          landing_page?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

