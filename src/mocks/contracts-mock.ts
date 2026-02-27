import { Contract, ContractStatus } from "@/types/Contract";

export const contractsMock: Contract[] = [
  {
    id: "contract-1",
    code: "0843",
    costumerId: "customer-1",
    orderId: "order-1",
    status: ContractStatus.ASSINATURA_PENDENTE,
    createdAt: "2026-02-01T10:15:00",
  },
  {
    id: "contract-2",
    code: "3421",
    costumerId: "customer-2",
    orderId: "order-2",
    status: ContractStatus.ASSINADO,
    createdAt: "2026-02-05T14:30:00",
  },
  {
    id: "contract-3",
    code: "3078",
    costumerId: "customer-3",
    orderId: "order-3",
    status: ContractStatus.CANCELADO,
    createdAt: "2026-02-10T09:00:00",
  },
  {
    id: "contract-4",
    code: "6543",
    costumerId: "customer-4",
    orderId: "order-4",
    status: ContractStatus.ASSINATURA_PENDENTE,
    createdAt: "2026-02-18T16:45:00",
  },
  {
    id: "contract-5",
    code: "5401",
    costumerId: "customer-5",
    orderId: "order-5",
    status: ContractStatus.ASSINADO,
    createdAt: "2026-02-22T11:20:00",
  },
];