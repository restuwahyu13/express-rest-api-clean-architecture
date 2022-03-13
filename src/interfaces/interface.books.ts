export interface InterfaceBooks {
  id: number
  name: string
  isbn: number
  price: number
  description: string
  release_date: Date
  pages: number
  publisher: string
  language: string
  images?: string[]
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
