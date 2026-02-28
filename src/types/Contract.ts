export interface Contract {
  id: string
  code: string
  costumerId: string
  orderId: string
  status: ContractStatus
  createdAt: string
  costumer: {
    id: string;
    name: string;
    lastName: string;
  }
}

export enum ContractStatus {
  ASSINATURA_PENDENTE = "Assinatura Pendente",
  ASSINADO = "Assinado",
  CANCELADO = "Cancelado",
}