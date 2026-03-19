'use client';

import { Contract, ContractStatus } from "@/types/Contract";
import ContractsTable from "@components/ContractsTable/ContractsTable";

export const mockContracts: Contract[] = [
  {
    id: '1',
    code: '1001',
    costumerId: 'C-101',
    orderId: 'O-5001',
    status: ContractStatus.ASSINADO,
    createdAt: '2026-03-01T10:15:00Z',
    costumer: {
      id: 'C-101',
      name: 'João',
      lastName: 'Silva',
    },
  },
  {
    id: '2',
    code: '1002',
    costumerId: 'C-102',
    orderId: 'O-5002',
    status: ContractStatus.ASSINATURA_PENDENTE,
    createdAt: '2026-03-05T14:20:00Z',
    costumer: {
      id: 'C-102',
      name: 'Maria',
      lastName: 'Oliveira',
    },
  },
  {
    id: '3',
    code: '1003',
    costumerId: 'C-103',
    orderId: 'O-5003',
    status: ContractStatus.CANCELADO,
    createdAt: '2026-03-10T09:00:00Z',
    costumer: {
      id: 'C-103',
      name: 'Pedro',
      lastName: 'Santos',
    },
  },
  {
    id: '4',
    code: '1004',
    costumerId: 'C-104',
    orderId: 'O-5004',
    status: ContractStatus.ASSINADO,
    createdAt: '2026-03-12T16:45:00Z',
    costumer: {
      id: 'C-104',
      name: 'Ana',
      lastName: 'Costa',
    },
  },
  {
    id: '5',
    code: '1005',
    costumerId: 'C-105',
    orderId: 'O-5005',
    status: ContractStatus.ASSINATURA_PENDENTE,
    createdAt: '2026-03-15T11:30:00Z',
    costumer: {
      id: 'C-105',
      name: 'Lucas',
      lastName: 'Pereira',
    },
  },
];

export default async function Contracts() {

    return (
        <ContractsTable contracts={mockContracts}>

        </ContractsTable>
    );
}