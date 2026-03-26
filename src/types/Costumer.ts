import { Pageable } from "./ApiTypes";
import { Order } from "./Order";
import { Address } from "./ValueObjects";

export interface Costumer {
    id: string;
    name: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    address: Address;
    cpf: string;
}

export interface CostumerPageable {
    content: Costumer[];
    page: Pageable;
}

export interface CreateCostumer {
    name: string;
    lastName: string;
    email: string;
    cpf: string;
    address: Address;
}

export interface FullCostumer extends Costumer {
    orders: Order[];
}