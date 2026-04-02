import { IconName } from "lucide-react/dynamic"
import { Product } from "./Product"
import { Address } from "./ValueObjects"

export interface Rent {
  id: string
  userId: string
  costumerId: string
  status: RentStatus
  total: number
  deliveryTax?: number
  deliveryAddress?: Address
  deliveryDate: string
  returnDate?: string
  createdAt: string
  code: string
  items: RentItem[]
  costumer: {
    id: string
    name: string
    lastName: string
  }
}

export interface RentItem {
  id: string
  quantity: number
  unitValue: number
  subTotal: number
  product: Product
}

export enum RentStatus {
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

export interface RentItemRequest {
    productId: string
    quantity: number
}

export interface CreateRent {
    costumerId: string
    deliveryAddress?: Address
    deliveryDate: string
    returnDate: string
    deliveryTax?: number
    items: RentItemRequest[]
}

export const rentStatusIcons: Record<RentStatus, IconName> = {
    [RentStatus.REALIZADO]: "clipboard",
    [RentStatus.CONTRATO_ASSINADO]: "file-signature",
    [RentStatus.PAGAMENTO_APROVADO]: "credit-card",
    [RentStatus.AGUARDANDO_ENTREGA]: "clock",
    [RentStatus.ENTREGUE]: "truck",
    [RentStatus.CONCLUIDO]: "check",
    [RentStatus.CANCELADO]: "x",
};
