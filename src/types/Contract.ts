export interface Contract {
  id: string
  code: string
  costumerId: string
  orderId: string
  status: ContractStatus
  createdAt: string
}

export enum ContractStatus {
  ASSINATURA_PENDENTE = "Assinatura Pendente",
  ASSINADO = "Assinado",
  CANCELADO = "Cancelado",
}