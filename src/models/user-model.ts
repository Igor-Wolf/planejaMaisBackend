import { ObjectId } from "mongodb";

export interface UserModel {
  _id: ObjectId | null;
  name: string;
  user: string;
  email: string;
  lastEmail: string;
  birthday: Date;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date | null;
  isActive: boolean;
}

import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required("O nome é obrigatório"),

  user: yup.string().required("O usuário é obrigatório"),

  email: yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),

  lastEmail: yup
    .string()
    .email("Último e-mail inválido")
    .required("O último e-mail é obrigatório"),

  birthday: yup
    .date()
    .typeError("Data de nascimento inválida")
    .required("A data de nascimento é obrigatória"),

  passwordHash: yup.string().required("O hash da senha é obrigatório"),

  createdAt: yup
    .string()
    .matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
    "Data deve estar no formato ISO 8601"
  )
  .required("A data é obrigatória"),

  updatedAt: yup
    .string()
  .matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
    "Data deve estar no formato ISO 8601"
  )
  .required("A data é obrigatória"),

  isActive: yup.boolean().required("O estado 'isActive' é obrigatório"),
});

export async function validateUser(user: UserModel): Promise<boolean> {
  try {
    await userSchema.validate(user, {
      abortEarly: false,
      stripUnknown: true,
    });
    return true; // tudo certo
  } catch (err) {
      console.log(err)
    return false; // algum campo inválido
  }
}
