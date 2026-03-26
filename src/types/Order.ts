import { Product } from "./Product"
import { Address } from "./ValueObjects"

export interface Order {
  id: string
  userId: string
  costumerId: string
  status: OrderStatus
  total: number
  deliveryAddress: Address
  deliveryDate: string
  returnDate?: string
  createdAt: string
  code: string
  items: OrderItem[]
  costumer: {
    id: string
    name: string
    lastName: string
  }
}

export interface OrderItem {
  id: string
  quantity: number
  unitValue: number
  subTotal: number
  product: Product
}

export enum OrderStatus {
    REALIZADO = "Realizado",
    AGUARDANDO_ASSINATURA_CLIENTE = "Aguardando Assinatura",
    CONTRATO_ASSINADO = "Contrato Assinado",
    AGUARDANDO_PAGAMENTO = "Aguardando Pagamento",
    PAGAMENTO_APROVADO = 'Pagamento Aprovado',
    AGUARDANDO_ENTREGA = 'Aguardando Entrega',
    ENTREGUE = 'Entregue',
    CONCLUIDO = 'Concluído',
    CANCELADO = 'Cancelado'
}   

export interface CartItem {
    product: Product
    quantity: number
}

export interface OrderItemRequest {
    productId: string
    quantity: number
}

export interface CreateOrder {
    costumerId: string
    deliveryAddress?: Address
    deliveryDate?: string
    items: OrderItemRequest[]
}