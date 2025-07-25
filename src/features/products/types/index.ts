export interface Product {
  id: number
  name: string
  price: number
  stock: number
  categoryId: number
  category?: { id: number; name: string }
}
