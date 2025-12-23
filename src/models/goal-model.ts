import { ObjectId } from "mongodb";
export interface GoalModel {
  _id: ObjectId | null;
  user: string;
  month: number;
  year: number;
  goal: number;
  updatedAt: Date;
}

import * as yup from "yup";

export const goalSchema = yup.object({
  month: yup
    .number()
    .integer("O valor deve ser um número inteiro")
    .positive("O valor deve ser positivo")
    .required("Campo Obrigatório"),
  year: yup
    .number()
    .integer("O valor deve ser um número inteiro")
    .positive("O valor deve ser positivo")
    .required("Campo Obrigatório"),
  goal: yup
    .number()
    .typeError("Deve ser um valor valido")
    .required("Campo Obrigatório"),

  updatedAt: yup
    .string()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
      "Data deve estar no formato ISO 8601"
    )
    .required("A data é obrigatória"),
});

export async function validateGoal(goal: GoalModel): Promise<boolean> {
  try {
    await goalSchema.validate(goal, {
      abortEarly: false,
      stripUnknown: true,
    });
    return true; // tudo certo
  } catch (err) {
    console.log(err);
    return false; // algum campo inválido
  }
}
