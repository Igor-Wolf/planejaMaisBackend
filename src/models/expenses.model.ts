import { ObjectId } from "mongodb";
export interface ExpensesModel {
  _id: ObjectId | null;
  user: string;
  description: string;
  value: number;
  category: string;
  date: Date;
  updatedAt: Date;
}

import * as yup from "yup";

export const expenseSchema = yup.object({

  description: yup.string().required("Descrição é obrigatória"),

  value: yup
    .number()
    .typeError("Deve ser um valor valido")
    .required("Campo obrigatório"),

  category: yup.string().required("Categoria é obrigatória"),

  date: yup
    .date()
    .typeError("Data de nascimento inválida")
    .required("A data  é obrigatória"),

  updatedAt: yup
    .string()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
      "Data deve estar no formato ISO 8601"
    )
    .required("A data é obrigatória"),
});

export async function validateExpense(expense: ExpensesModel): Promise<boolean> {
  try {
    await expenseSchema.validate(expense, {
      abortEarly: false,
      stripUnknown: true,
    });
    return true; // tudo certo
  } catch (err) {
    console.log(err);
    return false; // algum campo inválido
  }
}
