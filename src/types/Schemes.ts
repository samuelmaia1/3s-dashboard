import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),

  lastName: z.string().min(1, "Sobrenome é obrigatório"),

  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),

  cpf: z
    .string()
    .min(11, "CPF incompleto")
    .max(11, "CPF inválido"),

  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .refine(value => /[a-z]/.test(value), {
      message: "Senha deve conter ao menos uma letra minúscula",
    })
    .refine(value => /[A-Z]/.test(value), {
      message: "Senha deve conter ao menos uma letra maiúscula",
    })
    .refine(value => /\d/.test(value), {
      message: "Senha deve conter ao menos um número",
    }),

  address: z.object({
    cep: z
      .string()
      .min(8, "CEP incompleto")
      .max(8, "CEP inválido"),

    street: z.string().min(1, "Rua é obrigatória"),

    neighborhood: z.string().min(1, "Bairro é obrigatório"),

    city: z.string().min(1, "Cidade é obrigatória"),

    number: z.string().min(1, "Número é obrigatório"),
  }),

  socialName: z.string().min(1, "Nome social é obrigatório"),

  instagram: z
    .string()
    .min(1, "Instagram é obrigatório"),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;