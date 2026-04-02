import { IconName } from "lucide-react/dynamic"
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
    CONTRATO_ASSINADO = "Contrato Assinado",
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

export const orderStatusIcons: Record<OrderStatus, IconName> = {
    [OrderStatus.REALIZADO]: "clipboard",
    [OrderStatus.CONTRATO_ASSINADO]: "file-signature",
    [OrderStatus.PAGAMENTO_APROVADO]: "credit-card",
    [OrderStatus.AGUARDANDO_ENTREGA]: "clock",
    [OrderStatus.ENTREGUE]: "truck",
    [OrderStatus.CONCLUIDO]: "check",
    [OrderStatus.CANCELADO]: "x",
};