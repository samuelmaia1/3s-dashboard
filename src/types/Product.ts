import { Pageable } from "./ApiTypes"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUri: string
  revenueChart?: {
    month: number,
    reference: string,
    total: number,
    year: number
  }[]
}

export interface ProductPageable {
  content: Product[]
  page: Pageable
}