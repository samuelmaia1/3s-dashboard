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