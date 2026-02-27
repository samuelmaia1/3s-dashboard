import { Order, OrderStatus } from "@/types/Order";

export const ordersMock: Order[] = [
  {
    id: "order-1",
    costumer: {
      id: "customer-1",
      name: "Silas",
      lastName: "Daniel"
    },
    userId: "user-1",
    costumerId: "customer-1",
    status: OrderStatus.AGUARDANDO_ENTREGA,
    total: 450,
    deliveryAddress: {
      street: "Rua das Flores",
      number: "123",
      neighborhood: "Centro",
      city: "Belo Horizonte",
      cep: "30110-000"
    },
    deliveryDate: "2026-03-05",
    createdAt: "2026-02-20",
    items: [
      {
        id: "item-1",
        quantity: 3,
        unitValue: 150,
        subTotal: 450,
        product: {
          id: "product-1",
          name: "Caixa de Som JBL",
          description: "Caixa de som portátil",
          price: 150,
          stock: 10,
          imageUri: "https://via.placeholder.com/150"
        }
      }
    ]
  },
  {
    id: "order-2",
    costumer: {
      id: "customer-1",
      name: "Samuel",
      lastName: "Maia"
    },
    userId: "user-2",
    costumerId: "customer-2",
    status: OrderStatus.ENTREGUE,
    total: 300,
    deliveryAddress: {
      street: "Av. Amazonas",
      number: "890",
      neighborhood: "Barro Preto",
      city: "Belo Horizonte",
      cep: "30180-002"
    },
    deliveryDate: "2026-02-18",
    createdAt: "2026-02-10",
    items: [
      {
        id: "item-2",
        quantity: 2,
        unitValue: 150,
        subTotal: 300,
        product: {
          id: "product-2",
          name: "Microfone Sem Fio",
          description: "Microfone profissional",
          price: 150,
          stock: 5,
          imageUri: "https://via.placeholder.com/150"
        }
      }
    ]
  },
  {
    id: "order-3",
    costumer: {
      id: "customer-1",
      name: "Rogéria",
      lastName: "Maia"
    },
    userId: "user-3",
    costumerId: "customer-3",
    status: OrderStatus.CANCELADO,
    total: 600,
    deliveryAddress: {
      street: "Rua Rio Grande do Sul",
      number: "450",
      neighborhood: "Funcionários",
      city: "Belo Horizonte",
      cep: "30140-002"
    },
    deliveryDate: "2026-02-12",
    returnDate: "2026-02-15",
    createdAt: "2026-02-05",
    items: [
      {
        id: "item-3",
        quantity: 4,
        unitValue: 150,
        subTotal: 600,
        product: {
          id: "product-3",
          name: "Iluminador LED",
          description: "Iluminação para eventos",
          price: 150,
          stock: 7,
          imageUri: "https://via.placeholder.com/150"
        }
      }
    ]
  },
  {
    id: "order-4",
    costumer: {
      id: "customer-1",
      name: "Barbara",
      lastName: "Soares"
    },
    userId: "user-4",
    costumerId: "customer-4",
    status: OrderStatus.CONTRATO_ASSINADO,
    total: 200,
    deliveryAddress: {
      street: "Rua Curitiba",
      number: "78",
      neighborhood: "Lourdes",
      city: "Belo Horizonte",
      cep: "30170-120"
    },
    deliveryDate: "2026-02-25",
    createdAt: "2026-02-22",
    items: [
      {
        id: "item-4",
        quantity: 1,
        unitValue: 200,
        subTotal: 200,
        product: {
          id: "product-4",
          name: "Tripé Profissional",
          description: "Tripé ajustável",
          price: 200,
          stock: 3,
          imageUri: "https://via.placeholder.com/150"
        }
      }
    ]
  },
  {
    id: "order-5",
    costumer: {
      id: "customer-1",
      name: "Sara",
      lastName: "Maia"
    },
    userId: "user-5",
    costumerId: "customer-5",
    status: OrderStatus.PAGAMENTO_APROVADO,
    total: 900,
    deliveryAddress: {
      street: "Av. Cristiano Machado",
      number: "1500",
      neighborhood: "Cidade Nova",
      city: "Belo Horizonte",
      cep: "31170-800"
    },
    deliveryDate: "2026-02-14",
    createdAt: "2026-02-01",
    items: [
      {
        id: "item-5",
        quantity: 6,
        unitValue: 150,
        subTotal: 900,
        product: {
          id: "product-5",
          name: "Refletor RGB",
          description: "Refletor LED RGB",
          price: 150,
          stock: 12,
          imageUri: "https://via.placeholder.com/150"
        }
      }
    ]
  }
];