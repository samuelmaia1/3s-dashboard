import { Order } from "./Order"
import { Rent } from "./Rent"

export interface Contract {
  id: string
  code: string
  costumerId: string
  orderId?: string
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

export interface ContractPageable {
  content: Contract[] | ContractWithDetails[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface ContractWithDetails extends Contract {
 order: Order;
}

export type ContractReferenceType = "ORDER" | "RENT";

export type ContractReference = Order | Rent;

export interface ContractRealtimePayload {
  summary: Contract;
  reference: ContractReference;
}
