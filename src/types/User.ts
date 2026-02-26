export type LoggedUser = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  socialName: string | null;
  instagram: string | null;
  cpf: string
};

export type Address = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
}

export type DashboardSummary = {
  activeRentals: number;
  monthlyRevenue: number;
  costumersCount: number;
  openContracts: number;
}

export type CreateUser = {
  name: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;

  address: {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    number: string;
  };

  socialName: string;
  instagram: string;
}